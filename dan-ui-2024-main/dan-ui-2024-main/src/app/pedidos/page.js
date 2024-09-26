'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { buscarPedido, eliminarPedido, actualizarPedido } from "@/lib/pedidos-api"; 
import styles from './page.module.css';

export default function Pedidos() {
  const [nuevoEstado, setNuevoEstado] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); 
  const [results, setResults] = useState([]);
  const [originalResults, setOriginalResults] = useState([]); 
  const [editingPedido, setEditingPedido] = useState(null); 
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchPedidos = async () => {
      const lista = await buscarPedido(''); 
      setResults(lista);
      setOriginalResults(lista); 
    };

    fetchPedidos();
  }, []);

  
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setResults(originalResults); 
    } else {
     
      const filteredResults = originalResults.filter(pedido => pedido.cliente.id.toString() === searchTerm);
      setResults(filteredResults);
    }
  };

  const handleDelete = async (pedidoId) => {
    const confirmed = window.confirm('¿Seguro que quieres eliminar este pedido?');
    if (confirmed) {
      try {
        await eliminarPedido(pedidoId);
        setResults(results.filter(pedido => pedido.id !== pedidoId));
        console.log(`Pedido con ID ${pedidoId} eliminado`);
      } catch (error) {
        console.error('Error al eliminar el pedido:', error);
      }
    }
  };

  const handleEdit = (pedido) => {
    setEditingPedido(pedido);
    setNuevoEstado(pedido.estado);
  };

  const handleUpdatePedido = async (e) => {
    e.preventDefault();
    try {
      const pedidoUpdateDTO = {
        numeroPedido: editingPedido.numeroPedido, 
        nuevoEstado: nuevoEstado,                 
      };
  
      await actualizarPedido(pedidoUpdateDTO);
  
      setResults(results.map(pedido => 
        pedido.id === editingPedido.id ? { ...pedido, estado: nuevoEstado } : pedido
      ));
  
      
      setEditingPedido(null);
      console.log('Pedido actualizado');
    } catch (error) {
      console.error('Error al actualizar el pedido:', error);
    }
  };
  

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pedidos</h1>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.searchSection}>
        <input 
          type="text" 
          placeholder="Buscar por ID de cliente" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className={styles.searchInput}
        />
        <button onClick={handleSearch} className={styles.searchButton}>Buscar</button>
      </div>
      <Link href="/pedidos/new">
        <button className={styles.createButton}>Crear nuevo pedido</button>
      </Link>
      <table className={styles.pedidosTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Número Pedido</th>
            <th>Usuario</th>
            <th>Cliente ID</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(results) && results.length > 0 ? (
            results.map(pedido => (
              <tr key={pedido.id}>
                <td>
                  <Link href={`/pedidos/${pedido.id}`}>{pedido.id}</Link>
                </td>
                <td>{new Date(pedido.fecha).toLocaleDateString()}</td>
                <td>{pedido.numeroPedido}</td>
                <td>{pedido.usuario}</td>
                <td>{pedido.cliente.id}</td>
                <td>
                  {editingPedido?.id === pedido.id ? (
                    <select 
                      value={nuevoEstado} 
                      onChange={(e) => setNuevoEstado(e.target.value)} 
                      className={styles.dropdown}
                    >
                      <option value="">Seleccionar estado</option>
                      <option value="ENTREGADO">ENTREGADO</option>
                      <option value="CANCELADO">CANCELADO</option>
                    </select>
                  ) : (
                    pedido.estado
                  )}
                </td>
                <td>
                  {editingPedido?.id === pedido.id ? (
                    <button className={styles.saveButton} onClick={handleUpdatePedido}>Guardar</button>
                  ) : (
                    <>
                      <button className={styles.editButton} onClick={() => handleEdit(pedido)}>Editar</button>
                      <button className={styles.deleteButton} onClick={() => handleDelete(pedido.id)}>Eliminar</button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No se encontraron pedidos para el cliente con ID {searchTerm}.</td>
            </tr>
          )}
        </tbody>
      </table>
        <div className={styles.detallesPedidoSection}>
          <h2 className={styles.detallesTitulo}>Detalles del Pedido</h2>
          {results.map((pedido) => (
            <div key={pedido.id} className={styles.pedidoContainer}>
              <h3 className={styles.pedidoId}>Pedido Numero: {pedido.numeroPedido}</h3>
              <table className={styles.productosTable}>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {pedido.detalle.map((detalleItem, index) => (
                    <tr key={index} className={styles.detalleRow}>
                      <td>{detalleItem.producto.nombre}</td>
                      <td>{detalleItem.cantidad}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
    </div>
  );
}
