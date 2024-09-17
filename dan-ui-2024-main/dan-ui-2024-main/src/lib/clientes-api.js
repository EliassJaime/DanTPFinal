export async function buscarCliente(queryValue, limit, offset = 0) {
    const apiUrl = `/clientes/api/clientes`;
    console.log('querying to ', apiUrl);
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Failed to fetch clientes:", error);
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
