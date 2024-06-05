import React from "react";

const DistanceFilter = ({ value, onChange, minDistance, maxDistance }) => {
  return (
    <article>
      
      <p className="mb-1">{value.toFixed(2)} km:</p>
        <input
          type="range"
          min={minDistance + 0.5}
          max= {50}
          value={value}
          onChange={onChange}
          step="1"
          className="text-sm form-range mr-2"
        />       
    
    </article>
  );
};

export default DistanceFilter;
