'use client';
import { useState } from 'react';
import Link from 'next/link';
import { buscarPedido, eliminarPedido} from "@/lib/pedidos-api";
import styles from './page.module.css';

export default function Pedidos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const lista = await buscarPedido(searchTerm);
      console.log(lista);
      
      // Verifica si lista es un array o un objeto
      if (Array.isArray(lista)) {
        setResults(lista);
      } else {
        console.error('La respuesta no es un array:', lista);
        setResults([]); // O maneja el caso según lo desees
      }
    } catch (err) {
      console.error(err);
      setError('Error al buscar pedidos.');
    }
  };
  

  const handleDelete = async (pedidoId) => {
    // Display confirmation prompt
    const confirmed = window.confirm('¿Seguro que quieres eliminar este producto?');
    
    if (confirmed) {
      try {
        // Call the delete function from your API
        await eliminarPedido(pedidoId)
        // Optionally, update the results to remove the deleted product from the list
        setResults(results.filter(pedido => pedido.id !== pedidoId));
        console.log(`order with ID ${pedidoId} deleted`);
      } catch (error) {
        console.error('Error al eliminar el pedido:', error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pedidos</h1>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.searchSection}>
        <input 
          type="text" 
          placeholder="Buscar por número o nombre de pedido" 
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
                <td>{pedido.fecha}</td>
                <td>{pedido.numeroPedido}</td>
                <td>{pedido.usuario}</td>
                <td>{pedido.cliente.id}</td>
                <td>{pedido.estado}</td>
                <td>
                  <button className={styles.deleteButton} onClick={() => handleDelete(pedido.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No se encontraron pedidos.</td>
            </tr>
          )}
        </tbody>
      </table>
      <style jsx>{`
         deleteButton {
          background-color: #ff4d4f;
          color: white;
          border: none;
          padding: 4px 8px;
          cursor: pointer;
        }
        deleteButton:hover {
          background-color: #d9363e;
        }
      `}</style>
    </div>
  );
}


/*'use client';
import { useState } from 'react';
import Link from 'next/link';
import { buscarPedido } from "@/lib/pedidos-api";
import styles from './page.module.css';

export default function Pedidos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const lista = await buscarPedido(searchTerm);
    console.log(lista);
    setResults(lista);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pedidos</h1>
      <div className={styles.searchSection}>
        <input 
          type="text" 
          placeholder="Buscar por número o nombre de pedido" 
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
            <th>Numero Pedido</th>
            <th>Usuario</th>
            <th>Cliente Id</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {results.map(pedido => (
            <tr key={pedido.id}>
              <td>
                <Link href={`/pedidos/${pedido.id}`}>{pedido.id}</Link>
              </td>
              <td>{pedido.fecha}</td>
              <td>{pedido.numeroPedido}</td>
              <td>{pedido.usuario}</td>
              <td>{pedido.cliente.id}</td>
              <td>{pedido.estado}</td>
              <td>
              <button className={styles.deleteButton} onClick={() => handleDelete(pedido.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       <style jsx>{`
          deleteButton {
          background-color: #ff4d4f;
          color: white;
          border: none;
          padding: 4px 8px;
          cursor: pointer;
        }
        deleteButton:hover {
          background-color: #d9363e;
        }
      `}</style>
    </div>
  );
}*/