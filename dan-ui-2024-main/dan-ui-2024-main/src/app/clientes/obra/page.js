'use client';
import { useState } from 'react';
import Link from 'next/link';
import { buscarObra } from "@/lib/clientes-api"; 
import styles from '../page.module.css'; 

export default function Obras() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const lista = await buscarObra(searchTerm);
    console.log(lista);
    setResults(lista);
  };

  const handleDelete = (obraId) => {
    console.log(`Obra with ID ${obraId} deleted`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Obras</h1>
      <div className={styles.searchSection}>
        <input 
          type="text" 
          placeholder="Buscar por número o dirección de obra" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className={styles.searchInput}
        />
        <button onClick={handleSearch} className={styles.searchButton}>Buscar</button>
      </div>
      <Link href="/clientes/obra/new">
        <button className={styles.createButton}>Crear nueva Obra</button>
      </Link>
      <table className={styles.clientTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Dirección</th>
            <th>Estado</th>
            <th>Remodelación</th>
            <th>ID cliente</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {results.map(obra => (
            <tr key={obra.id}>
              <td>
                <Link href={`/obras/${obra.id}`}>{obra.id}</Link>
              </td>
              <td>{obra.direccion}</td>
              <td>{obra.estado}</td>
              <td>{obra.esRemodelacion ? 'Sí' : 'No'}</td>
              <td>{obra.cliente.id}</td>
              <td>
                <button className={styles.deleteButton} onClick={() => handleDelete(obra.id)}>Eliminar</button>
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
