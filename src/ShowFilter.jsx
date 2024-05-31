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
  maxDistance,
}) => {
  return (
    <header className="grid grid-cols-12 gap-4 mb-4">
      {location ? (
        <></>
      ) : (
        <button
          className="btn btn-primary col-span-12 text-sm"
          onClick={requestLocation}
        >
          Geolocalizzami
        </button>
      )}
      <div className="col-span-6 text-xs">
        <CityFilter searchCity={searchCity} onCityChange={handleCityChange} />
      </div>
      {selectedCoordinates && selectedCoordinates.lat && selectedCoordinates.lng && (
        <div className="col-span-6 text-xs">
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
