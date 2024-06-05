import React from "react";

const CityFilter = ({ searchCity, onCityChange}) => {
  return (
    <label>
      Filtra per città:
      <input 
        type="text"
        value={searchCity}
        onChange={onCityChange}
        className="form-control text-sm"
        placeholder="Inserisci città"
      />
    </label>
  );
};

export default CityFilter;
