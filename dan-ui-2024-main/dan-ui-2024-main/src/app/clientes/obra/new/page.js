'use client';

import { useState } from 'react';
import { crearObra } from '@/lib/clientes-api'; // Asegúrate de que la ruta sea correcta

export default function () {
  const [obraDireccion, setObraDireccion] = useState('');
  const [obraRemodelacion, setObraRemodelacion] = useState('');
  const [coordenadasLat, setCoordenadasLat] = useState('');
  const [coordenadasIng, setCoordenadasIng] = useState('');
  const [idCliente, setIdCliente] = useState('');
  const [obraPresupuesto, setObraPresupuesto] = useState('');
  const [obraEstado, setObraEstado] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!obraDireccion || !obraRemodelacion || !idCliente || !obraEstado) {
      setError('Todos los campos son obligatorios');
      return;
    }

    // Crear el objeto cliente
    const nuevaObra = {
      direccion: obraDireccion,
      esRemodelacion: obraRemodelacion,
      lat: coordenadasLat,
      lng: coordenadasIng,
      cliente:{ id: idCliente
       },
      presupuesto: obraPresupuesto,
      estado: obraEstado
    };

    try {
      await crearObra(nuevaObra);
      setSuccessMessage(`Obra "${nuevaObra}" creada exitosamente`);
      setObraDireccion('');
      setObraRemodelacion('');
      setCoordenadasLat('');
      setCoordenadasIng('');
      setIdCliente('');
      setObraPresupuesto('');
      setObraEstado('');
      setError('');
    } catch (err) {
      setError('Error al dar de alta el cliente');
    }
  };

  return (
    <>
      <h1>Dar de alta Nueva Obra</h1>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleCreate}>
        <div>
          <label htmlFor="direccion">Direcion de la Obra</label>
          <input
            type="text"
            id="obraDireccion"
            value={obraDireccion}
            onChange={(e) => setObraDireccion(e.target.value)}
          />
        </div>
        <div>
            <label htmlFor="remodelacion">¿Es Remodelación?</label>
            <select
                id="remodelacion"
                value={obraRemodelacion}
                onChange={(e) => setObraRemodelacion(e.target.value)}
                >
                <option value="">Seleccione una opción</option>
                <option value="true">true</option>
                <option value="false">false</option>
            </select>
        </div>
        <div>
          <label htmlFor="lat">Coordenadas Latitud</label>
          <input
            type="numbre"
            id="coordenadasLat"
            value={coordenadasLat}
            onChange={(e) => setCoordenadasLat(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="ing">Coordenadas Longitud</label>
          <input
            type="number"
            id="coordenadasIng"
            value={coordenadasIng}
            onChange={(e) => setCoordenadasIng(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cliente">ID del Cliente al cual pertenece la Obra</label>
          <input
            type="number"
            id="idCliente"
            value={idCliente}
            onChange={(e) => setIdCliente(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="presupuesto">Presupuesto de la Obra</label>
          <input
            type="number"
            id="obraPresupuesto"
            value={obraPresupuesto}
            onChange={(e) => setObraPresupuesto(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="Estado">Estado en el que se encuentra la Obra</label>
          <select
                id="estado"
                value={obraEstado}
                onChange={(e) => setObraEstado(e.target.value)}
                >
                <option value="">Seleccione una opción</option>
                <option value="HABILITADA">HABILITADA</option>
                <option value="PENDIENTE">PENDIENTE</option>
            </select>
        </div>

        <button type="submit">Dar de alta Obra</button>
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
