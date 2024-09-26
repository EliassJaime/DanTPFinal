// Function to fetch a paginated list of Pokémon

  export async function buscarProducto(queryValue) {
    const apiUrl = 'http://localhost:6180/api/productos';
    console.log('Buscando en', apiUrl);
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data; // Asegúrate de que la estructura de datos sea la que esperas
    } catch (error) {
      console.error("Error al buscar clientes:", error);
      return [];
    }
  }
  export async function crearProducto(productoData) {
    const apiUrl = 'http://localhost:6180/api/productos'; // Asegúrate de que este sea el endpoint correcto para tu backend
    console.log(productoData)
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productoData),
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
  export async function eliminarProducto(productoId) {
    const response = await fetch(`http://localhost:6180/api/productos/${productoId}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return response.json();
  }
  