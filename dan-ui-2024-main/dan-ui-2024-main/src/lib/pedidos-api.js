export const buscarPedido = async (searchTerm) => {
  const response = await fetch(`http://localhost:6280/api/pedidos?search=${searchTerm}`);
  const data = await response.json();
  
  console.log("Data desde la API:", data); // Agregar este log para ver la respuesta
  
  if (!response.ok) {
    throw new Error('Error en la búsqueda de pedidos');
  }

  return data; // Asegúrate de que esta sea la estructura correcta
};


  export async function crearPedido(pedidoData) {
    const apiUrl = 'http://localhost:6280/api/pedidos'; // Asegúrate de que este sea el endpoint correcto para tu backend
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
      return data; // Asegúrate de que la estructura de datos sea la que esperas
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
      return data; // Asegúrate de que la estructura de datos sea la que esperas
    } catch (error) {
      console.error("Error al buscar obras:", error);
      return [];
    }
  }

  /*export const getProductosDisponibles = async () => {
    try {
      const response = await fetch('http://localhost:6280/api/pedidos/productos-disponible', {
        method: 'GET',
        mode : 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include' // Si necesitas enviar cookies o autenticación
      });
  
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
      
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };*/

  export async function getObrasDisponibles(clienteId) {
    const apiUrl = `http://localhost:6280/api/pedidos/obras-disponibles/${clienteId}`;
    console.log('Buscando en', apiUrl);
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data; // Asegúrate de que la estructura de datos sea la que esperas
    } catch (error) {
      console.error("Error al buscar obras:", error);
      return [];
    }
  }
  /*export const getObrasDisponibles = async () => {
    try {
      const response = await fetch(`http://localhost:6280/api/pedidos/obras-disponibles/${clienteId}`, {
        method: 'GET',
        mode : 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include' // Si necesitas enviar cookies o autenticación
      });
  
      if (!response.ok) {
        throw new Error('Error al obtener las obras');
      }
      
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };*/
  export async function eliminarPedido(pedidoId) {
    const response = await fetch(`http://localhost:6280/api/pedidos/${pedidoId}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return response.json();
  }

