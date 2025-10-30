import "../styles/filterpanel.scss";

const FilterPanel = ({
  countries,
  selectedCountry,
  setSelectedCountry,
  filterValue,
  setFilterValue,
}) => {
  return (
    <div className="filter-panel">
      <h3>🌎 Filters</h3>

      <div className="filter-group">
        <label>Country:</label>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Magnitude:</label>
        <select
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        >
          <option value="0">All</option>
          <option value="3">3+</option>
          <option value="5">5+</option>
          <option value="7">7+</option>
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;
