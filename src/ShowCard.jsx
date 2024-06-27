import React from "react";
import not_found from "../img/not_found.png";
import cerca from "../img/cerca.png";

const ShowCard = ({
  filteredCinemas,
  selectedDate,
  location,
  selectedCity,
}) => {
  const isEmpty = (arr) => {
    return arr.length === 0;
  };

  const hasLocationOrCity = location || selectedCity;

  return (
    <main className="bg-zinc-300">
      {isEmpty(filteredCinemas) ? (
        <div className="d-flex flex-column align-items-center p-6 m-16 lg:h-screen">
          {hasLocationOrCity ? (
            <>
              <h2 className="text-con-bold text-rose-600 text-center text-xl lg:text-3xl text-nowrap lg:mt-40">
                NON HO TROVATO CINEMA
              </h2>
              <img
                src={not_found}
                className="mb-1 "
                alt="Nessun cinema trovato"
              />
            </>
          ) : (
            <>
              <h2 className="text-con-bold text-rose-600 text-center text-xl lg:text-3xl text-nowrap lg:mt-40">
                CERCA IL CINEMA PIÙ VICINO A TE
              </h2>
              <img src={cerca} className="mb-1" alt="Cerca" />
            </>
          )}
        </div>
      ) : null}
      {filteredCinemas.map((cinema, index) => (
        <div key={index} className="m-3">
          <div className="flex ">
            <div className="w-full p-3 lg:pt-4 lg:pb-4 bg-zinc-100 rounded-xl border-radius-card">
              <h2
                className=" text-xl mb-0 text-con-bold text-zinc-700"
                alt={`Cinema: ${cinema.name}`}
                onClick={() => {
                  if (cinema.link.includes("http")) {
                    window.open(cinema.link, "_blank");
                  }
                }}
              >
                {cinema.name}
              </h2>
              <p
                className=" text-zinc-500 text-regular text-sm"
                alt={`All'indirizzo: ${cinema.address}`}
              >
                {cinema.address} - {cinema.distance.toFixed(2)} km
              </p>

              <div>
                {Object.keys(cinema.showtime[selectedDate]).map((key) => (
                  <button
                    className="bg-zinc-600 text-bold text-zinc-100 p-1 px-2 mt-2 mr-2 text-xs rounded-pill bg-hover"
                    key={cinema.showtime[selectedDate][key].ora}
                    onClick={() => {
                      window.open(
                        cinema.showtime[selectedDate][key].url,
                        "_blank"
                      );
                    }}
                  >
                    {cinema.showtime[selectedDate][key].ora}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
};

export default ShowCard;
