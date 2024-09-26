export async function buscarCliente(queryValue) {
  const apiUrl = 'http://localhost:6080/api/clientes';
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

export async function crearCliente(clienteData) {
  const apiUrl = 'http://localhost:6080/api/clientes'; 
  console.log(clienteData)
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clienteData),
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
export async function crearObra(obraData) {
  const apiUrl = 'http://localhost:6081/api/obras'; 
  console.log(obraData)
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obraData),
    });
    console.log(response)
    if (!response.ok) {
      throw new Error('HTTP error! status: ${response.status}');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al crear la obra:', error);
    throw error;
  }
}
export async function buscarObra(queryValue) {
  const apiUrl = 'http://localhost:6081/api/obras';
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
export async function eliminarCliente(clienteId) {
  const response = await fetch(`http://localhost:6080/api/clientes/${clienteId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function finalizarObra(obraId) {
  const response = await fetch(`http://localhost:6080/api/obras/finalizar/${obraId}`, {
    method: 'PUT',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function pendienteObra(obraId) {
  const response = await fetch(`http://localhost:6080/api/obras/marcar-pendiente/${obraId}`, {
    method: 'PUT',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
export async function habilitarObra(obraId) {
  const response = await fetch(`http://localhost:6080/api/obras/habilitar/${obraId}`, {
    method: 'PUT',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}


export const actualizarCliente = async (id, updatedData) => {
  try {
      const response = await fetch(`http://localhost:6080/api/clientes/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData), 
      });

      if (!response.ok) {
          throw new Error('Error en la actualización del cliente');
      }

      const data = await response.json();
      return data; 
  } catch (error) {
      console.error('Error al actualizar el cliente:', error);
      throw error; 
  }
};



