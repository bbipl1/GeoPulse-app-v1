import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import Points from "./features/Points";
import { MapContext, useLeafletMap } from "../contextProvider/MapContext";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const BaseMap = () => {
  const {setMap}=useLeafletMap();
  const mapRef=useRef();

  useEffect(()=>{
    if(!mapRef?.current){
      return null;
    }
    setMap(mapRef.current)
  },[mapRef])

  return (
      <div className="w-screen h-[calc(100vh-100px)]">
        <MapContainer
          center={[26, 81]}
          zoom={5}
          minZoom={1} // Minimum zoom allowed
          maxZoom={18}
          whenReady={(mapIns) => {
            mapRef.current = mapIns.target;
            // console.log("Map instance:", mapRef);
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Markers */}
          {/* <Marker position={[26.8467, 80.9462]}>
            <Popup>Lucknow</Popup>
          </Marker> */}
          {/* <Points></Points> */}
        </MapContainer>
      </div>
    
  );
};

export default BaseMap;
