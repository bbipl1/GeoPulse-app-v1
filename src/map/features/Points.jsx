import React, { useEffect, useState } from "react";
import apiService from "../../api/services/apiService";
import { utmToLatLong } from "../../utility/UTMToLatLong";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

// ✅ Fetch points and convert UTM to Lat-Long
const getPoints = async () => {
  const subUrl = "/api/v1/admin/map/point/get-all-points";
  let points = null;
  try {
    points = await apiService.get(subUrl);
  } catch (error) {
    console.log(error);
    return;
  }
  const urn = points.data[0].crs.properties.name;
  const zn = urn.substring(urn.length - 2, urn.length);

  const cordArray = points.data[0].features;
  const latLong = cordArray.map((cord) => {
    const utmCoords = {
      easting: cord.geometry.coordinates[0],
      northing: cord.geometry.coordinates[1],
      zoneNumber: zn,
      zoneLetter: "N",
    };
    const res = utmToLatLong(utmCoords);
    return {
      ...cord,
      geometry: {
        ...cord.geometry,
        coordinates: [res.latitude, res.longitude],
      },
    };
  });

  return latLong;
};

const Points = () => {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const fetchPoints = async () => {
      const pointsData = await getPoints();
      setPoints(pointsData);
    };

    fetchPoints();
  }, []);

  return (
    <MarkerClusterGroup
      chunkedLoading={true}
      // maxClusterRadius={50}
      // disableClusteringAtZoom={16} // ← stops clustering after zoom level 16
      // showCoverageOnHover={false}
    >
      {points &&
        Array.isArray(points) &&
        points.length > 0 &&
        points.map((cord, index) => {
          const popupContent = cord.properties.name
            ? cord.properties.name
            : cord.properties.TEXTSTRING;

          return (
            <Marker
              key={index}
              position={cord.geometry.coordinates}
              icon={L.icon({
                iconUrl: require("leaflet/dist/images/marker-icon.png"),
                shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })}
            >
              <Popup>{popupContent}</Popup>
            </Marker>
          );
        })}
    </MarkerClusterGroup>
  );
};

export default Points;
