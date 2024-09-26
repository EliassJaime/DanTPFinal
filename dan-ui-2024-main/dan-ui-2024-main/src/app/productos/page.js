
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { buscarProducto, eliminarProducto } from "@/lib/productos-api"; // Import your delete function
import styles from './page.module.css';

export default function Productos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const lista = await buscarProducto(searchTerm);
    console.log(lista);
    setResults(lista);
  };

  const handleDelete = async (productoId) => {
    // Display confirmation prompt
    const confirmed = window.confirm('¿Seguro que quieres eliminar este producto?');
    
    if (confirmed) {
      try {
        // Call the delete function from your API
        await eliminarProducto(productoId);
        // Optionally, update the results to remove the deleted product from the list
        setResults(results.filter(producto => producto.id !== productoId));
        console.log(`Product with ID ${productoId} deleted`);
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
      }
    }
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
              <th>Stock Actual</th>
              <th>Precio</th>
              <th>Categoria</th>
              <th>Descuento Promocional</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
          {results.map(Productos => (
            <tr key={Productos.id}>
              <td>
                <Link href={`/productos/${Productos.id}`}>{Productos.id}</Link>
              </td>
              <td>{Productos.nombre}</td>
              <td>{Productos.stockActual}</td>
              <td>{Productos.precio}</td>
              <td>{Productos.categoria}</td>
              <td>{Productos.descuentoPromocional}</td>
              <td>
                <button className={styles.deleteButton} onClick={() => handleDelete(Productos.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/*'use client';
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
    setResults(lista);
  };

  const handleDelete = (productoId) => {
    console.log(`Product with ID ${productoId} deleted`);
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
              <th>Stock Actual</th>
              <th>Precio</th>
              <th>Categoria</th>
              <th>Descuento Promocional</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
          {results.map(Productos => (
            <tr key={Productos.id}>
              <td>
                <Link href={`/productos/${Productos.id}`}>{Productos.id}</Link>
              </td>
              <td>{Productos.nombre}</td>
              <td>{Productos.stockActual}</td>
              <td>{Productos.precio}</td>
              <td>{Productos.categoria}</td>
              <td>{Productos.descuentoPromocional}</td>
              <td>
                <button className={styles.deleteButton} onClick={() => handleDelete(obra.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
    </div>
  );
}*/

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
