import { useEffect, useState } from 'react';

export default function SearchResults({ query, onSelect }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProfs, setSelectedProfs] = useState(new Set());

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
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
  }, [query]);

  const toggleSelect = (prof) => {
    setSelectedProfs((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(prof.id)) {
        newSelected.delete(prof.id);
      } else {
        newSelected.add(prof.id);
      }
      return newSelected;
    });
    onSelect(prof);
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (results.length === 0) {
    return query ? <p>Aucun professeur trouvé pour <i>"{query}"</i></p> : null;
  }

  return (
    <ul className="search-results">
      {results.map((prof, index) => (
        <li
          key={index}
          className={`search-item ${selectedProfs.has(prof.id) ? 'selected' : ''}`}
          onClick={() => toggleSelect(prof)}
          style={{ cursor: 'pointer' }}
        >
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
