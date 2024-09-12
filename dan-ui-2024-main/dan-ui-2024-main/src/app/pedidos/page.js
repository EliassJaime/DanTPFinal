'use client';
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
    // Simulate a search by filtering some dummy data
    const dummyData = [
      { id: 1, name: 'Pedido 1' },
      { id: 2, name: 'Pedido 2' },
    ];
    setResults(dummyData.filter(orders => orders.name.includes(searchTerm) || orders.id.toString() === searchTerm));
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
      <table className={styles.productTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {results.map(product => (
            <tr key={product.id}>
              <td>
                <Link href={`/pedidos/${product.id}`}>{product.id}</Link>
              </td>
              <td>{product.name}</td>
              <td>
                <button1 id ="botonEliminar" onClick={() => handleDelete(product.id)}>Eliminar</button1>
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