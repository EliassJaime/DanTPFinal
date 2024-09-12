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
