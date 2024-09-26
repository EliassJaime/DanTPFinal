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
      return data; 
    } catch (error) {
      console.error("Error al buscar clientes:", error);
      return [];
    }
  }
  export async function crearProducto(productoData) {
    const apiUrl = 'http://localhost:6180/api/productos'; 
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

  export const actualizarStockYPrecio = async (stockUpdateDTO) => {
    const response = await fetch('http://localhost:6180/api/productos/provision', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stockUpdateDTO),
    });
  
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error al actualizar el stock y precio: ${errorMessage}`);
    }
  
    return response.json();
  };

  export const actualizarDescuentoPromocional = async (descuentoUpdateDTO) => {
    const response = await fetch('http://localhost:6180/api/productos/promocion/descuento', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(descuentoUpdateDTO),
    });
  
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error al actualizar el descuento promocional: ${errorMessage}`);
    }
  
    return response.json();
  };

  