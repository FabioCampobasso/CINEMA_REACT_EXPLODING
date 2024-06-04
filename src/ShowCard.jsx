import React, { useEffect } from 'react';
import not_found from "../img/not_found.png";

const ShowCard = ({ filteredCinemas, selectedCoordinates }) => {

  const isEmpty = (arr) => {
    return arr.length === 0;
  };
 
  return (
    <div>
      {isEmpty(filteredCinemas) ? ( 
        <div className="d-flex flex-column align-items-center mt-0">
          <img src={not_found} alt="not_found" className="mb-3" />
          <h2 className="text-center font-semibold">Non ho trovato cinema</h2>
        </div>
      ) : null}
      {filteredCinemas.map((cinema, index) => (
        <div
          key={index}
          className="card m-3 bg-white shadow-md rounded-lg overflow-hidden text-sm"
        >
          <div className="flex">
            <div className="card-body p-4">
              <h2 className="card-title text-lg font-semibold mb-2">
                {cinema.name} - {cinema.city}
              </h2>
              <p className="card-text text-gray-700">
                {cinema.address} - {cinema.distance.toFixed(2)} km 
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowCard;
