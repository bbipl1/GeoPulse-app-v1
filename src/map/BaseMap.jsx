import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import Points from "./features/Points";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// ✅ Circle Component
const CircleLayer = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    L.circle([25.508, 80], {
      color: "red",
      fillColor: "blue",
      fillOpacity: 0.8,
      radius: 50000,
    }).addTo(map);
  }, [map]);

  return null;
};

// ✅ GeoJSON Lines Component (Handles Multiple Lines)
const GeoJsonLines = ({ lines }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || lines.length === 0) return;

    const geoJsonData = {
      type: "FeatureCollection",
      features: lines.map((line) => ({
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: line, // ✅ Each line as a separate feature
        },
      })),
    };

    const myStyle = {
      color: "red",
      weight: 5,
      opacity: 0.8,
    };

    L.geoJSON(geoJsonData, {
      style: myStyle,
    }).addTo(map);
  }, [map, lines]);

  return null;
};

const convertToLeafletLine = (latLongArray) => {
  if (!Array.isArray(latLongArray) || latLongArray.length === 0) {
    console.error(
      "Invalid array. Please provide a valid array of lat-long objects."
    );
    return [];
  }

  // Convert each lat-long object to [lat, lng] format
  const leafletCoords = latLongArray.map((coord) => {
    if (!coord.latitude || !coord.longitude) {
      console.error("Invalid coordinates:", coord);
      return null;
    }
    return [coord.latitude, coord.longitude]; // ✅ Correct format
  });

  return leafletCoords.filter(Boolean); // Remove nulls
};

const BaseMap = () => {
  const [lines, setLines] = useState([]);

  const [points, setPoints] = useState(null);

  useEffect(() => {
    if (points && points.length > 0) {
      setLines([
        [
          [26.8467, 80.9462],
          [26.2585, 82.066],
          [26.0739, 83.1859],
        ],
        // points,
      ]);
    }
  }, []);

  return (
    <div id="map" className="w-screen h-[calc(100vh-100px)]">
      <MapContainer
        center={[26, 81]}
        zoom={5}
        minZoom={1} // Minimum zoom allowed
        maxZoom={18}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Markers */}
        <Marker position={[26.8467, 80.9462]}>
          <Popup>Lucknow</Popup>
        </Marker>
        <Points></Points>
      </MapContainer>
    </div>
  );
};

export default BaseMap;
