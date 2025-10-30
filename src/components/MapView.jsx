import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup, CircleMarker } from "react-leaflet";
import { fetchEarthquakeData } from "../api/earthquakeAPI";
import FilterPanel from "./FilterPanel";
import Legend from "./Legend";
import "../styles/map.scss";

function MapView() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterValue, setFilterValue] = useState("0");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchEarthquakeData();
      setEarthquakes(data);

      const countrySet = new Set();
      data.forEach((eq) => {
        const place = eq.properties.place;
        if (place) {
          const parts = place.split(",");
          const country = parts[parts.length - 1].trim();
          if (country) countrySet.add(country);
        }
      });

      setCountries(["All", ...Array.from(countrySet).sort()]);
      setLoading(false);
    };
    getData();
  }, []);

  const getColor = (magnitude) => {
    if (magnitude < 3) return "green";
    if (magnitude < 5) return "orange";
    return "red";
  };

  const filteredEarthquakes = earthquakes.filter((eq) => {
    const magFilter = eq.properties.mag >= parseFloat(filterValue);
    const place = eq.properties.place || "";
    const country = place.split(",").pop().trim();
    const countryFilter =
      selectedCountry === "All" || selectedCountry === "" || country === selectedCountry;
    return magFilter && countryFilter;
  });

  if (loading) {
    return <div className="loading-screen">🌎 Loading earthquake data...</div>;
  }

  return (
    <div className="earthquake-container">
      <div className="side-panel">
        <FilterPanel
          countries={countries}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
        />
      </div>

      <div className="map-wrapper">
        <MapContainer
          center={[20, 0]}
          zoom={2}
          scrollWheelZoom={true}
          className="map-container"
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a> | Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />
          {filteredEarthquakes.map((eq) => {
            const [lon, lat, depth] = eq.geometry.coordinates;
            const { mag, place, time } = eq.properties;
            return (
              <CircleMarker
                key={eq.id}
                center={[lat, lon]}
                radius={Math.max(2, mag * 2)}
                color={getColor(mag)}
                fillOpacity={0.6}
              >
                <Popup>
                  <b>📍 Location:</b> {place || "Unknown"} <br />
                  <b>🌋 Magnitude:</b> {mag} <br />
                  <b>📅 Time:</b> {new Date(time).toLocaleString()} <br />
                  <b>🌎 Depth:</b> {depth} km
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
        <Legend />
      </div>
    </div>
  );
}

export default MapView;
