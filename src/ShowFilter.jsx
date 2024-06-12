import React from "react";
import CityFilter from "./CityFilter";
import DistanceFilter from "./DistanceFilter";
import DateFilter from "./DataFilter";


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
    <>
    <header className="grid grid-cols-12 bg-gray-800 p-3 px-4">
      {location ? (
        <></>
      ) : (
        <button
          className="border-radius-class bg-rose-600 text-white col-span-6 text-lg m-2 p-1 text-con-bold "
          onClick={requestLocation}
        >
          GEOLOCALIZZAMI
        </button>
      )}
      <div className="col-span-6 text-xs m-2 md:text-lg md:m-4">
        <CityFilter searchCity={searchCity} onCityChange={handleCityChange} />
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
    <div>
        <DateFilter selectedDate={selectedDate} handleDateChange={handleDateChange} />
      </div>
    </>
    
  );
};

export default ShowFilter;
