// MapContext.js
import { createContext, useContext } from "react";

const MapContext = createContext(null);  // Provide a default value (optional)

const useLeafletMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useLeafletMap must be used within a MapContext.Provider");
  }
  return context;
};

export { MapContext, useLeafletMap };
