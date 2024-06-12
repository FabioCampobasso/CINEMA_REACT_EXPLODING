import React, { useState, useEffect } from "react";
import { useSortedCinemas } from "./ShowCardLogic";
import ShowFilter from "./ShowFilter";
import ShowCard from "./ShowCard";
import useUserLocation from "./UserLocation";
import citiesData from "../cities_coord.json";
import { format } from "date-fns";
import locandina from "../img/locandina.jpg";

const ShowElements = () => {
  const currentDate = new Date();
  const CurrentFormattedDate = format(currentDate, "yyyy-MM-dd");
  const { location, requestLocation } = useUserLocation();
  const [searchCity, setSearchCity] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDate, setSelectedDate] = useState(CurrentFormattedDate);

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

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const filteredCinemas = sortedCinemas.filter((cinema) => {
    return (
      cinema.distance <= selectedDistance &&
      Object.keys(cinema.showtime).includes(selectedDate) // Controlla se la data selezionata è tra le chiavi
    );
  });

  return (
    <main className="d-flex flex-column">
      <div className="flex flex-col md:flex-row">
        <header className="w-full md:w-3/12 bg-gray-900 p-4">
          <div className="row">
            <div className="col-2"></div> 
            <div className="col-8">
              <img
                src={locandina}
                alt="Locandina - The Penitent"
                className="w-full h-auto shadow-lg"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="col-2"></div> 
          </div>
        </header>

        <div className="w-full flex flex-col">
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
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
            CurrentFormattedDate={CurrentFormattedDate}
          />
          <ShowCard
            filteredCinemas={filteredCinemas}
            selectedCoordinates={selectedCoordinates}
            selectedDate={selectedDate}
          />
                  <footer className="bg-gray-800 p-4 text-white">
          Termini e condizioni
        </footer>
        </div>

      </div>
    </main>
  );
};

export default ShowElements;
