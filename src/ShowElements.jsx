import React, { useState, useEffect } from "react";
import { useSortedCinemas } from "./ShowCardLogic";
import ShowFilter from "./ShowFilter";
import ShowCard from "./ShowCard";
import useUserLocation from "./UserLocation";
import citiesData from "../cities_coords.json";


const ShowElements = () => {
  const { location, requestLocation } = useUserLocation();
  const [searchCity, setSearchCity] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);

  const selectedCoordinates = selectedCity
    ? {
        lat: selectedCity.coordinates.latitude,
        lng: selectedCity.coordinates.longitude,
      }
    : location;

  const { sortedCinemas, minDistance, maxDistance } = useSortedCinemas(selectedCoordinates);
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
     
    <div className="container mx-auto p-4">
      <img src="https://placehold.co/400x400" alt="not_found" className="mb-3 w-60 h-60 mx-auto" style={{ objectFit: 'cover', marginBottom: '20px' }} />

      <ShowFilter
        location={location}
        requestLocation={requestLocation}
        searchCity={searchCity}
        handleCityChange={handleCityChange}
        selectedCoordinates={selectedCoordinates}
        selectedDistance={selectedDistance}
        handleDistanceChange={handleDistanceChange}
        minDistance={minDistance}
        maxDistance={maxDistance}
      />
      <ShowCard filteredCinemas={filteredCinemas} selectedCoordinates={selectedCoordinates} />
    </div>
  );
};

export default ShowElements;
