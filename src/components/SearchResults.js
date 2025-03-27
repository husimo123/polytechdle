import { useEffect, useState } from 'react';

export default function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        // Modifiez ici pour utiliser l'URL complète de l'API
        const response = await fetch(`http://localhost:5000/search?q=${query}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des résultats :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]); // Déclenche uniquement quand `query` change

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (results.length === 0) {
    return query ? <p>Aucun professeur trouvé pour <i>"{query}"</i></p> : null;
  }

  return (
    <ul className="search-results">
      {results.map((prof, index) => (
        <li key={index} className="search-item">
          <img
            src={prof.photo}
            alt={`${prof.prenom} ${prof.nom}`}
            className="prof-photo"
          />
          <span>{prof.prenom} {prof.nom}</span>
        </li>
      ))}
    </ul>
  );
}
