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
  const [visibleCount, setVisibleCount] = useState(8);

  const selectedCoordinates = selectedCity
    ? {
        lat: selectedCity.coordinates.latitude,
        lng: selectedCity.coordinates.longitude,
      }
    : location;

  const { sortedCinemas, maxDistance } = useSortedCinemas(selectedCoordinates);
  const [selectedDistance, setSelectedDistance] = useState(maxDistance);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 2);
  };

  const filteredCinemas = sortedCinemas
    .filter((cinema) => Object.keys(cinema.showtime).includes(selectedDate))
    .slice(0, visibleCount);

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

  return (
<main className="d-flex flex-column">
  <div className="flex flex-col lg:flex-row">
    <header className="w-full bg-gray-900 flex justify-center items-center lg:items-start lg:p-10">
      <div className="w-full">
        <img
          src={locandina}
          alt="Locandina - The Penitent"
          className="w-full h-auto shadow-lg"
          style={{ objectFit: "cover" }}
        />
        <div className=" hidden lg:block pt-10 pb-10 px-2">
              <h1 className="text-gray-100 text-bold text-2xl">Trama:</h1>
              <p className="text-gray-100 text-regular">Trama film un po lunghetta</p>
              </div>
      </div>

    </header>

    <div className="w-full lg:w-3/4 flex flex-col">
      <ShowFilter
        location={location}
        requestLocation={requestLocation}
        searchCity={searchCity}
        handleCityChange={handleCityChange}
        selectedCoordinates={selectedCoordinates}
        selectedDistance={selectedDistance}
        handleDistanceChange={handleDistanceChange}
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
        CurrentFormattedDate={CurrentFormattedDate}
      />
      <ShowCard
        filteredCinemas={filteredCinemas}
        selectedCoordinates={selectedCoordinates}
        selectedDate={selectedDate}
      />
      {filteredCinemas.length > 0 && (
        <div className="bg-gray-300 p-3 d-flex justify-content-center">
          <button
            className="border-radius-class text-gray-700 bg-gray-100 col-span-3 text-md m-2 p-1 px-3 text-con-regular"
            onClick={handleShowMore}
          >
            Mostra altri
          </button>
        </div>
      )}
      <footer className="bg-gray-800 p-4 text-white">
        Termini e condizioni
      </footer>
    </div>
  </div>
</main>

  );
};

export default ShowElements;
