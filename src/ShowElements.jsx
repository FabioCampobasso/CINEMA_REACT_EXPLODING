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

  // useEffect(() => {
  //   if (!location) {
  //     requestLocation();
  //   }
  // }, [location, requestLocation]);

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


  const openGoogleMaps = (lat, lng) => {
    const url = `https://www.google.it/maps/@${lat},${lng},15z?entry=ttu`;
    window.open(url, "_blank");
  };

  const handleDistanceChange = (e) => {
    setSelectedDistance(parseFloat(e.target.value));
  };

  const filteredCinemas = sortedCinemas.filter(
    (cinema) => cinema.distance <= selectedDistance
  );

  return (
    <div>
      {locationError ? (
         <button onClick={requestLocation}></button>
      ) : (
        <h4>Cinema vicino a te:</h4>
      )}
     
      <div className="d-flex align-items-center mb-2">
        <div className="mx-3">
          <DistanceFilter
            value={selectedDistance}
            onChange={handleDistanceChange}
            minDistance={minDistance}
            maxDistance={maxDistance}
          />
        </div>
        <div className="mx-3">
          <CityFilter searchCity={searchCity} onCityChange={handleCityChange} />
        </div>
      </div>

      {filteredCinemas.map((cinema, index) => (
        <div key={index} className="card mb-3" style={{ maxWidth: "540px" }}>
          <div className="row g-0">
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">
                  {cinema.name} - {cinema.city}
                </h5>
                <p className="card-text">
                  {cinema.address} - {cinema.distance.toFixed(2)} km
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    openGoogleMaps(
                      cinema.coordinates.lat,
                      cinema.coordinates.lng
                    )
                  }
                >
                  ➤
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowElements;
