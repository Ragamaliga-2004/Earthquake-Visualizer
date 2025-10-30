import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../styles/Map.scss";
import FilterPanel from "./FilterPanel";

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapComponent = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [filteredQuakes, setFilteredQuakes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedMagnitude, setSelectedMagnitude] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchEarthquakeData = async () => {
    try {
      const response = await axios.get(
        "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
      );
      const data = response.data.features;
      setEarthquakes(data);
      extractCountries(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching earthquake data:", error);
    }
  };

  // Extract countries from 'place' property (e.g., "10 km from Japan")
  const extractCountries = (data) => {
    const countryList = data
      .map((quake) => {
        const place = quake.properties.place;
        if (!place) return null;
        const parts = place.split(",");
        return parts[parts.length - 1].trim(); // Take last part (usually country)
      })
      .filter((country) => country && country.length > 2);
    setCountries(["All", ...Array.from(new Set(countryList))]);
  };

  useEffect(() => {
    fetchEarthquakeData();
  }, []);

  useEffect(() => {
    let filtered = earthquakes;

    if (selectedCountry !== "All") {
      filtered = filtered.filter((quake) =>
        quake.properties.place?.includes(selectedCountry)
      );
    }

    if (selectedMagnitude !== "All") {
      const minMag = parseFloat(selectedMagnitude);
      filtered = filtered.filter((quake) => quake.properties.mag >= minMag);
    }

    setFilteredQuakes(filtered);
  }, [selectedCountry, selectedMagnitude, earthquakes]);

  if (loading) return <p>Loading earthquake data...</p>;

  return (
    <div id="map" style={{ height: "100%", width: "100%" }}>
      <FilterPanel
        countries={countries}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        selectedMagnitude={selectedMagnitude}
        setSelectedMagnitude={setSelectedMagnitude}
      />

      <MapContainer center={[20, 0]} zoom={2} className="map-view">
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a> | Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />

        {filteredQuakes.map((quake) => {
          const { mag, place, time } = quake.properties;
          const [lon, lat] = quake.geometry.coordinates;
          return (
            <Marker key={quake.id} position={[lat, lon]}>
              <Popup>
                <strong>Location:</strong> {place} <br />
                <strong>Magnitude:</strong> {mag} <br />
                <strong>Time:</strong> {new Date(time).toLocaleString()}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
