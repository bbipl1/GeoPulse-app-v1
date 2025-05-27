import { X } from "lucide-react";
import React, { useState } from "react";
import useGetData from "../../map/GetData";
import { type } from "@testing-library/user-event/dist/type";
import apiService from "../../api/services/apiService";
import FullScreenLoader from "../../components/FullScreenLoader";

const FeatureCollectionsManagement = ({ setManFeatureColl }) => {
  const [geometry, setGeometry] = useState(null);
  const [id, setId] = useState(null);
  const [coords, setCoords] = useState(null);
  const [name, setName] = useState(null);
  const [category, setCategory] = useState(null);
  const [descriptions, setDiscriptions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jsonFile,setJsonFile]=useState(null);

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

  const hanldeUpload = () => {
    setLoading(true);
    console.log(jsonFile)
    if(!jsonFile){
      return alert("Kindly select the file.");
    }
    if(jsonFile.type!=='application/json'){
      return alert("Choosen file type is not valid.");
    }
    const suburl =
      "/api/v1/admin/feature_collections_data/add_feature_collection_file_data";
      const filePayload=new FormData();
      filePayload.append("jsonFile",jsonFile);
      apiService.postWithFile(suburl,filePayload)
      .then((res) => {
        console.log(res);
        alert(res?.msg);
      })
      .catch((err) => {
        console.log(err);
        alert(err?.response?.data?.err);
      })
      .finally((final) => {
        setLoading(false);
      });
      
  };

  const handleSubmit = () => {
    if (!id) {
      return alert("id is required.");
    }
    if (!geometry) {
      return alert("Geometry is required.");
    }
    if (!coords) {
      return alert("Coordinates are required.");
    }
    setLoading(true);
    const suburl =
      "/api/v1/admin/feature_collections_data/add_feature_collection_data";
    const payload = {
      features: [{
        type: "Feature",
        geometry: { type: geometry, coordinates: coords },
        properties: {
          id: id,
          name: name,
          featureType: geometry,
          description: descriptions,
          category: category,
          country: selectedCountry,
          state: selectedState,
          district: selectedDistrict,
          subDistrict: selectedSubDistrict,
          gp: selectedGP,
          village: selectedVillages_towns,
        },
      }],
    };

    apiService
      .post(suburl, payload)
      .then((res) => {
        console.log(res);
        alert(res?.msg);
      })
      .catch((err) => {
        console.log(err);
        alert(err?.response?.data?.err);
      })
      .finally((final) => {
        setLoading(false);
      });
  };

  return (
    <div className="max-w-full w-full min-h-full h-full absolute z-50 top-16 left-0 overflow-y-auto bg-blue-600 text-white">

      {loading && <><FullScreenLoader/></>}
      <X
        size={36}
        className="cursor-pointer flex justify-self-end text-red-600"
        onClick={() => {
          setManFeatureColl(false);
        }}
      />

      <div>
        <div className="grid grid-cols-6 gap-4 mx-4">
          <div>
            <label htmlFor="country">Country</label>
            <select
              onChange={(e) => {
                setSelectedCountry(e.target.value);
              }}
              className="text-black w-full rounded-md p-1 "
              name="country"
              id="country"
            >
              <option value="">Select</option>
              {countries && countries.map((c) => <option>{c}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="state">State</label>
            <select
              className="text-black w-full rounded-md p-1 "
              name="state"
              id="state"
              onChange={(e) => {
                setSelectedState(e.target.value);
              }}
            >
              <option value="">Select</option>
              {states && states.map((c) => <option>{c}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="district">District</label>
            <select
              className="text-black w-full rounded-md p-1 "
              name="district"
              id="district"
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
              }}
            >
              <option value="">Select</option>
              {districts && districts.map((c) => <option>{c}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="sub_district">Sub district</label>
            <select
              className="text-black w-full rounded-md p-1 "
              name="sub_district"
              id="sub_district"
              onChange={(e) => {
                setSelectedSubDistrict(e.target.value);
              }}
            >
              <option value="">Select</option>
              {subDistricts && subDistricts.map((c) => <option>{c}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="gp">Gram panchayat</label>
            <select
              className="text-black w-full rounded-md p-1 "
              name="gp"
              id="gp"
              onChange={(e) => {
                setSelectedGP(e.target.value);
              }}
            >
              <option value="">Select</option>
              {gp && gp.map((c) => <option>{c}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="vt">Village/town</label>
            <select
              className="text-black w-full rounded-md p-1 "
              name="vt"
              id="vt"
              onChange={(e) => {
                setSelectedVillages_towns(e.target.value);
              }}
            >
              <option value="">Select</option>
              {villages_towns &&
                villages_towns.map((c) => <option>{c}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="id">Id*</label>
            <input
              className="text-black w-full rounded-md p-1 "
              name="id"
              value={id}
              id="id"
              type="text"
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <input
              className="text-black w-full rounded-md p-1 "
              name="name"
              value={name}
              id="name"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="descriptions">Descriptions</label>
            <input
              className="text-black w-full rounded-md p-1 "
              name="descriptions"
              value={descriptions}
              id="descriptions"
              type="text"
              onChange={(e) => {
                setDiscriptions(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <input
              className="text-black w-full rounded-md p-1 "
              name="category"
              value={category}
              id="category"
              type="text"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="geometry">Geometry*</label>
            <select
              className="text-black w-full rounded-md p-1 "
              name="geometry"
              id="geometry"
              onChange={(e) => {
                setGeometry(e.target.value);
              }}
            >
              <option value="">Select</option>
              <option value={"Point"}>Point</option>
              <option value={"LineString"}>LineString</option>
              <option value={"Polygon"}>Polygon</option>
            </select>
          </div>
        </div>

        <div className="flex justify-self-center flex-col">
          <div>
            <label htmlFor="coords">Coordinates(JSON)*</label>
          </div>
          <div>
            <textarea
              rows={6}
              cols={50}
              placeholder={
                geometry === "Point"
                  ? "[80.9462, 26.8467]"
                  : geometry === "LineString"
                  ? "[[80.9462, 26.8467], [81.0, 26.9]]"
                  : "[[[80.9, 26.8], [81.0, 26.8], [81.0, 26.9], [80.9, 26.9], [80.9, 26.8]]]"
              }
              value={coords}
              className="text-black"
              onChange={(e) => setCoords(e.target.value)}
            />
          </div>
          <div>
            <p className="font-bold text-white">Note: Provided coordinate system is- [longitude,latitude]</p>
          </div>
        </div>

        <div className="w-full flex justify-center mt-8">
          <button
            onClick={handleSubmit}
            className="bg-green-500 rounded-md p-2 w-24 text-white text-center"
          >
            Submit
          </button>
        </div>

        <div className="flex justify-center items-center flex-col mt-4">
          <div>
            <div>
              <label htmlFor="file">Select file ( JSON file only )</label>
            </div>
            <div>
              <input 
              type="file"
               id="file"
                name="file"
                // value={jsonFile}
                onChange={(e)=>{setJsonFile(e.target.files[0])}}
                
                />
            </div>
          </div>
          <div className="w-full flex justify-center mt-8">
            <button
              onClick={hanldeUpload}
              className="bg-green-500 rounded-md p-2 w-24 text-white text-center"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCollectionsManagement;
