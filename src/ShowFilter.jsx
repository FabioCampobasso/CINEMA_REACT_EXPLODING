import React from "react";
import CityFilter from "./CityFilter";
import DistanceFilter from "./DistanceFilter";

const ShowFilter = ({
  location,
  requestLocation,
  searchCity,
  handleCityChange,
  selectedCoordinates,
  selectedDistance,
  handleDistanceChange,
  minDistance,
  handleDateChange,
  selectedDate
}) => {
  return (
    <header className="grid grid-cols-12 bg-slate-200 mb-3 p-2 md:p-4">
      {location ? (
        <></>
      ) : (
        <button
          className="btn btn-primary col-span-12 text-sm m-2 mb-0 md:text-lg md:m-4"
          onClick={requestLocation}
        >
          Geolocalizzami
        </button>
      )}
      <div className="col-span-6 text-xs m-2 md:text-lg md:m-4">
        <CityFilter searchCity={searchCity} onCityChange={handleCityChange} />
      </div>
      <div className="flex flex-col mt-4">
        <label htmlFor="selected-date" className="mb-2">
          Data
        </label>
        <input
          type="date"
          id="selected-date"
          value={selectedDate}
          onChange={(e) => handleDateChange(e.target.value)}
          className="border rounded-md p-2"
        />
      </div>
      {selectedCoordinates && selectedCoordinates.lat && selectedCoordinates.lng && (
        <div className="col-span-6 text-xs m-2 md:text-lg md:m-4">
          <DistanceFilter
            value={selectedDistance}
            onChange={handleDistanceChange}
            minDistance={minDistance}
            maxDistance={300} // qui cambio la distanza del range
          />
        </div>
      )}
    </header>
  );
};

export default ShowFilter;
