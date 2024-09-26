export const buscarPedido = async (searchTerm) => {
  const response = await fetch(`http://localhost:6280/api/pedidos?search=${searchTerm}`);
  const data = await response.json();
  
  console.log("Data desde la API:", data); 
  
  if (!response.ok) {
    throw new Error('Error en la búsqueda de pedidos');
  }

  return data; 
};


  export async function crearPedido(pedidoData) {
    const apiUrl = 'http://localhost:6280/api/pedidos'; 
    console.log(pedidoData)
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedidoData),
      });
      console.log(response)
      if (!response.ok) {
        throw new Error('HTTP error! status: ${response.status}');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al crear el cliente:', error);
      throw error;
    }
  }

  export async function getClientesDisponibles(queryValue) {
    const apiUrl = 'http://localhost:6280/api/pedidos/clientes-disponibles';
    console.log('Buscando en', apiUrl);
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error("Error al buscar obras:", error);
      return [];
    }
  }

  export async function getProductosDisponibles(queryValue) {
    const apiUrl = 'http://localhost:6280/api/pedidos/productos-disponibles';
    console.log('Buscando en', apiUrl);
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error("Error al buscar obras:", error);
      return [];
    }
  }


  export async function getObrasDisponibles(clienteId) {
    const apiUrl = `http://localhost:6280/api/pedidos/obras-disponibles/${clienteId}`;
    console.log('Buscando en', apiUrl);
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error("Error al buscar obras:", error);
      return [];
    }
  }
  
  export async function eliminarPedido(pedidoId) {
    const response = await fetch(`http://localhost:6280/api/pedidos/${pedidoId}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return response.json();
  }
  export async function actualizarPedido(pedidoUpdateDTO) {
    const response = await fetch(`http://localhost:6280/api/pedidos/estado/${pedidoUpdateDTO.numeroPedido}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ estado: pedidoUpdateDTO.nuevoEstado }), 
    });
  
    if (!response.ok) {
      throw new Error('Error al actualizar el estado del pedido');
    }
  
    return await response.json();
  }
  

