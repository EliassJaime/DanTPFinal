'use client';

import Link from 'next/link';
import { useState } from 'react';
//import { CrearCliente } from "@/lib/clientes-api"; // Función simulada para agregar un producto

export default function CrearPedido() {
  const [fechaPedido, setFecha] = useState('');
  const [numeroPedido, setNumeroPedido] = useState('');
  const [userPedido, setUser] = useState('');
  const [observacionesPedido, setobservacionesPedido] = useState('');
  const [clientePedido, setClientePedido] = useState('');
  const [obraPedido, setObraPedido] = useState('');
  const [estadosPedido, setEstadosPedidos] = useState('');
  const [totalPedido, setTotalPedido] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Manejar la creación del producto
  const handleCreate = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!fechaPedido || !numeroPedido || !userPedido || !observacionesPedido || !obraPedido || !clientePedido || !estadosPedido || !totalPedido) {
      setError('Todos los campos son obligatorios');
      return;
    }

    // Simulación de la creación del producto
    try {
      await CrearPedido({ fecha: fechaPedido, numeroPedido: numeroPedido, user: userPedido, observaciones: observacionesPedido, obras: obraPedido, cliente: clientePedido, estados: estadosPedido, total:totalPedido  });
      setSuccessMessage(`Pedido "${numeroPedido}" creado exitosamente`);
      setFecha('');
      setNumeroPedido('');
      setUser('');
      setobservacionesPedido('');
      setObraPedido('');
      setClientePedido('');
      setEstadosPedidos('');
      setTotalPedido('');
      setError('');
    } catch (err) {
      setError('Error al dar de alta el cliente');
    }
  };

  return (
    <>
      <h1>Crear Nuevo Pedido</h1>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleCreate}>
        <div>
          <label htmlFor="fecha">Fecha del pedido</label>
          <input
            type="text"
            id="fecha"
            value={Date}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="nuemeroPedido">Numero del pedido</label>
          <input
            type="number"
            id="numeroPedido"
            value={numeroPedido}
            onChange={(e) => setNumeroPedido(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="user">Usuario del pedido</label>
          <input
            type="text"
            id="user"
            value={userPedido}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="observaciones">Observaciones</label>
          <input
            type="text"
            id="observaciones"
            value={observacionesPedido}
            onChange={(e) => setobservacionesPedido(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="obrasPedido">A que obra esta asociada este pedido</label>
          <input
            type="text"
            id="obraPedido"
            value={obraPedido}
            onChange={(e) => setObraPedido(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="clientePedido">A que cliente esta asociado este pedido</label>
          <input
            type="text"
            id="clientePedido"
            value={clientePedido}
            onChange={(e) => setClientePedido(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="estadoPedido">Estado en el que se encuentra el pedido</label>
          <input
            type="text"
            id="estadoPedido"
            value={estadosPedido}
            onChange={(e) => setEstadosPedidos(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="totalPedido">Total del pedido</label>
          <input
            type="number"
            id="totalPedido"
            value={totalPedido}
            onChange={(e) => setTotalPedido(e.target.value)}
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