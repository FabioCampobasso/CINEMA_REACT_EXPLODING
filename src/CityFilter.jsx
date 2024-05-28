import React from "react";

const CityFilter = ({ searchCity, onCityChange}) => {
  return (
    <label>
      Filtra per città:
      <input
        type="text"
        value={searchCity}
        onChange={onCityChange}
        className="form-control"
        placeholder="Inserisci il nome della città"
      />
    </label>
  );
};

export default CityFilter;
