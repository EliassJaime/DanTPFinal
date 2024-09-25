
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { crearProducto } from "@/lib/productos-api"; // Función simulada para agregar un producto

export default function CrearProducto() {
  const [productName, setProductName] = useState('');
  const [productDescripcion, setProductDescripcion] = useState('');
  const [stockAnual, setStockAnual] = useState('');
  const [stockMinimo, setStockMinimo] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [categoria, setCategoria] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Manejar la creación del producto
  const handleCreate = async (e) => {
    e.preventDefault();
  
    if (!productName || !productDescripcion || !stockAnual || !stockMinimo || !productPrice || !categoria) {
      setError('Todos los campos son obligatorios');
      return;
    }
  
    try {
      const newProduct = {
        nombre: productName,
        descripcion: productDescripcion,
        stockActual: parseInt(stockAnual),
        stockMinimo: parseInt(stockMinimo),
        precio: parseFloat(productPrice),
        categoria: categoria,  // Asegúrate de que este valor coincida con tu enum en el backend
      };
  
      await crearProducto(newProduct);
      setSuccessMessage(`Producto "${productName}" creado exitosamente`);
      resetForm(); // Resetear el formulario
    } catch (err) {
      setError('Error al crear el producto');
      console.error(err); // Imprimir el error en la consola
    }
  };  
  
  // Resetea los campos del formulario
  const resetForm = () => {
    setProductName('');
    setProductDescripcion('');
    setStockAnual('');
    setStockMinimo('');
    setProductPrice('');
    setCategoria('');
  };
  return (
    <>
      <h1>Crear Nuevo Producto</h1>

      {/* Mostrar mensajes de éxito o error */}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleCreate}>
        <div>
          <label htmlFor="name">Nombre del Producto</label>
          <input
            type="text"
            id="name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="descripcion">Descripcion del Producto</label>
          <input
            type="text"
            id="descripcion"
            value={productDescripcion}
            onChange={(e) => setProductDescripcion(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="stockAnual">Stock anual del Producto</label>
          <input
            type="number"
            id="stockAnual"
            value={stockAnual}
            onChange={(e) => setStockAnual(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="stockMinimo">Stock minimo del Producto</label>
          <input
            type="number"
            id="stockMinimo"
            value={stockMinimo}
            onChange={(e) => setStockMinimo(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price">Precio del Producto</label>
          <input
            type="number"
            id="price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="categoria">Categoria del Producto</label>
          <select
                id="categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                >
                <option value="">Seleccione una opción</option>
                <option value="CEMENTOS">CEMENTOS</option>
                <option value="PLACAS">PLACAS</option>
                <option value="PERFILES">PERFILES</option>
                <option value="MORTEROS">MORTEROS</option>
                <option value="YESERIA">YESERIA</option>
            </select>
        </div>

        <button type="submit">Crear Producto</button>
      </form>

      <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-top: 20px;
          max-width: 500px;
        }
        label {
          font-size: 1.2rem;
          margin-bottom: 5px;
        }
        input {
          padding: 10px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          width: 100%;
        }
        button {
          background-color: #0070f3;
          color: white;
          padding: 10px 20px;
          border: none;
          cursor: pointer;
          font-size: 1rem;
        }
        button:hover {
          background-color: #005bb5;
        }
        select {
          padding: 10px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          width: 100%;
         }
      `}</style>
    </>
  );
}