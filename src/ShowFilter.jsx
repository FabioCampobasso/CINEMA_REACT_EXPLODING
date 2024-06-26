import React from "react";
import PositionFilter from "./PositionFilter";
import DateFilter from "./DataFilter";

const ShowFilter = ({
  location,
  requestLocation,
  searchCity,
  handleCityChange,
  handleDateChange,
  selectedDate,
}) => {
  return (
    <div>
      <div className="col-span-12">
        <PositionFilter
          searchCity={searchCity}
          onCityChange={handleCityChange}
          requestLocation={requestLocation}
          location={location}
        />
      </div>

      <div>
        <DateFilter
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
        />
      </div>
    </div>
  );
};

export default ShowFilter;
