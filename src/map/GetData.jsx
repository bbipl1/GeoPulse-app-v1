import { useEffect, useState } from 'react';
import apiService from '../api/services/apiService';

const useGetData = () => {
  const [refresh, setRefresh] = useState(0);
  const [countries, setCountries] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [states, setStates] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [districts, setDistricts] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [subDistricts, setSubDistricts] = useState(null);
  const [selectedSubDistrict, setSelectedSubDistrict] = useState(null);
  const [gp, setGP] = useState(null);
  const [selectedGP, setSelectedGP] = useState(null);
  const [villages_towns, setVillages_Towns] = useState(null);
  const [selectedVillages_towns, setSelectedVillages_towns] = useState(null);
  const [allData, setAllData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    const suburl = `/api/v1/admin/data/manage_data/get_all_data_details`;
    apiService
      .get(suburl)
      .then((res) => {
        setAllData(res?.data);
        // console.log(res?.data)
        setFilteredData(res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [refresh]);

  useEffect(() => {
    const countriesData = allData?.map((c) => c.name);
    setCountries(Array.from(new Set(countriesData)));

    const filteredCountryData = allData?.filter(
      (d) => d?.name === selectedCountry
    );
    if (filteredCountryData?.length > 0) setFilteredData(filteredCountryData);

    const statesData = filteredCountryData?.map((s) => s?.state?.name);
    setStates(Array.from(new Set(statesData))?.sort());

    const filteredStateData = filteredCountryData?.filter(
      (d) => d.state.name === selectedState
    );
    if (filteredStateData?.length > 0) setFilteredData(filteredStateData);

    const districtData = filteredStateData?.map((d) => d?.district?.name);
    setDistricts(Array.from(new Set(districtData))?.sort());

    const filteredDistrictData = filteredStateData?.filter(
      (d) =>
        d?.district?.name?.toLowerCase() ===
        selectedDistrict?.toLowerCase()
    );
    if (filteredDistrictData?.length > 0) setFilteredData(filteredDistrictData);

    const subDistrictData = filteredDistrictData?.map(
      (d) => d?.sub_district?.name
    );
    setSubDistricts(Array.from(new Set(subDistrictData))?.sort());

    const filteredSubDistrictData = filteredDistrictData?.filter(
      (d) => d?.sub_district?.name === selectedSubDistrict
    );
    if (filteredSubDistrictData?.length > 0)
      setFilteredData(filteredSubDistrictData);

    const gpData = filteredSubDistrictData?.map((g) => g?.gp?.name);
    setGP(Array.from(new Set(gpData))?.sort());

    const filteredGPData = filteredSubDistrictData?.filter(
      (sd) => sd?.gp?.name === selectedGP
    );
    if (filteredGPData?.length > 0) setFilteredData(filteredGPData);

    const v_t_data = filteredGPData?.map((v) => v?.village_town?.name);
    setVillages_Towns(Array.from(new Set(v_t_data)));
  }, [
    allData,
    selectedCountry,
    selectedState,
    selectedDistrict,
    selectedSubDistrict,
    selectedGP,
  ]);

  return {
    refresh,
    setRefresh,
    countries,
    selectedCountry,
    setSelectedCountry,
    states,
    selectedState,
    setSelectedState,
    districts,
    selectedDistrict,
    setSelectedDistrict,
    subDistricts,
    selectedSubDistrict,
    setSelectedSubDistrict,
    gp,
    selectedGP,
    setSelectedGP,
    villages_towns,
    selectedVillages_towns,
    setSelectedVillages_towns,
    allData,
    filteredData,
  };
};

export default useGetData;
