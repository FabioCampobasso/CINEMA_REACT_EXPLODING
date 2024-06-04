import React, { useState, useEffect } from "react";
import { useSortedCinemas } from "./ShowCardLogic";
import ShowFilter from "./ShowFilter";
import ShowCard from "./ShowCard";
import useUserLocation from "./UserLocation";
import citiesData from "../cities_coords.json";
import { format } from 'date-fns';

const ShowElements = () => {
  const currentDate = new Date();
const CurrentFormattedDate = format(currentDate, 'yyyy-MM-dd');
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

  const { sortedCinemas, minDistance, maxDistance } = useSortedCinemas(
    selectedCoordinates
  );
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

  const filteredCinemas = sortedCinemas.filter(
    (cinema) =>
      cinema.distance <= selectedDistance &&
      cinema.showtime.data.some((showtimeDate) => {
        const formattedShowtimeDate = new Date(showtimeDate).getTime();
        const formattedSelectedDate = new Date(selectedDate).getTime();
        return formattedShowtimeDate === formattedSelectedDate;
      })
  );

  return (
    <main className="w-full h-screen">
      <div className="flex flex-col md:flex-row h-full">
        <header className="w-full md:w-3/12 bg-slate-600 p-4">
          <img
            src="https://placehold.co/400x400"
            alt="not_found"
            className="w-full h-auto"
            style={{ objectFit: "cover" }}
          />
          <button className="btn btn-warning w-full text-center mt-2">
            Trailer
          </button>
        </header>
        <div className="w-full bg-white flex flex-col">
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
            handleDateChange={handleDateChange} // Pass handleDateChange prop
          />
          <ShowCard filteredCinemas={filteredCinemas} selectedCoordinates={selectedCoordinates} />
        </div>
      </div>
    </main>
  );
};

export default ShowElements;
