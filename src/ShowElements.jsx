import React, { useState, useEffect } from "react";
import { useSortedCinemas } from "./ShowCardLogic";
import CityFilter from "./CityFilter";
import DistanceFilter from "./DistanceFilter";
import useUserLocation from "./UserLocation";
import citiesData from "../cities_coords.json";

const ShowElements = () => {
  const { location, locationError, requestLocation } = useUserLocation();
  const [searchCity, setSearchCity] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
 
  const selectedCoordinates = selectedCity
    ? {
        lat: selectedCity.coordinates.latitude,
        lng: selectedCity.coordinates.longitude,
      }
    : location;

  const { sortedCinemas, minDistance, maxDistance } =
    useSortedCinemas(selectedCoordinates);
  const [selectedDistance, setSelectedDistance] = useState(maxDistance);  

  const handleCityChange = (event) => {
    const cityName = event.target.value;
    setSearchCity(cityName);

    const city = citiesData.cities.find(
      (c) => c.name.toLowerCase() === cityName.toLowerCase()
    );

    if (city) {
      setSelectedCity(city);
    } else {
      setSelectedCity(null);
    }
  };

  const handleDistanceChange = (e) => {
    setSelectedDistance(parseFloat(e.target.value));
  };

  const filteredCinemas = sortedCinemas.filter(
    (cinema) => cinema.distance <= selectedDistance
  );

  return (
    <div>
      <header className="d-flex align-items-center mb-2">
     {location ? (
       <></>
      ) : (
        <button className="btn btn-primary mx-3" onClick={requestLocation}>
          Geolocalizzami
        </button>
      )}
      <div className="d-flex align-items-center mb-2">
        {selectedCoordinates && selectedCoordinates.lat && selectedCoordinates.lng && (
          <div className="mx-3">
            <DistanceFilter
              value={selectedDistance}
              onChange={handleDistanceChange}
              minDistance={minDistance}
              maxDistance={300} // qui cambio la distanza del range
            />
          </div>
        )}
        <div className="mx-3">
          <CityFilter searchCity={searchCity} onCityChange={handleCityChange} />
        </div>
      </div>
      </header>
      <h2></h2>

      {filteredCinemas.map((cinema, index) => (
        <div key={index} className="card mb-3" style={{ maxWidth: "540px" }}>
          <div className="row g-0 col-md-8">
          <div className="card-body">
  <h2 className="card-title">
    {cinema.name} - {cinema.city}
  </h2>
  <p className="card-text">
    {cinema.address} - {cinema.distance.toFixed(2)} km
  </p>
</div>
  

            </div>
          
        </div>
      ))}
    </div>
  );
};

export default ShowElements;
