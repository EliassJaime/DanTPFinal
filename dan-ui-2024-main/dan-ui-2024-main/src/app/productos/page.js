

'use client';
import { useState } from 'react';
import Link from 'next/link';
import { buscarProducto } from "@/lib/productos-api";
import styles from './page.module.css';

export default function Productos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const lista = await buscarProducto(searchTerm);
    console.log(lista);
    // Simulate a search by filtering some dummy data
    const dummyData = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
    ];
    setResults(dummyData.filter(product => product.name.includes(searchTerm) || product.id.toString() === searchTerm));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Productos</h1>
      <div className={styles.searchSection}>
        <input 
          type="text" 
          placeholder="Buscar por número o nombre de producto" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className={styles.searchInput}
        />
        <button onClick={handleSearch} className={styles.searchButton}>Buscar</button>
      </div>
      <Link href="/productos/new">
        <button className={styles.createButton}>Crear nuevo producto</button>
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
                <Link href={`/productos/${product.id}`}>{product.id}</Link>
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

/*export default function Productos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  
  const handleSearch = async () => {
    const lista = await buscarProducto('abc');
    console.log(lista);
    // Simulate a search by filtering some dummy data
    const dummyData = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
    ];
    setResults(dummyData.filter(product => product.name.includes(searchTerm) || product.id.toString() === searchTerm));
  };

  return (
    <>
      <h1>Productos Page</h1>
      <input 
        type="text" 
        placeholder="Buscar por número o nombre de producto" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <button onClick={handleSearch}>Buscar</button>
      <Link href="/productos/new">
        <button>Crear nuevo producto</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {results.map(product => (
            <tr key={product.id}>
              <td>
                <Link href={`/productos/${product.id}`}>{product.id}</Link>
              </td>
              <td>{product.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};*/
