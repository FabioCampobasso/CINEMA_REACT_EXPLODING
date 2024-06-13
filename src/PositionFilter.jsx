import React, { useState } from "react";
import citiesData from "../cities_coord.json"; // Assicurati che il percorso sia corretto

const PositionFilter = ({
  searchCity,
  onCityChange,
  location,
  requestLocation,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false); // Stato per tracciare il focus dell'input

  const handleInputChange = (event) => {
    onCityChange(event);
    const userInput = event.target.value;
    if (userInput.length > 1) {
      const filteredSuggestions = citiesData.cities
        .filter((city) =>
          city.name.toLowerCase().startsWith(userInput.toLowerCase())
        )
        .map((city) => city.name)
        .slice(0, 3); // Filtra e limita a 3 suggerimenti
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleFocus = () => {
    setIsFocused(true); // Imposta il focus a true quando l'input è focalizzato
  };

  const handleBlur = (event) => {
    // Assicurati che il blur non avvenga se si clicca su "La tua posizione"
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsFocused(false); // Rimuovi il focus se non si clicca su un elemento interno
    }
  };

  const isExactMatch = suggestions.some(
    (suggestion) => suggestion.toLowerCase() === searchCity.toLowerCase()
  );

  return (
    <div className="w-full grid-cols-12 p-4 relative bg-gray-800">
      <div className="col-12 col-md-8">
        <input
          type="text"
          value={searchCity}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="rounded-lg w-full p-2 bg-gray-700 text-gray-300 border-gray-700 text-con-regular placeholder-gray-300 text-sm"
          placeholder="Inserisci città"
        />
      </div>
      <ul className="list-group absolute mx-4 left-0 right-0 z-10 bg-white ">
        {!location && isFocused && (
          <li
            className="bg-rose-600 list-group-item text-gray-200 cursor-pointer border-rose-600 text-bold"
            onClick={requestLocation}
            onMouseDown={(e) => e.preventDefault()} // Previene il blur quando si clicca su questo elemento
          >
            La tua posizione
          </li>
        )}
        {!isExactMatch &&
          suggestions.map((city, index) => (
            <li
              key={index}
              className="list-group-item text-gray-600 bg-gray-200 text-xs text:capitalize text-regular pt-1 pb-1 px-2 cursor-pointer"
              onClick={() => onCityChange({ target: { value: city } })}
            >
              {city}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PositionFilter;
