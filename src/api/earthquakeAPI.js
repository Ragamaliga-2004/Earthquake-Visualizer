import axios from "axios";

const API_URL =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

export const fetchEarthquakeData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.features; // Return only the features array
  } catch (error) {
    console.error("Error fetching earthquake data:", error);
    return [];
  }
};
