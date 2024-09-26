'use client';
import { useState } from 'react';
import Link from 'next/link';
import { buscarCliente, eliminarCliente, actualizarCliente } from "@/lib/clientes-api"; // Tu lógica de la API de clientes
import styles from './page.module.css';

export default function Clientes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [editingCliente, setEditingCliente] = useState(null); // Nuevo estado para controlar la edición
  const [maximoDescubierto, setMaximoDescubierto] = useState(0); // Estado para el nuevo máximo descubierto
  const [error, setError] = useState('');

  const handleSearch = async () => {
    const lista = await buscarCliente(searchTerm);
    console.log(lista);
    setResults(lista);
  };

  const handleDelete = async (clienteId) => {
    const confirmed = window.confirm('¿Seguro que quieres eliminar este cliente?');
    
    if (confirmed) {
      try {
        await eliminarCliente(clienteId);
        setResults(results.filter(cliente => cliente.id !== clienteId));
        console.log(`Cliente con ID ${clienteId} eliminado`);
      } catch (error) {
        console.error('Error al eliminar el cliente:', error);
      }
    }
  };

  const handleEdit = (cliente) => {
    setEditingCliente(cliente); // Establece el cliente que se está editando
    setMaximoDescubierto(cliente.maximoDescubierto); // Establece el valor inicial del máximo descubierto
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (editingCliente) {
      try {
        await actualizarCliente(editingCliente.id, { ...editingCliente, maximoDescubierto });
        setResults(results.map(cliente => cliente.id === editingCliente.id ? { ...cliente, maximoDescubierto } : cliente));
        setEditingCliente(null); // Cierra el modo de edición
        setMaximoDescubierto(0); // Reinicia el campo de entrada
      } catch (error) {
        setError('Error al actualizar el cliente.');
        console.error(error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Clientes</h1>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.searchSection}>
        <input 
          type="text" 
          placeholder="Buscar por número o nombre de cliente" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className={styles.searchInput}
        />
        <button onClick={handleSearch} className={styles.searchButton}>Buscar</button>
      </div>
      <Link href="/clientes/new">
        <button className={styles.createButton}>Crear nuevo cliente</button>
      </Link>
      <table className={styles.clientTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Maximo Descubierto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {results.map(clientes => (
            <tr key={clientes.id}>
              <td>
                <Link href={`/clientes/${clientes.id}`}>{clientes.id}</Link>
              </td>
              <td>{clientes.nombre}</td>
              <td>{clientes.correoElectronico}</td>
              <td>{editingCliente?.id === clientes.id ? (
                <input 
                  type="number" 
                  value={maximoDescubierto} 
                  onChange={(e) => setMaximoDescubierto(e.target.value)} 
                />
              ) : (
                clientes.maximoDescubierto
              )}</td>
              <td>
                {editingCliente?.id === clientes.id ? (
                  <button className={styles.saveButton} onClick={handleUpdate}>Guardar</button>
                ) : (
                  <>
                    <button className={styles.editButton} onClick={() => handleEdit(clientes)}>Editar</button>
                    <button className={styles.deleteButton} onClick={() => handleDelete(clientes.id)}>Eliminar</button>
                  </>
                )}
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
}
/*'use client';
import { useState } from 'react';
import Link from 'next/link';
import { buscarCliente, eliminarCliente } from "@/lib/clientes-api"; // Tu lógica de la API de clientes
import styles from './page.module.css'; // Mismo CSS que el de productos

export default function Clientes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const lista = await buscarCliente(searchTerm);
    console.log(lista);
    setResults(lista);
  };

  const handleDelete = async (clienteId) => {
    // Display confirmation prompt
    const confirmed = window.confirm('¿Seguro que quieres eliminar este producto?');
    
    if (confirmed) {
      try {
        // Call the delete function from your API
        await eliminarCliente(clienteId);
        // Optionally, update the results to remove the deleted product from the list
        setResults(results.filter(cliente => cliente.id !== clienteId));
        console.log(`client with ID ${clienteId} deleted`);
      } catch (error) {
        console.error('Error al eliminar el cliente:', error);
      }
    }
  };

  return (
      <div className={styles.container}>
        <h1 className={styles.title}>Clientes</h1>
        <div className={styles.searchSection}>
          <input 
            type="text" 
            placeholder="Buscar por número o nombre de cliente" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className={styles.searchInput}
          />
          <button onClick={handleSearch} className={styles.searchButton}>Buscar</button>
        </div>
        <Link href="/clientes/new">
          <button className={styles.createButton}>Crear nuevo cliente</button>
        </Link>
        <Link href="/clientes/obra">
          <button className={styles.createButton}>Administrar Obras</button>
        </Link>
        <table className={styles.clientTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Maximo Descubierto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
          {results.map(clientes => (
            <tr key={clientes.id}>
              <td>
                <Link href={`/clientes/${clientes.id}`}>{clientes.id}</Link>
              </td>
              <td>{clientes.nombre}</td>
              <td>{clientes.correoElectronico}</td>
              <td>{clientes.maximoDescubierto}</td>
              <td>
                <button className={styles.deleteButton} onClick={() => handleDelete(clientes.id)}>Eliminar</button>
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
