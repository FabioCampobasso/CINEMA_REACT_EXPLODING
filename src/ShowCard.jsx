import React, { useEffect } from 'react';

const ShowCard = ({ filteredCinemas, selectedCoordinates, onAddressesExtracted }) => {
  useEffect(() => {
    if (filteredCinemas.length > 0) {
      const addresses = filteredCinemas.map(cinema => cinema.address);
      onAddressesExtracted(addresses);
    }
  }, [filteredCinemas, onAddressesExtracted]);

  return (
    <div>
      {!selectedCoordinates || !selectedCoordinates.lat || !selectedCoordinates.lng ? (
        <div className="d-flex flex-column align-items-center mt-0">
          <img src="../img/not_found.png" alt="not_found" className="mb-3" />
          <h2 className="text-center font-semibold">Non ho trovato cinema</h2>
        </div>
      ) : null}
      {filteredCinemas.map((cinema, index) => (
        <div
          key={index}
          className="card mb-4 max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden text-sm"
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
