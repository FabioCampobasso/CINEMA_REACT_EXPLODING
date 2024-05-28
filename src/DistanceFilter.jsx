import React from "react";

const DistanceFilter = ({ value, onChange, minDistance, maxDistance }) => {
  return (
    <article className="d-flex align-items-center">
      <div>
        <input
          type="range"
          min={minDistance + 0.5}
          max={maxDistance + 0.5}
          value={value}
          onChange={onChange}
          step="1"
          className="form-range"
        />
        {value.toFixed(2)} km da te:
      </div>
    </article>
  );
};

export default DistanceFilter;
