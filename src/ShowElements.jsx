import React, { useState, useEffect } from "react";
import { useSortedCinemas } from "./ShowCardLogic";
import ShowFilter from "./ShowFilter";
import ShowCard from "./ShowCard";
import useUserLocation from "./UserLocation";
import citiesData from "../cities_coord.json";
import { format } from "date-fns";
import locandina_vert from "../img/locandina.jpg";
import locandina_orizz from "../img/locandina2.jpg";

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
    setVisibleCount((prevCount) => prevCount + 4);
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
    <header className="w-full bg-zinc-900 flex justify-center items-center lg:items-start lg:p-10">
      <div className="w-full">
        <img
          src={locandina_orizz}
          alt="Bad Boys"
          className="w-full h-full shadow-lg mx-auto mt-0 lg:hidden"
          style={{ objectFit: "cover" }}
        />
        <img
          src={locandina_vert}
          alt="Bad Boys"
          className="hidden lg:block w-full h-full shadow-lg mx-auto mt-4"
          style={{ objectFit: "cover" }}
        />
         <h1 className="text-zinc-100 font-bold text-xl text-center mt-2 mb-3 lg:text-3xl lg:text-left lg:mb-5">Bad Boys - Ride or die</h1>
        <div className="hidden lg:block pt-10 pb-10 px-2">
          <div className="flex flex-col items-left justify-left bg-zinc-900">
    
          </div>
          <h1 className="text-zinc-100 font-bold text-2xl">Trama:</h1>
          <p className="text-zinc-100 font-normal">
          Mike e Marcus tornano in azione per scagionare un vecchio amico 
          e sfidare una rete di corruzione che li porta dall'oscurità del 
          crimine organizzato fino agli angoli più bui delle forze dell'ordine. 
          Lealtà, sacrificio e adrenalina si mescolano in questo 
          esplosivo capitolo della saga.</p>
        </div>
      </div>
    </header>
    
    
    <div className="w-full lg:w-3/4 flex flex-col">
  <div className="sticky top-0 z-50"> {/* Aggiunta di sticky qui */}
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
  </div>
      <ShowCard
        className="scroll"
        filteredCinemas={filteredCinemas}
        selectedCoordinates={selectedCoordinates}
        selectedDate={selectedDate}
        location={location}
      />
      {filteredCinemas.length > 0 && (
        <div className="bg-zinc-300 p-3 d-flex justify-content-center">
          <button
            className="border-radius-class text-zinc-700 bg-zinc-100 col-span-3 text-md m-2 p-1 px-3 text-con-regular position:fixed lg:z-10"
            onClick={handleShowMore}
          >
            Mostra altri
          </button>
        </div>
      )}
      <footer className="bg-zinc-800 p-4 text-white">
        Termini e condizioni
      </footer>
    </div>
  </div>
</main>

  );
};

export default ShowElements;
