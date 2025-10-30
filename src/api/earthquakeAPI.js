import axios from "axios";

const API_URL =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

export const fetchEarthquakeData = async () => {
  try {
    const response = await axios.get(API_URL, {
      timeout: 10000, // ⏱️ Set 10s timeout to avoid hanging requests
    });

    // ✅ Check for valid response structure
    if (!response.data || !response.data.features) {
      console.error("Invalid response format:", response.data);
      return [];
    }

    return response.data.features;
  } catch (error) {
    // ⚠️ Axios Error Handling
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // 🧾 Server responded with a non-2xx status code
        console.error("🌐 Server Error:", {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
        });
      } else if (error.request) {
        // 🚫 No response received
        console.error("🚫 No Response from Server:", error.request);
      } else {
        // ❗ Error during request setup
        console.error("❗ Request Setup Error:", error.message);
      }
    } else {
      // 🧠 Handle Non-Axios errors (like JSON parsing, runtime errors)
      console.error("💥 Unexpected Error:", error);
    }

    // 👇 Always return empty array to keep app stable
    return [];
  }
};
