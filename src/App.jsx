import MapView from "./components/MapView";
import "./styles/globals.scss";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <h1>🌍 Earthquake Visualizer</h1>
      </header>

      <main className="main-content">
        <MapView />
      </main>

      <footer className="footer">
        Data Source:{" "}
        <a
          href="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all"
          target="_blank"
          rel="noopener noreferrer"
        >
          USGS Earthquake API
        </a>
        <br />
        Built by Ragamaliga using React + Leaflet
      </footer>
    </div>
  );
}

export default App;
