'use client';

import Link from 'next/link';
import { useState } from 'react';
//import { CrearCliente } from "@/lib/clientes-api"; // Función simulada para agregar un producto

export default function CrearCliente() {
  const [clientName, setClientName] = useState('');
  const [clientCuit, setCuitClient] = useState('');
  const [clientCorreo, setCorreoClient] = useState('');
  const [clientMaxDescubierto, setclientMaxDescubierto] = useState('');
  const [clientMaxObras, setclientMaxObras] = useState('')
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Manejar la creación del producto
  const handleCreate = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!clientName || !clientCuit || !clientCorreo || !clientMaxDescubierto || !clientMaxObras) {
      setError('Todos los campos son obligatorios');
      return;
    }

    // Simulación de la creación del producto
    try {
      await crearClinte({ name: clientName, cuit: clientCuit, correo: clientCuit, maximoDescubierto: parseFloat(clientMaxDescubierto), maximoObras: parseFloat(clientMaxObras) });
      setSuccessMessage(`Cliente "${clientName}" creado exitosamente`);
      setClientName('');
      setCuitClient('');
      setCorreoClient('');
      setclientMaxDescubierto('');
      setclientMaxObras('');
      setError('');
    } catch (err) {
      setError('Error al dar de alta el cliente');
    }
  };

  return (
    <>
      <h1>Dar de alta Nuevo Cliente</h1>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleCreate}>
        <div>
          <label htmlFor="name">Nombre del Cliente</label>
          <input
            type="text"
            id="name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="cuit">Cuit del Cliente</label>
          <input
            type="number"
            id="cuit"
            value={clientCuit}
            onChange={(e) => setCuitClient(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="correo">Correo del Cliente</label>
          <input
            type="text"
            id="correo"
            value={clientCorreo}
            onChange={(e) => setCorreoClient(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="maximoDescubierto">Maximo Descubierto</label>
          <input
            type="number"
            id="maxDescubierto"
            value={clientMaxDescubierto}
            onChange={(e) => setclientMaxDescubierto(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="maximaObras">Maximo cantidad de obras en ejecución</label>
          <input
            type="number"
            id="maxObras"
            value={clientMaxObras}
            onChange={(e) => setclientMaxObras(e.target.value)}
          />
        </div>

        <button type="submit">Dar de alta Cliente</button>
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
      `}</style>
    </>
  );
}