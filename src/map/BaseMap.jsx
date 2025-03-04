import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

const BaseMap = () => {
  return (
    <div className="w-screen h-[calc(100vh-100px)]">
      <MapContainer
        center={[20.5, 78.5]}
        zoom={5}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  );
};

export default BaseMap;
