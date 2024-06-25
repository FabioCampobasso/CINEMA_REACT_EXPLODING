import React, { useState, useEffect } from "react";
import { useSortedCinemas } from "./ShowCardLogic";
import ShowFilter from "./ShowFilter";
import ShowCard from "./ShowCard";
import useUserLocation from "./UserLocation";
import citiesData from "../cities_coord.json";
import { format } from "date-fns";
import locandina_vert from "../img/locandina.png";
import locandina_orizz from "../img/locandina.jpg";

const ShowElements = () => {
  const currentDate = new Date();
  const CurrentFormattedDate = format(currentDate, "yyyy-MM-dd");
  const { location, requestLocation } = useUserLocation();
  const [searchCity, setSearchCity] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDate, setSelectedDate] = useState(CurrentFormattedDate);
  const [visibleCount, setVisibleCount] = useState(3);

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
    <header className="w-full bg-zinc-900 flex justify-center items-center lg:items-start lg:p-10">
      <div className="w-full">
        {/* Immagine per schermi non-lg */}
        <img
          src={locandina_orizz}
          alt="The Watcher - locandina"
          className="w-full h-full shadow-lg mx-auto mt-4 lg:hidden"
          style={{ objectFit: "cover" }}
        />
        {/* Immagine per schermi lg */}
        <img
          src={locandina_vert}
          alt="The Watcher - locandina"
          className="hidden lg:block w-full h-full shadow-lg mx-auto mt-4"
          style={{ objectFit: "cover" }}
        />
        <div className="hidden lg:block pt-10 pb-10 px-2">
          <div className="flex flex-col items-left justify-left bg-zinc-900">
            <h1 className="text-zinc-100 font-bold text-3xl text-left mb-5">The Watchers - Loro ti guardano</h1>
          </div>
          <h1 className="text-zinc-100 font-bold text-2xl">Trama:</h1>
          <p className="text-zinc-100 font-normal">
            Mina, una commessa, si ritrova intrappolata in una foresta irlandese maledetta, 
            osservata da creature misteriose che prendono le forme di chi le guarda. 
            Di notte, il bosco diventa un luogo di terrore, costringendo Mina e altri 
            sopravvissuti a lottare per la sopravvivenza in un rifugio di cemento. 
            Un thriller horror che esplora i temi del doppio e l'empatia nel cuore 
            oscuro della natura.</p>
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
        <div className="bg-zinc-300 p-3 d-flex justify-content-center">
          <button
            className="border-radius-class text-zinc-700 bg-zinc-100 col-span-3 text-md m-2 p-1 px-3 text-con-regular"
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
