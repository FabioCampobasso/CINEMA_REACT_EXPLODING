import React from "react";

const DistanceFilter = ({ value, onChange, minDistance, maxDistance }) => {
  return (
    <article>
      
      <p className="text-gray-100 text-con-regular ml-1 mb-2">{value.toFixed(2)} km:</p>
        <input
          type="range"
          min={minDistance + 0.5}
          max= {200}
          value={value}
          onChange={onChange}
          step="1"
          className="slider mr-2 "
        />       
    
    </article>
  );
};

export default DistanceFilter;
