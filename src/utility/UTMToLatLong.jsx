import React from 'react';
import { toLatLon } from 'utm';

// Function to convert UTM to Lat/Lon
const utmToLatLong = (utmCoords) => {
    const { easting, northing, zoneNumber, zoneLetter } = utmCoords;

    // Check if all required fields are present
    if (easting && northing && zoneNumber && zoneLetter) {
        // Convert UTM to Lat/Lon
        const result = toLatLon(
            parseFloat(easting),
            parseFloat(northing),
            parseInt(zoneNumber),
            zoneLetter
        );
        return result;
    } else {
        console.error('Missing required UTM fields.');
        return null;
    }
};

const UTMToLatLong = () => {
    return <div>Convert UTM to Lat/Long</div>;
};

export { utmToLatLong };
export default UTMToLatLong;
