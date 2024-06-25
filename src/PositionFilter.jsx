import React, { useState, useEffect, useRef } from 'react';
import citiesData from '../cities_coord.json'; // Assicurati che il percorso sia corretto

const PositionFilter = ({ searchCity, onCityChange, location, requestLocation }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef(null); // Riferimento al container del componente per gestire il focus

  const handleInputChange = (event) => {
    setIsFocused(true);
    onCityChange(event);
    const userInput = event.target.value.trimEnd();
    if (userInput.length > 1) {
      const filteredSuggestions = citiesData.cities
        .filter(city => city.name.toLowerCase().startsWith(userInput.toLowerCase()))
        .map(city => city.name)
        .slice(0, 3);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    // Ricarica i suggerimenti se l'input ha già un valore
    if (searchCity && suggestions.length === 0) {
      const userInput = searchCity.trimEnd();
      if (userInput.length > 1) {
        const filteredSuggestions = citiesData.cities
          .filter(city => city.name.toLowerCase().startsWith(userInput.toLowerCase()))
          .map(city => city.name)
          .slice(0, 3);
        setSuggestions(filteredSuggestions);
      }
    }
  };

  const handleCitySelect = (city) => {
    onCityChange({ target: { value: city } });
    setIsFocused(false); // Chiudi i suggerimenti quando selezioni una città
  };

  const handleRequestLocationClick = () => {
    requestLocation();
    setIsFocused(false); // Chiudi i suggerimenti quando selezioni "La tua posizione"
  };

  // Hook per gestire il click al di fuori del componente per chiudere i suggerimenti
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [containerRef]);

  return (
    <div ref={containerRef} className="w-full p-4 lg:p-6 relative bg-zinc-800">
      <div className="col-span-12 relative">
        <input
          type="text"
          value={searchCity}
          onChange={handleInputChange}
          onFocus={handleFocus}
          className="rounded-lg w-full p-2 lg:mt-4 lg:mx-4 bg-zinc-700 text-zinc-300 border-zinc-700 placeholder-zinc-400 text-sm lg:text-xl"
          placeholder="Inserisci città e scropri il cinema più vicino a te"
        />
        {isFocused && (
          <ul className="list-group absolute w-full top-full bg-white shadow-lg ml-0 lg:ml-4">
            {!location && (
              <li
                className="bg-rose-600 list-group-item text-zinc-200 cursor-pointer border-rose-600 font-bold py-2 text-sm"
                onClick={handleRequestLocationClick}
                onMouseDown={(e) => e.preventDefault()}
              >
                La tua posizione
              </li>
            )}
            {suggestions.map((city, index) => (
              <li
                key={index}
                className="list-group-item text-zinc-600 bg-zinc-200 text-xs capitalize py-2 px-2 cursor-pointer"
                onClick={() => handleCitySelect(city)}
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PositionFilter;
