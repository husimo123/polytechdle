export async function fetchData(url) {
    const response = await fetch(`http://localhost:5000${url}`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données');
    }
    return response.json();
  }
  