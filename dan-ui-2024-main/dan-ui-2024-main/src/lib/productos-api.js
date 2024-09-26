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
  // pedidos-api.js

export const actualizarStockYPrecio = async (idProducto, cantidad, nuevoPrecio) => {
  try {
    const response = await fetch(`http://localhost:6180/api/productos/provision`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idProducto, cantidad, nuevoPrecio }),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el stock y precio');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const actualizarDescuentoPromocional = async (idProducto, nuevoDescuento) => {
  try {
    const response = await fetch(`http://localhost:6180/api/productos/promocion/descuento`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idProducto, nuevoDescuento }),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el descuento promocional');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

  