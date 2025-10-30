import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';


const URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';


export default function useEarthquakes() {
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [lastUpdated, setLastUpdated] = useState(null);


const fetchData = useCallback(async () => {
setLoading(true);
setError(null);
try {
const res = await axios.get(URL);
const features = res.data.features || [];
// normalize features
const normalized = features.map(f => ({
id: f.id,
magnitude: f.properties.mag,
place: f.properties.place,
time: f.properties.time,
url: f.properties.url,
coords: [f.geometry.coordinates[1], f.geometry.coordinates[0]], // [lat, lng]
depth: f.geometry.coordinates[2],
raw: f
}));
setData(normalized);
setLastUpdated(new Date());
} catch (err) {
setError(err);
} finally {
setLoading(false);
}
}, []);


useEffect(() => {
fetchData();
// optional: setInterval to auto refresh
// const id = setInterval(fetchData, 5 * 60 * 1000);
// return () => clearInterval(id);
}, [fetchData]);


return { data, loading, error, lastUpdated, refresh: fetchData };
}