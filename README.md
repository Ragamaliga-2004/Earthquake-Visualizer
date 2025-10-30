🌍 Earthquake Visualizer

A real-time Earthquake Visualization Web App built using React + Vite + Leaflet Maps.
This application fetches live earthquake data from the USGS Earthquake API and displays each earthquake on an interactive map with markers based on magnitude.

📡 API Used

USGS Earthquake API
Provides real-time global earthquake data:

https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson

The app retrieves data every time it loads and plots all recent earthquakes from the past 24 hours.

✨ Features

✅ Fetches real-time earthquake data
✅ Displays earthquake locations on a world map
✅ Color-coded markers based on magnitude
✅ Interactive popups with details (Place, Magnitude, Time)
✅ Built with React, Vite, Leaflet, and Axios
✅ Responsive and clean UI
✅ Simple and fast performance

🛠️ Tech Stack
Technology Purpose
React Front-end UI
Vite Fast build tool
Axios API requests
Leaflet Map visualization
React-Leaflet React binding for Leaflet
Sass / Styled-Components Styling

📁 Project Structure
📦 EarthquakeVisualizer

┣ 📂 src

┃ ┣ 📂 components

┃ ┃ ┗ 📜 Map.jsx

┃ ┣ 📂 styles

┃ ┣ 📜 App.jsx

┃ ┗ 📜 main.jsx

┣ 📜 package.json

┣ 📜 README.md

┗ 📜 vite.config.js

🚀 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/your-username/earthquake-visualizer.git
cd earthquake-visualizer

2️⃣ Install Dependencies
npm install

3️⃣ Start Development Server
npm run dev

4️⃣ Build for Production
npm run build

🧠 How It Works

Fetches GeoJSON earthquake data from USGS API

Extracts latitude, longitude, magnitude, and info

Plots markers on Leaflet map

Marker color & size change by magnitude

Magnitude Color
< 2.5 Green
2.5 - 5 Orange

> 5 Red

📜 License

This project is open-source and free to use.

👨‍💻 Author
Ragamaliga S
