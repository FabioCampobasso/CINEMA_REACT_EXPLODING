export default function DataFilter(selectedDate,handleDateChange){

    return (
        <>
        <label className="text-sm">
        Data
      </label>
      <input
        type="date"
        id="selected-date"
        value={selectedDate}
        onChange={(e) => handleDateChange(e.target.value)}
        className="form-control text-xs"
      />
      </>
    )
}