import React from "react";
import not_found from "../img/not_found.png";

const ShowCard = ({ filteredCinemas, selectedDate }) => {
  const isEmpty = (arr) => {
    return arr.length === 0;
  };

  return (
    <div className="bg-gray-300 pt-3 pb-5">
      {isEmpty(filteredCinemas) ? (
        <div className="d-flex flex-column align-items-center p-6 m-16">
          <img
            src={not_found}
            className=" mb-6"
            alt={`Nessun cinema trovato`}
          />
          <h2 className="text-bold text-center text-lg">
            Non ho trovato cinema
          </h2>
        </div>
      ) : null}
      {filteredCinemas.map((cinema, index) => (
        <div
          key={index}
          className="m-3 mb-4 "
        >
          <div className="flex ">
            <div className="w-full p-3 pt-4 pb-4 bg-hover bg-gray-100 rounded-xl border-radius-card">
              <h2
                className=" text-xl mb-0 text-con-bold text-gray-700"
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
                className=" text-gray-500 text-bold"
                alt={`All'indirizzo: ${cinema.address}`}
              >
                {cinema.address} - {cinema.distance.toFixed(2)} km
              </p>

              <div>
                {Object.keys(cinema.showtime[selectedDate]).map((key) => (
                  <button
                    className="bg-gray-600 text-bold text-gray-100 p-1 px-2 mt-2 mr-2 text-xs rounded-pill"
                    key={cinema.showtime[selectedDate][key].ora}
                    onClick={() =>
                      (window.location.href =
                        cinema.showtime[selectedDate][key].url)
                    }
                  >
                    {cinema.showtime[selectedDate][key].ora}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowCard;
