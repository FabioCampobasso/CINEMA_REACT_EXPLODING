import React, { useState } from "react";
import citiesData from "../cities_coord.json";  // Assicurati che il percorso sia corretto

const CityFilter = ({ searchCity, onCityChange }) => {
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (event) => {
    onCityChange(event);  // Chiama la tua funzione già definita che gestisce il cambio
    const userInput = event.target.value;
    if (userInput.length > 1) {  // Suggerimenti attivati dopo almeno 2 caratteri
      const filteredSuggestions = citiesData.cities.filter(city =>
        city.name.toLowerCase().startsWith(userInput.toLowerCase())
      ).map(city => city.name).slice(0, 3);  // Filtra e limita a 3 suggerimenti
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const isExactMatch = suggestions.some(suggestion => suggestion.toLowerCase() === searchCity.toLowerCase());

  return (
    <label>
      <h6 className="text-gray-100 text-con-regular ml-1">Scegli la città:</h6>
      <input 
        type="text"
        value={searchCity}
        onChange={handleInputChange}
        className="border-radius-class p-2 bg-gray-700 text-xs text-gray-200 mt-1 text: capitalize"
        placeholder="Inserisci città"
      />
      {!isExactMatch && suggestions.length > 0  && (
        <ul className="list-group position: absolute">
          {suggestions.map((city, index) => (
            <li key={index} className="list-group-item text-gray-600  bg-gray-200 text-xs text:capitalize pt-1 pb-1 px-2" onClick={() => onCityChange({target: {value: city} })}>
              {city}
            </li>
          ))}
        </ul>
      )}
    </label>
  );
};

export default CityFilter;
