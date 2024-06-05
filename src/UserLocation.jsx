import { useState } from "react";

const useUserLocation = () => {
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(false);

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationError(false);
        },
        (error) => {
          setLocationError(true);
        }
      );
    } else {
      setLocationError(true);
    }
  };

  return { location, locationError, requestLocation };
};

export default useUserLocation; 
