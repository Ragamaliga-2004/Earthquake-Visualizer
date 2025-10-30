import styled from "styled-components";

const LegendContainer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: white;
  border-radius: 8px;
  padding: 10px 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  font-family: "Poppins", sans-serif;
  font-size: 0.9rem;
  z-index: 1000;

  .legend-item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  .color-box {
    width: 15px;
    height: 15px;
    margin-right: 8px;
    border-radius: 3px;
  }
`;

function Legend() {
  return (
    <LegendContainer>
      <strong>Legend</strong>
      <div className="legend-item">
        <div className="color-box" style={{ background: "green" }}></div>
        Magnitude &lt; 3
      </div>
      <div className="legend-item">
        <div className="color-box" style={{ background: "orange" }}></div>
        3 ≤ Magnitude &lt; 5
      </div>
      <div className="legend-item">
        <div className="color-box" style={{ background: "red" }}></div>
        Magnitude ≥ 5
      </div>
    </LegendContainer>
  );
}

export default Legend;
