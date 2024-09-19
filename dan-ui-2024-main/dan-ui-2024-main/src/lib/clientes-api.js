export async function buscarCliente(queryValue) {
  const apiUrl = 'http://localhost:6080/api/clientes';
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

export async function crearCliente(clienteData) {
  const apiUrl = 'http://localhost:6080/api/clientes'; // Asegúrate de que este sea el endpoint correcto para tu backend
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
  const apiUrl = 'http://localhost:6081/api/obras'; // Asegúrate de que este sea el endpoint correcto para tu backend
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
    return data; // Asegúrate de que la estructura de datos sea la que esperas
  } catch (error) {
    console.error("Error al buscar obras:", error);
    return [];
  }
}

