import React, { createContext, useContext, useState } from "react";
const AdministrativeContext = createContext();
const useAdministrativeContext = () => {
  return useContext(AdministrativeContext);
};

const AdministrativeFilterContextProvider = ({ children }) => {
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [district, setDistrict] = useState(null);
  const [sub_district, setSubDistrict] = useState(null);
  const [gp, setGp] = useState(null);
  const [village_town, setVillage_town] = useState(null);
  const [category,setCategory]=useState(null);
  const [geometry_type,setGeometry_type]=useState(null);

  return (
    <AdministrativeContext.Provider
      value={{
        country,
        setCountry,
        state,
        setState,
        district,
        setDistrict,
        sub_district,
        setSubDistrict,
        gp,
        setGp,
        village_town,
        setVillage_town,
        category,
        setCategory,
        geometry_type,
        setGeometry_type,
      }}
    >
      {children}
    </AdministrativeContext.Provider>
  );
};
export { useAdministrativeContext };
export default AdministrativeFilterContextProvider;
