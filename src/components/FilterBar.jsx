import styled from "styled-components";

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
  gap: 10px;

  select {
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1rem;
  }
`;

function FilterBar({ filterValue, setFilterValue }) {
  return (
    <FilterContainer>
      <label>Filter by Magnitude:</label>
      <select value={filterValue} onChange={(e) => setFilterValue(e.target.value)}>
        <option value="0">All</option>
        <option value="3">Above 3</option>
        <option value="5">Above 5</option>
      </select>
    </FilterContainer>
  );
}

export default FilterBar;
