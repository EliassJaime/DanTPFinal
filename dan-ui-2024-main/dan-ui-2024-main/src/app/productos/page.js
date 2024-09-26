'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { buscarProducto, eliminarProducto, actualizarStockYPrecio, actualizarDescuentoPromocional } from "@/lib/productos-api"; // Importa las funciones necesarias
import styles from './page.module.css';

export default function Productos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [originalResults, setOriginalResults] = useState([]); // Nuevo estado para almacenar resultados originales
  const [editingProducto, setEditingProducto] = useState(null);
  const [nuevoPrecio, setNuevoPrecio] = useState('');
  const [nuevaCantidad, setNuevaCantidad] = useState('');
  const [nuevoDescuento, setNuevoDescuento] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minStock, setMinStock] = useState('');
  const [maxStock, setMaxStock] = useState('');

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      const lista = await buscarProducto('');
      setResults(lista);
      setOriginalResults(lista);
    };

    fetchProducts();
  }, []);

  const handleSearch = async () => {
    const lista = await buscarProducto(searchTerm);
    setResults(lista);
    setOriginalResults(lista); // Guarda los resultados originales
  };

  const handleDelete = async (productoId) => {
    const confirmed = window.confirm('¿Seguro que quieres eliminar este producto?');
    if (confirmed) {
      try {
        await eliminarProducto(productoId);
        setResults(results.filter(producto => producto.id !== productoId));
        console.log(`Product with ID ${productoId} deleted`);
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
      }
    }
  };

  const handleEdit = (producto) => {
    setEditingProducto(producto);
    setNuevoPrecio(producto.precio);
    setNuevaCantidad(producto.stockActual);
    setNuevoDescuento(producto.descuentoPromocional);
  };

  const handleUpdateStockAndPrice = async (e) => {
    e.preventDefault();
    try {
      const stockUpdateDTO = {
        idProducto: editingProducto.id,
        cantidad: nuevaCantidad,
        nuevoPrecio: nuevoPrecio,
      };
      await actualizarStockYPrecio(stockUpdateDTO);
      setResults(results.map(producto => producto.id === editingProducto.id ? { ...producto, precio: nuevoPrecio, stockActual: nuevaCantidad } : producto));
      setEditingProducto(null);
      console.log('Stock y precio actualizados');
    } catch (error) {
      console.error('Error al actualizar stock y precio:', error);
    }
  };

  const handleUpdateDiscount = async (e) => {
    e.preventDefault();
    try {
      const descuentoUpdateDTO = {
        idProducto: editingProducto.id,
        nuevoDescuento: nuevoDescuento,
      };
      await actualizarDescuentoPromocional(descuentoUpdateDTO);
      setResults(results.map(producto => producto.id === editingProducto.id ? { ...producto, descuentoPromocional: nuevoDescuento } : producto));
      setEditingProducto(null);
      console.log('Descuento promocional actualizado');
    } catch (error) {
      console.error('Error al actualizar descuento:', error);
    }
  };

  const handleMinPriceSearch = () => {
    const precioMinimo = parseFloat(minPrice);
    const productosFiltrados = !isNaN(precioMinimo) 
      ? originalResults.filter(producto => producto.precio >= precioMinimo) 
      : originalResults;
    setResults(productosFiltrados);
  };

  const handleMaxPriceSearch = () => {
    const precioMaximo = parseFloat(maxPrice);
    const productosFiltrados = !isNaN(precioMaximo) 
      ? originalResults.filter(producto => producto.precio <= precioMaximo) 
      : originalResults;
    setResults(productosFiltrados);
  };

  const handleMinStockSearch = () => {
    const stockMinimo = parseInt(minStock, 10);
    const productosFiltrados = !isNaN(stockMinimo) 
      ? originalResults.filter(producto => parseInt(producto.stockActual, 10) >= stockMinimo) 
      : originalResults;
    setResults(productosFiltrados);
  };

  const handleMaxStockSearch = () => {
    const stockMaximo = parseInt(maxStock, 10);
    const productosFiltrados = !isNaN(stockMaximo) 
      ? originalResults.filter(producto => parseInt(producto.stockActual, 10) <= stockMaximo) 
      : originalResults;
    setResults(productosFiltrados);
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

      {/* Campo para buscar por precio mínimo */}
      <div className={styles.searchSection}>
        <input 
          type="number" 
          placeholder="Precio mínimo" 
          value={minPrice} 
          onChange={(e) => setMinPrice(e.target.value)} 
          className={styles.searchInput}
        />
        <button onClick={handleMinPriceSearch} className={styles.searchButton}>Buscar por Precio Mínimo</button>
      </div>

      {/* Campo para buscar por precio máximo */}
      <div className={styles.searchSection}>
        <input 
          type="number" 
          placeholder="Precio máximo" 
          value={maxPrice} 
          onChange={(e) => setMaxPrice(e.target.value)} 
          className={styles.searchInput}
        />
        <button onClick={handleMaxPriceSearch} className={styles.searchButton}>Buscar por Precio Máximo</button>
      </div>

      {/* Campo para buscar por stock mínimo */}
      <div className={styles.searchSection}>
        <input 
          type="number" 
          placeholder="Stock mínimo" 
          value={minStock} 
          onChange={(e) => setMinStock(e.target.value)} 
          className={styles.searchInput}
        />
        <button onClick={handleMinStockSearch} className={styles.searchButton}>Buscar por Stock Mínimo</button>
      </div>

      {/* Campo para buscar por stock máximo */}
      <div className={styles.searchSection}>
        <input 
          type="number" 
          placeholder="Stock máximo" 
          value={maxStock} 
          onChange={(e) => setMaxStock(e.target.value)} 
          className={styles.searchInput}
        />
        <button onClick={handleMaxStockSearch} className={styles.searchButton}>Buscar por Stock Máximo</button>
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
          {results.map(producto => (
            <tr key={producto.id}>
              <td><Link href={`/productos/${producto.id}`}>{producto.id}</Link></td>
              <td>{producto.nombre}</td>
              <td>{producto.stockActual}</td>
              <td>{producto.precio}</td>
              <td>{producto.categoria}</td>
              <td>{producto.descuentoPromocional}</td>
              <td>
                <button className={styles.editButton} onClick={() => handleEdit(producto)}>Editar</button>
                <button className={styles.deleteButton} onClick={() => handleDelete(producto.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingProducto && (
        <div className={styles.editForm}>
          <h2 className={styles.title}>Editar Producto: {editingProducto.nombre}</h2>
          <form className={styles.searchSection} onSubmit={handleUpdateStockAndPrice}>
            <input
              type="number"
              value={nuevaCantidad}
              onChange={(e) => setNuevaCantidad(e.target.value)}
              placeholder="Nueva cantidad"
              className={styles.editInput}
            />
            <input
              type="number"
              value={nuevoPrecio}
              onChange={(e) => setNuevoPrecio(e.target.value)}
              placeholder="Nuevo precio"
              className={styles.editInput}
            />
            <button className={styles.searchButton} type="submit">Actualizar Stock y Precio</button>
          </form>
          <form className={styles.searchSection} onSubmit={handleUpdateDiscount}>
            <input
              type="number"
              value={nuevoDescuento}
              onChange={(e) => setNuevoDescuento(e.target.value)}
              placeholder="Nuevo descuento"
              className={styles.editInput}
            />
            <button className={styles.searchButton} type="submit">Actualizar Descuento</button>
          </form>
        </div>
      )}
    </div>
  );
}

/*'use client';
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
