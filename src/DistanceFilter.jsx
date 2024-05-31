import React from "react";

const DistanceFilter = ({ value, onChange, minDistance, maxDistance }) => {
  return (
    <article className="d-flex align-items-center">
      <div>
      <p className="mb-1">{value.toFixed(2)} km da te:</p>
        <input
          type="range"
          min={minDistance + 0.5}
          max={maxDistance + 0.5}
          value={value}
          onChange={onChange}
          step="1"
          className="form-range "
        />       
      </div>
    </article>
  );
};

export default DistanceFilter;
