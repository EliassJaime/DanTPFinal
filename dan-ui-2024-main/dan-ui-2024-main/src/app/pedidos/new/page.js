'use client';
import { useState, useEffect } from 'react';
import { getClientesDisponibles, getProductosDisponibles, getObrasDisponibles, crearPedido } from '@/lib/pedidos-api'; 

export default function CrearPedido() {
  const [clientes, setClientes] = useState([]);
  const [obras, setObras] = useState([]);
  const [productos, setProductos] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [pedido, setPedido] = useState([]);
  const [observaciones, setObservaciones] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [createdOrder, setCreatedOrder] = useState(null);


  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const clientesDisponibles = await getClientesDisponibles();
        setClientes(clientesDisponibles);
        console.log(clientesDisponibles);
      } catch (err) {
        setError('Error al cargar los clientes.');
      }
    };

    const fetchProductos = async () => {
      try {
        const productosDisponibles = await getProductosDisponibles();
        setProductos(productosDisponibles);
      } catch (err) {
        setError('Error al cargar los productos.');
      }
    };

    fetchClientes();
    fetchProductos();
  }, []);

  
  const handleClienteChange = (e) => {
    const clienteId = parseInt(e.target.value, 10); 
    console.log("Cliente seleccionado ID:", clienteId); 
  
    const clienteSeleccionado = clientes.find((cliente) => cliente.id === clienteId);
    console.log("Cliente seleccionado:", clienteSeleccionado); 
    setSelectedCliente(clienteSeleccionado);
  
    
    if (clienteSeleccionado) {
      setObras([]); 
      getObrasDisponibles(clienteId)
        .then((obrasDisponibles) => {
          setObras(obrasDisponibles);
        })
        .catch(() => {
          setError('Error al cargar las obras del cliente.');
        });
    }
  };
  
  

  const handleAddProduct = (producto) => {
    const existingProduct = pedido.find((p) => p.id === producto.id);
    if (existingProduct) {
      updateProductQuantity(producto.id, 1);
    } else {
      setPedido([...pedido, { ...producto, cantidad: 1, precioUnitario: producto.precio, precioFinal: producto.precio }]);
    }
  };

 
  const updateProductQuantity = (productoId, delta) => {
    const updatedPedido = pedido.map((p) => {
      if (p.id === productoId) {
        const nuevaCantidad = Math.max(0, p.cantidad + delta);
        return {
          ...p,
          cantidad: nuevaCantidad,
          precioFinal: nuevaCantidad * p.precioUnitario
        };
      }
      return p;
    });
    setPedido(updatedPedido);
  };

  // Submit the order
  const handleSubmit = async () => {
    if (!selectedCliente || pedido.length === 0) {
      setError('Debes seleccionar un cliente y agregar al menos un producto.');
      return;
    }

    const nuevoPedido = {
      usuario: selectedCliente.nombre,
      observaciones,
      cliente: {
        id: selectedCliente.id,
        nombre: selectedCliente.nombre,
        correoElectronico: selectedCliente.correoElectronico,
        cuit: selectedCliente.cuit
      },
      detalle: pedido.map((p) => ({
        producto: {
          id: p.id,
          nombre: p.nombre,
          descripcion: p.descripcion,
          stockActual: p.stockActual,
          stockMinimo: p.stockMinimo,
          precio: p.precio
        },
        cantidad: p.cantidad,
        precioUnitario: p.precioUnitario,
        descuento: 0, 
        precioFinal: p.precioFinal
      }))
    };

    try {
      await crearPedido(nuevoPedido);
      setSuccessMessage('Pedido creado exitosamente.');
      setPedido([]); 
    } catch (error) {
      setError('Error al crear el pedido.');
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Crear Pedido</h1>

      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}

      <div className="searchSection">
        <label htmlFor="cliente">Seleccionar Cliente:</label>
        <select
            id="cliente"
            onChange={handleClienteChange}
            value={selectedCliente?.id || ''} // Usar `selectedCliente?.id` si es null
            className="searchInput"
          >
            <option value="">Selecciona un cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.correoElectronico} {/* Mostrar el correo pero enviar el id */}
              </option>
            ))}
        </select>
      </div>

      {selectedCliente && (
        <div className="searchSection">
          <label>Obras del Cliente:</label>
          <table className="clientTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Dirección</th>
                <th>Estado</th>
                <th>Presupuesto</th>
              </tr>
            </thead>
            <tbody>
              {obras.map((obra) => (
                <tr key={obra.id}>
                  <td>{obra.id}</td>
                  <td>{obra.direccion}</td>
                  <td>{obra.estado}</td>
                  <td>{obra.presupuesto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="searchSection">
        <label>Seleccionar Productos:</label>
        <ul className="clientTable">
          {productos.map((producto) => (
            <li key={producto.id}>
              {producto.nombre} - ${producto.precio}
              <button className="createButton" onClick={() => handleAddProduct(producto)}>Agregar</button>
            </li>
          ))}
        </ul>
      </div>

      {pedido.length > 0 && (
        <div className="searchSection">
          <h3>Productos Seleccionados:</h3>
          <ul className="clientTable">
            {pedido.map((p) => (
              <li key={p.id}>
                {p.nombre} - Cantidad: {p.cantidad} - Precio Final: ${p.precioFinal.toFixed(2)}
                <button className="createButton" onClick={() => updateProductQuantity(p.id, 1)}>+</button>
                <button className="createButton" onClick={() => updateProductQuantity(p.id, -1)}>-</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="searchSection">
        <label htmlFor="observaciones">Observaciones:</label>
        <textarea
          id="observaciones"
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
          className="searchInput"
        ></textarea>
      </div>

      <button className="createButton" onClick={handleSubmit}>Crear Pedido</button>
 
      <style jsx>{`
        .container {
          padding: 20px;
          max-width: 1000px;
          margin: 0 auto;
        }
        
        .title {
          font-size: 2rem;
          margin-bottom: 20px;
        }
        
        .searchSection {
          display: flex;
          flex-direction: column;
          margin-bottom: 20px;
        }
        
        .searchInput {
          flex: 1;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-top: 10px;
        }
        
        .clientTable {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }
        
        .clientTable th,
        .clientTable td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        
        .createButton {
          margin-top: 10px;
          padding: 10px 20px;
          border: none;
          border-radius: 100px;
          background-color: #0070f3;
          color: white;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        
        .createButton:hover {
          background-color: #005bb5;
        }
        
        .error {
          color: red;
        }
        
        .success {
          color: green;
        }
      `}</style>
    </div>
  );
}
