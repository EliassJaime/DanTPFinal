'use client';
import { useState } from 'react';
import Link from 'next/link';
import { buscarCliente } from "@/lib/clientes-api"; // Tu lógica de la API de clientes
import styles from './page.module.css'; // Mismo CSS que el de productos

export default function Clientes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const lista = await buscarCliente(searchTerm);
    console.log(lista);
    const dummyData = [
      { id: 1, name: 'Client 1' },
      { id: 2, name: 'Client 2' },
    ];
    setResults(dummyData.filter(client => client.name.includes(searchTerm) || client.id.toString() === searchTerm));
  };

  const handleDelete = (clientId) => {
    console.log(`Client with ID ${clientId} deleted`);
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
        <Link href="/obras">
          <button className={styles.createButton}>Crear nueva obra</button>
        </Link>
        <table className={styles.clientTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {results.map(client => (
              <tr key={client.id}>
                <td>
                  <Link href={`/clientes/${client.id}`}>{client.id}</Link>
                </td>
                <td>{client.name}</td>
                <td>
                  <button1 className={styles.deleteButton} onClick={() => handleDelete(client.id)}>Eliminar</button1>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <style jsx>{`
          button1 {
          background-color: #ff4d4f;
          color: white;
          border: none;
          padding: 4px 8px;
          cursor: pointer;
        }
        button1:hover {
          background-color: #d9363e;
        }
      `}</style>
      </div>
  );
}
