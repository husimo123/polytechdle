import { useEffect, useState } from "react";

export default function SearchResults({ query, onSelect, exclude = [] }) {
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
        const response = await fetch(`http://localhost:5000/search?q=${query}`);
        const data = await response.json();
        
        // Exclure les professeurs déjà tentés
        const filteredResults = data.filter(prof => !exclude.includes(prof.nom));
        setResults(filteredResults);
      } catch (error) {
        console.error("Erreur lors de la récupération des résultats :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, exclude]); // Ajout de `exclude` dans les dépendances

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
          className="search-item"
          onClick={() => onSelect(prof)}
          style={{ cursor: "pointer" }}
        >
          <img src={prof.photo} alt={`${prof.prenom} ${prof.nom}`} className="prof-photo" />
          <span>{prof.prenom} {prof.nom}</span>
        </li>
      ))}
    </ul>
  );
}
