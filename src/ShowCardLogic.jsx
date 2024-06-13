import React from "react";
import useUserLocation from "./UserLocation";
import useData from "./ReadData";
import { calculateDistance } from "./utils";

const useSortedCinemas = (selectedCoordinates = null) => {
  const userLocation = useUserLocation();
  const cinemas = useData();

  // Select the appropriate coordinates to use
  const baseCoordinates = selectedCoordinates || userLocation;

  // Initialize sortedCinemas only if valid coordinates are provided
  let sortedCinemas = [];

  // Check if baseCoordinates are valid before proceeding
  if (
    baseCoordinates &&
    baseCoordinates.lat != null &&
    baseCoordinates.lng != null
  ) {
    sortedCinemas = cinemas
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
  }

  return { sortedCinemas };
};

export { useSortedCinemas };
