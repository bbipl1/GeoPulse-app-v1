import React, { useEffect, useState } from "react";
import useGetData from "../GetData";
import { Filter, X } from "lucide-react";
import { useAdministrativeContext } from "../../contextProvider/AdministrativeFilterContextProvider";

const DataFilter = ({ setFilteredData }) => {
  const [filterToggle, setFilterToggle] = useState(false);
  const{
    setCountry,
    setState,
    setDistrict,
    setSubDistrict,
    setGp,
    setVillage_town,
   } = useAdministrativeContext();

  const {
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
    filteredData,
    gp,
    selectedGP,
    setSelectedGP,
    villages_towns,
    selectedVillages_towns,
    setSelectedVillages_towns,
  } = useGetData();

  // const { data } = useFilteredGeoData({
  //   country: selectedCountry,
  //   state: selectedState,
  //   district: selectedDistrict,
  //   sub_district: selectedDistrict,
  //   gp: selectedGP,
  //   village_town: selectedVillages_towns,
  // });

  useEffect(() => {
    if (selectedCountry) {
      setCountry(selectedCountry);
    }
    if (selectedState) {
      setState(selectedState);
    }
    if (selectedDistrict) {
      setDistrict(selectedDistrict);
    }
    if (selectedSubDistrict) {
      setSubDistrict(selectedSubDistrict);
    }
    if (selectedGP) {
      setGp(selectedGP);
    }
    if (selectedVillages_towns) {
      setVillage_town(selectedVillages_towns);
    }
  }, [
    selectedCountry,
    selectedState,
    selectedDistrict,
    selectedSubDistrict,
    selectedGP,
    selectedVillages_towns,
    setCountry,
    setState,
    setDistrict,
    setSubDistrict,
    setGp,
    setVillage_town,
  ]);

  return (
    <div>
      <div>
        {filterToggle ? (
          <>
            <div className="">
              <div className="border-2 bg-gray-600 opacity-70 p-4">
                <div className="relative">
                  <div className="text-xl  py-4 flex justify-center text-white">
                    Filter options
                  </div>
                  <div
                    onClick={() => {
                      setFilterToggle(false);
                    }}
                    className="absolute top-0 right-0"
                  >
                    <X size={32} className="cursor-pointer text-white" />
                  </div>
                </div>

                <div className="">
                  <div className="">
                    <div className="">
                      <label htmlFor="country" className="font-bold text-white">
                        Country
                      </label>
                    </div>
                    <div>
                      <select
                        name="country"
                        id="country"
                        className="w-full"
                        onChange={(e) => {
                          setSelectedCountry(e.target.value);
                        }}
                      >
                        <option value="">Select</option>
                        {countries &&
                          Array.isArray(countries) &&
                          countries.map((c) => <option>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="">
                    <div>
                      <label htmlFor="state" className="font-bold text-white">
                        State
                      </label>
                    </div>

                    <div>
                      <select
                        name="state"
                        id="state"
                        className="w-full"
                        onChange={(e) => {
                          setSelectedState(e.target.value);
                        }}
                      >
                        <option value="">Select</option>
                        {states &&
                          Array.isArray(states) &&
                          states.map((s) => <option>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="">
                    <div>
                      <label
                        htmlFor="district"
                        className="font-bold text-white"
                      >
                        District
                      </label>
                    </div>

                    <div>
                      <select
                        name="district"
                        id="district"
                        className="w-full"
                        onChange={(e) => {
                          setSelectedDistrict(e.target.value);
                        }}
                      >
                        <option value="">Select</option>
                        {districts &&
                          Array.isArray(districts) &&
                          districts.map((d) => <option>{d}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="">
                    <div>
                      <label htmlFor="block" className="font-bold text-white">
                        Block
                      </label>
                    </div>
                    <div>
                      <select
                        name="block"
                        id="block"
                        className="w-full"
                        onChange={(e) => {
                          setSelectedSubDistrict(e.target.value);
                        }}
                      >
                        <option value="">Select</option>
                        {subDistricts &&
                          Array.isArray(subDistricts) &&
                          subDistricts.map((sd) => <option>{sd}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                {/* <div>
                  <button
                    onClick={() => {
                      alert("Loading please wait.");
                      setFilterToggle(!filterToggle);
                    }}
                    className="w-full text-center rounded-md bg-green-500 text-white mt-4"
                  >
                    Submit
                  </button>
                </div> */}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="">
              <div
                onClick={() => {
                  setFilterToggle(!filterToggle);
                }}
                className=" bg-white rounded-md p-1"
              >
                <Filter />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DataFilter;
