
import React from "react";
import useUserLocation from "./UserLocation";
import useData from "./ReadData";
import { calculateDistance } from "./utils";

const useSortedCinemas = (selectedCoordinates = null) => {
  const userLocation = useUserLocation();
  const cinemas = useData();

  const baseCoordinates = selectedCoordinates || userLocation;

  const sortedCinemas = cinemas
    .map((cinema) => {
      const distance = calculateDistance(
        baseCoordinates.lat,
        baseCoordinates.lng,
        cinema.coordinates.lat,
        cinema.coordinates.lng
      );

      return { ...cinema, distance };
    })
    .sort((a, b) => a.distance - b.distance);

  const minDistance = sortedCinemas.length ? sortedCinemas[0].distance : 0;
  const maxDistance = sortedCinemas.length ? sortedCinemas[sortedCinemas.length - 1].distance : 50;

  return { sortedCinemas, minDistance, maxDistance };
};

export { useSortedCinemas };

