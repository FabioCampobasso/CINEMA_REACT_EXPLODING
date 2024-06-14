import React, { useState, useEffect, useRef } from 'react';
import citiesData from '../cities_coord.json';

const PositionFilter = ({ searchCity, onCityChange, location, requestLocation }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef(null);

  const updateSuggestions = (userInput) => {
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

  const handleInputChange = (event) => {
    onCityChange(event);
    const userInput = event.target.value.trimEnd();
    updateSuggestions(userInput);
  };

  const handleFocus = () => {
    setIsFocused(true);
    updateSuggestions(searchCity);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleCitySelect = (city) => {
    onCityChange({ target: { value: city } });
    setIsFocused(false);
  };

  const handleRequestLocationClick = () => {
    requestLocation();
    setIsFocused(false);
  };

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
  }, []);

  return (
    <div ref={containerRef} className="w-full p-4 lg:p-6 relative bg-gray-800">
      <div className="col-span-12 relative">
        <input
          type="text"
          value={searchCity}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="rounded-lg w-full p-2 lg:mt-4 lg:mx-4 bg-gray-700 text-gray-300 border-gray-700 placeholder-gray-300 text-sm lg:text-xl"
          placeholder="Inserisci città"
        />
        {isFocused && (
          <ul className="list-group absolute w-full top-full bg-white shadow-lg ml-0 lg:ml-4">
            {!location && (
              <li
                className="bg-rose-600 list-group-item text-gray-200 cursor-pointer border-rose-600 font-bold py-2 text-sm"
                onClick={handleRequestLocationClick}
                onMouseDown={(e) => e.preventDefault()}
              >
                La tua posizione
              </li>
            )}
            {suggestions.map((city, index) => (
              <li
                key={index}
                className="list-group-item text-gray-600 bg-gray-200 text-xs capitalize py-2 px-2 cursor-pointer"
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
