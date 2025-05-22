import React, { useEffect, useState } from "react";
import apiService from "../api/services/apiService";
import axios, { all } from "axios";
import { CrossIcon, Edit2Icon, Goal, Locate, LocateFixed, LocateIcon, MapIcon, MapPin, PinIcon, PlusIcon, PointerIcon, SaveIcon, Trash2 } from "lucide-react";

const ManageData = () => {
  const [refresh, setRefresh] = useState(0);
  const [countries, setCountries] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [states, setStates] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [districts, setDistricts] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [subDistricts, setSubDistricts] = useState(null);
  const [selectedSubDistrict, setSelectedSubDistrict] = useState(null);
  const [gp,setGP]=useState(null);
  const [selectedGP,setSelectedGP]=useState(null);
  const [villages_towns, setVillages_Towns] = useState(null);
  const [selectedVillages_towns,setSelectedVillages_towns]=useState(null);

  const [allData, setAllData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  const [newCountry, setNewCountry] = useState(null);
  const [loading, setLoading] = useState(false);

  //editable use-state
  const [editableId, setEditableId] = useState(null);
  const [rowIndex, setRowIndex] = useState(null);

  const [isStateEditable, setIsStateEditable] = useState(false);
  const [stateEditableText, setStateEditableText] = useState();

  const [isDistrictEditable, setIsDistrictEditable] = useState(false);
  const [districtEditableText, setDistrictEditableText] = useState(null);

  const [isSubDistrictEditable, setIsSubDistrictEditable] = useState(false);
  const [subDistrictEditableText, setSubDistrictEditableText] = useState(null);

  const [isGPEditable, setIsGPEditable] = useState(false);
  const [gpEditableText, setGPEditableText] = useState(null);

  const [isVillageTownEditable, setIsVillageTownEditable] = useState(false);
  const [villageTownEditableText, setVillageTownEditableTExt] = useState(null);

  useEffect(() => {
    let suburl = `/api/v1/admin/data/manage_data/get_all_data_details`;
    apiService
      .get(suburl)
      .then((res) => {
        setAllData(res?.data);
        setFilteredData(res?.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  useEffect(() => {
    const countriesData = allData?.map((c) => c.name);
    setCountries(Array.from(new Set(countriesData)));
    const filteredCountryData = allData?.filter(
      (d) => d?.name === selectedCountry
    );

    if(filteredCountryData?.length>0){

      setFilteredData(filteredCountryData);
    }
    // console.log(filteredCountryData);
    const statesData = filteredCountryData?.map((s) => s?.state?.name);
    setStates(Array.from(new Set(statesData)).sort());
    // console.log(statesData)

    const filteredStateData = filteredCountryData?.filter(
      (d) => d.state.name === selectedState
    );
    if(filteredStateData?.length>0){
      setFilteredData(filteredStateData);
    }
    // console.log(filteredStateData);

    const districtData = filteredStateData?.map((d) => d?.district?.name);
    setDistricts(Array.from(new Set(districtData))?.sort());
    // console.log(Array.from(new Set(districtData)));
    const filteredDistrictData = filteredStateData?.filter(
      (d) => d?.district?.name?.toLowerCase() === selectedDistrict?.toLowerCase()
    );

    if(filteredDistrictData?.length>0){
      setFilteredData(filteredDistrictData);
    }
    // console.log(filteredDistrictData);
    const subDistrictData = filteredDistrictData?.map((d) => d?.sub_district?.name);
    setSubDistricts(Array.from(new Set(subDistrictData))?.sort());
    // console.log(subDistrictData);
    const filteredSubDistrictData=filteredDistrictData?.filter((d)=>(d?.sub_district?.name===selectedSubDistrict));
    if(filteredSubDistrictData?.length>0){
      setFilteredData(filteredSubDistrictData)
    }
    const gpData=filteredSubDistrictData?.map((g)=>(g?.gp?.name));
    setGP(Array.from(new Set(gpData))?.sort())
    // console.log(gpData)
    const filteredGPData=filteredSubDistrictData?.filter((sd)=>(sd?.gp?.name===selectedGP));
    if(filteredGPData?.length>0){
      setFilteredData(filteredGPData)
    }
    const v_t_data=filteredGPData?.map((v)=>(v?.village_town?.name));
    setVillages_Towns(Array.from(new Set(v_t_data)))
    // console.log(v_t_data)
  }, [allData, selectedCountry, selectedDistrict, selectedGP, selectedState, selectedSubDistrict]);

  const handleNewCountry = () => {
    if (!newCountry?.toString()?.trim()) {
      return alert("New country is empty.");
    }
    setLoading(true);
    const suburl = `/api/v1/admin/data/manage_data/add_country_details`;
    const payload = {
      country_name: newCountry?.toString()?.trim(),
    };
    apiService
      .post(suburl, payload)
      .then((res) => {
        setRefresh(refresh + 1);
        alert(res.msg);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.err);
      })
      .finally((final) => {
        setLoading(false);
      });
  };

  const handleCountryUpdate = (country_name, country_id) => {
    if (!newCountry?.toString()?.trim()) {
      return alert("New country is empty.");
    }
    if (!country_name || !country_id) {
      return alert("All fields are required.");
    }
    setLoading(true);
    const suburl = `/api/v1/admin/data/manage_data/update_country_details`;
    const payload = {
      country_name: country_name?.toString()?.trim(),
      country_id: country_id,
      new_country_name: newCountry?.toString()?.trim(),
    };
    apiService
      .put(suburl, payload)
      .then((res) => {
        setRefresh(refresh + 1);
        alert(res.msg);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.err);
      })
      .finally((final) => {
        setLoading(false);
      });
  };

  //   hanlde state user-interactions
  const handleStateUpdate = (state_name, state_id) => {
    setIsStateEditable(false);
    if (!stateEditableText?.toString()?.trim()) {
      return alert("New state name is empty.");
    }
    if (!state_name || !state_id) {
      return alert("All fields are required.");
    }
    setLoading(true);
    const suburl = `/api/v1/admin/data/manage_data/update_state_details`;
    const payload = {
      state_name: state_name?.toString()?.trim(),
      state_id: state_id,
      new_state_name: stateEditableText?.toString()?.trim(),
    };
    apiService
      .put(suburl, payload)
      .then((res) => {
        setRefresh(refresh + 1);
        alert(res.msg);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.err);
      })
      .finally((final) => {
        setLoading(false);
      });
  };
  const handleNewState = (id) => {
    setIsStateEditable(false);

    if (!stateEditableText) {
      return alert("New state name is required.");
    }

    if (!id) {
      return alert("All fields are required.");
    }

    setLoading(true);

    const suburl = "/api/v1/admin/data/manage_data/add_state_details";
    const payload = {
      state_name: stateEditableText,
      country_id: id,
    };

    console.log("payload is", payload);

    apiService
      .post(suburl, payload)
      .then((res) => {
        // console.log(res);
        setRefresh(refresh + 1);
        alert(res?.data?.msg || "State added successfully.");
      })
      .catch((err) => {
        alert(err?.response?.data?.err || "Something went wrong.");
        console.error("Error while adding:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //   hanlde district user-interactions
  const handleDistrictUpdate = (dis_name,dis_id) => {
    setIsDistrictEditable(false);
    if (!districtEditableText?.toString()?.trim()) {
      return alert("New district name is empty.");
    }
    if (!dis_id) {
      return alert("All fields are required.");
    }
    setLoading(true);
    const suburl = `/api/v1/admin/data/manage_data/update_district_details`;
    const payload = {
      district_name: dis_name?.toString()?.trim(),
      district_id: dis_id,
      new_district_name: districtEditableText?.toString()?.trim(),
    };
    apiService
      .put(suburl, payload)
      .then((res) => {
        setRefresh(refresh + 1);
        alert(res.msg);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.err);
      })
      .finally((final) => {
        setLoading(false);
      });
  };

  const handleNewDistrict = (id) => {
    setIsDistrictEditable(false);

    if (!districtEditableText) {
      return alert("New district name is required.");
    }

    if (!id) {
      return alert("All fields are required.");
    }

    setLoading(true);

    const suburl = "/api/v1/admin/data/manage_data/add_district_details";
    const payload = {
      district_name: districtEditableText,
      state_id: id,
    };

    console.log("payload is", payload);

    apiService
      .post(suburl, payload)
      .then((res) => {
        // console.log(res);
        setRefresh(refresh + 1);
        alert(res?.data?.msg || "District added successfully.");
      })
      .catch((err) => {
        alert(err?.response?.data?.err || "Something went wrong.");
        console.error("Error while adding:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //   hanlde sub-district user-interactions
  const handleSubDistrictUpdate = (sub_dis_name,sub_dis_id) => {
    setIsSubDistrictEditable(false);
    if (!subDistrictEditableText?.toString()?.trim()) {
      return alert("New sub-district name is empty.");
    }
    if (!sub_dis_id) {
      return alert("All fields are required.");
    }
    setLoading(true);
    const suburl = `/api/v1/admin/data/manage_data/update_sub_district_details`;
    const payload = {
      sub_district_name: sub_dis_name?.toString()?.trim(),
      sub_district_id: sub_dis_id,
      new_sub_district_name: subDistrictEditableText?.toString()?.trim(),
    };
    apiService
      .put(suburl, payload)
      .then((res) => {
        setRefresh(refresh + 1);
        alert(res.msg);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.err);
      })
      .finally((final) => {
        setLoading(false);
      });
  };

  const handleNewSubDistrict = (id) => {
    setIsSubDistrictEditable(false);

    if (!subDistrictEditableText) {
      return alert("New sub-district name is required.");
    }

    if (!id) {
      return alert("Add district first.");
    }

    setLoading(true);

    const suburl = "/api/v1/admin/data/manage_data/add_sub_district_details";
    const payload = {
      sub_district_name: subDistrictEditableText,
      district_id: id,
    };

    console.log("payload is", payload);

    apiService
      .post(suburl, payload)
      .then((res) => {
        // console.log(res);
        setRefresh(refresh + 1);
        alert(res?.data?.msg || "Sub district added successfully.");
      })
      .catch((err) => {
        alert(err?.response?.data?.err || "Something went wrong.");
        console.error("Error while adding:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //   hanlde gp user-interactions
  const handleGPUpdate = (gp_name,gp_id) => {
    setIsGPEditable(false);
    if (!gpEditableText?.toString()?.trim()) {
      return alert("New gram panchayat name is empty.");
    }
    if (!gp_id) {
      return alert("All fields are required.");
    }
    setLoading(true);
    const suburl = `/api/v1/admin/data/manage_data/update_gp_details`;
    const payload = {
      gp_name: gp_name?.toString()?.trim(),
      gp_id: gp_id,
      new_gp_name: gpEditableText?.toString()?.trim(),
    };
    apiService
      .put(suburl, payload)
      .then((res) => {
        setRefresh(refresh + 1);
        alert(res.msg);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.err);
      })
      .finally((final) => {
        setLoading(false);
      });
  };

  const handleNewGP = (id) => {
    setIsGPEditable(false);

    if (!gpEditableText) {
      return alert("New gram panchayat name is required.");
    }

    if (!id) {
      return alert("Add sub-district first.");
    }

    setLoading(true);

    const suburl = "/api/v1/admin/data/manage_data/add_gp_details";
    const payload = {
      gp_name: gpEditableText,
      sub_district_id: id,
    };

    // console.log("payload is", payload);

    apiService
      .post(suburl, payload)
      .then((res) => {
        console.log(res);
        setRefresh(refresh + 1);
        alert(res?.msg || "gram panchayat added successfully.");
      })
      .catch((err) => {
        alert(err?.response?.data?.err || "Something went wrong.");
        console.error("Error while adding:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //   hanlde village-town user-interactions
  const handleVillageTownUpdate = () => {
    setIsVillageTownEditable(false);
  };

  const handleNewVillageTown = (id) => {
    setIsVillageTownEditable(false);

    if (!villageTownEditableText) {
      return alert("New village/town name is required.");
    }

    if (!id) {
      return alert("Add sub-district first.");
    }

    setLoading(true);

    const suburl = "/api/v1/admin/data/manage_data/add_village_town_details";
    const payload = {
      village_town_name: villageTownEditableText,
      gp_id: id,
    };

    // console.log("payload is", payload);

    apiService
      .post(suburl, payload)
      .then((res) => {
        console.log(res);
        setRefresh(refresh + 1);
        alert(res?.msg || "village/town added successfully.");
      })
      .catch((err) => {
        alert(err?.response?.data?.err || "Something went wrong.");
        console.error("Error while adding:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="ml-4">
        <div>
          <label className="w-full" htmlFor="new_country">
            New Country
          </label>
        </div>
        <div className="flex flex-row items-center cursor-pointer">
          <input
            type="text"
            name="new_country"
            id="new_country"
            value={newCountry}
            onChange={(e) => {
              setNewCountry(e.target.value?.toString()?.trim());
            }}
            className="p-2 border-2 border-blue-400 rounded-md"
          />
          <PlusIcon onClick={handleNewCountry} />
          {/* <button className="p-2 rounded-md border-4 border-red-500 ml-4 bg-black text-white" >Add new</button> */}
        </div>
      </div>

      <div className="w-full">
        <div className="w-full grid grid-cols-6 gap-4  p-2">
          <div>
            <label htmlFor="country">Country</label>
            <select
              type="text"
              name="country"
              id="country"
              onChange={(e) => {
                setSelectedCountry(e?.target?.value);
              }}
              className="w-full rounded-md border-2 border-red-500 p-2"
            >
              <option value="">Select</option>
              {countries?.map((c) => (
                <option>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="state">State</label>
            <select
              type="text"
              name="state"
              id="state"
              onChange={(e) => {
                setSelectedState(e?.target?.value);
              }}
              className="w-full rounded-md border-2 border-red-500 p-2"
            >
              <option value="">Select</option>
              {states?.map((s) => (
                <option>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="district">District</label>
            <select
              type="text"
              name="district"
              id="district"
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
              }}
              className="w-full     rounded-md border-2 border-red-500 p-2"
            >
              <option value="">Select</option>
              {districts?.map((d) => (
                <option>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="sub_district">Sub District</label>
            <select
              type="text"
              name="sub_district"
              id="sub_district"
              onChange={(e) => {
                setSelectedSubDistrict(e.target.value);
              }}
              className="w-full rounded-md border-2 border-red-500 p-2"
            >
              <option value="">Select</option>
              {subDistricts?.map((sd) => (
                <option>{sd}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="gram_panchayat">Gram Panchayat</label>
            <select
              type="text"
              name="gram_panchayat"
              id="gram_panchayat"
              className="w-full rounded-md border-2 border-red-500 p-2"
              onChange={(e)=>{setSelectedGP(e?.target?.value)}}
            >
              <option value="">Select</option>
              {gp && Array.isArray(gp) && gp.map((g)=>(<option>{g}</option>))}
            </select>
          </div>
          <div>
            <label htmlFor="village_town">Village/Town</label>
            <select
              type="text"
              name="village_town"
              id="village_town"
              className="w-full rounded-md border-2 border-red-500 p-2"
               onChange={(e)=>{setSelectedVillages_towns(e?.target?.value)}}
            >
              <option value="">Select</option>
              {villages_towns && Array.isArray(villages_towns) && villages_towns.map((v)=>(<option>{v}</option>))}
            </select>
          </div>
        </div>
      </div>

      <div>
        <table className="table-auto w-full border border-gray-600 mt-8">
          <thead>
            <tr className="bg-gray-500 text-center text-white">
              <th className="border border-gray-500 px-4 py-2">S/N</th>
              <th className="border border-gray-500 px-4 py-2">Country</th>
              <th className="border border-gray-500 px-4 py-2">State</th>
              <th className="border border-gray-500 px-4 py-2">District</th>
              <th className="border  border-gray-500 px-4 py-2">
                Sub-District
              </th>
              <th className="border  border-gray-500 px-4 py-2">
                Gram panchayat
              </th>
              <th className="border border-gray-500 px-4 py-2">Village/Town</th>
              <th className="border border-gray-500 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.length > 0 ? (
              filteredData?.map((data, ind) => {
                return (
                  <tr
                    className={`${ind % 2 === 1 ? "bg-white" : "bg-gray-200"}`}
                  >
                    <td className="text-center">{++ind}</td>
                    <td className="pl-4 border border-gray-300 px-4 py-2">
                      {data?.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex items-center justify-between gap-1">
                        {isStateEditable && data?.state?._id === editableId &&  rowIndex === ind ? (
                          <>
                            <input
                              name="add_new_state"
                              id="add_new_state"
                              value={stateEditableText}
                              className="w-full"
                              onChange={(e) => {
                                setStateEditableText(e?.target?.value);
                              }}
                            />
                          </>
                        ) : (
                          <>
                            <span>{data?.state?.name || "Not available"}</span>{" "}
                          </>
                        )}
                        {!isStateEditable ||
                        !(data?.state?._id === editableId) ||  !(rowIndex === ind)? (
                          <Edit2Icon
                            onClick={() => {
                              setIsStateEditable(true);
                              setStateEditableText(data?.state?.name);
                              setEditableId(data?.state?._id);
                              setRowIndex(ind)
                            }}
                            className="w-4 h-4 cursor-pointer text-blue-500"
                          />
                        ) : (
                          <span>
                            <div className="w-full flex justify-end gap-1 cursor-pointer ">
                              <SaveIcon
                                onClick={() => {
                                  handleStateUpdate(
                                    data?.state?.name,
                                    data?.state?._id
                                  );
                                }}
                                className="text-blue-500 hover:text-blue-600"
                              />
                              <PlusIcon
                                onClick={() => {
                                  handleNewState(data?._id);
                                }}
                                className="text-green-500 hover:text-green-600"
                              />
                              <Trash2  className="text-red-500 hover:text-red-600" onClick={()=>{alert("coming soon")}}/>
                            <MapPin className="text-purple-500 hover:text-purple-600" onClick={()=>{alert("coming soon")}}/>
                            </div>
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="border border-gray-300  px-4 py-2">
                      <div className="flex items-center justify-between gap-1">
                        {isDistrictEditable &&
                        data?.district?._id === editableId &&
                        rowIndex === ind ? (
                          <>
                            <input
                              name="add_new_district"
                              id="add_new_district"
                              value={districtEditableText}
                              className="w-full"
                              onChange={(e) => {
                                setDistrictEditableText(e?.target?.value);
                              }}
                            />
                          </>
                        ) : (
                          <>{data?.district?.name || "Not available"} </>
                        )}
                        {!isDistrictEditable ||
                        !(data?.district?._id === editableId) ||
                        !(rowIndex === ind) ? (
                          <Edit2Icon
                            onClick={() => {
                              setIsDistrictEditable(true);
                              setDistrictEditableText(data?.district?.name);
                              setEditableId(data?.district?._id);
                              setRowIndex(ind);
                            }}
                            className="w-4 h-4 cursor-pointer text-blue-500"
                          />
                        ) : (
                          <div className="flex gap-1 cursor-pointer ">
                            <SaveIcon
                              onClick={()=>{handleDistrictUpdate(data?.district?.name,data?.district?._id)}}
                              className="text-blue-500 hover:text-blue-600"
                            />
                            <PlusIcon
                              onClick={() => {
                                handleNewDistrict(data?.state?._id);
                              }}
                              className="text-green-500 hover:text-green-600"
                            />
                            <Trash2  className="text-red-500 hover:text-red-600" onClick={()=>{alert("coming soon")}}/>
                            <MapPin className="text-purple-500 hover:text-purple-600" onClick={()=>{alert("coming soon")}}/>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex items-center justify-between gap-1">
                        {isSubDistrictEditable &&
                        data?.sub_district?._id === editableId &&
                        rowIndex === ind ? (
                          <>
                            <input
                              name="add_new_sub_district"
                              id="add_new_sub_district"
                              value={subDistrictEditableText}
                              className="w-full"
                              onChange={(e) => {
                                setSubDistrictEditableText(e?.target?.value);
                              }}
                            />
                          </>
                        ) : (
                          <>{data?.sub_district?.name || "Not available"} </>
                        )}
                        {!isSubDistrictEditable ||
                        !(data?.sub_district?._id === editableId) ||
                        !(rowIndex === ind) ? (
                          <Edit2Icon
                            onClick={() => {
                              setIsSubDistrictEditable(true);
                              setSubDistrictEditableText(
                                data?.sub_district?.name
                              );
                              setEditableId(data?.sub_district?._id);
                              setRowIndex(ind);
                            }}
                            className="w-4 h-4 cursor-pointer text-blue-500"
                          />
                        ) : (
                          <div className="flex gap-1 cursor-pointer ">
                            <SaveIcon
                              onClick={()=>{handleSubDistrictUpdate(data?.sub_district?.name,data?.sub_district?._id)}}
                              className="text-blue-500 hover:text-blue-600"
                            />
                            <PlusIcon
                              onClick={() => {
                                handleNewSubDistrict(data?.district?._id);
                              }}
                              className="text-green-500 hover:text-green-600"
                            />
                           <Trash2  className="text-red-500 hover:text-red-600" onClick={()=>{alert("coming soon")}}/>
                            <MapPin className="text-purple-500 hover:text-purple-600" onClick={()=>{alert("coming soon")}}/>
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex items-center justify-between gap-1">
                        {isGPEditable &&
                        data?.gp?._id === editableId &&
                        rowIndex === ind ? (
                          <>
                            <input
                              name="add_new_gp"
                              id="add_new_gp"
                              value={gpEditableText}
                              className="w-full"
                              onChange={(e) => {
                                setGPEditableText(e?.target?.value);
                              }}
                            />
                          </>
                        ) : (
                          <>{data?.gp?.name || "Not available"} </>
                        )}
                        {!isGPEditable ||
                        !(data?.gp?._id === editableId) ||
                        !(rowIndex === ind) ? (
                          <Edit2Icon
                            onClick={() => {
                              setIsGPEditable(true);
                              setGPEditableText(data?.gp?.name);
                              setEditableId(data?.gp?._id);
                              setRowIndex(ind);
                            }}
                            className="w-4 h-4 cursor-pointer text-blue-500"
                          />
                        ) : (
                          <div className="flex gap-1 cursor-pointer ">
                            <SaveIcon
                              onClick={()=>{handleGPUpdate(data?.gp?.name,data?.gp?._id)}}
                              className="text-blue-500 hover:text-blue-600"
                            />
                            <PlusIcon
                              onClick={() => {
                                handleNewGP(data?.sub_district?._id);
                              }}
                              className="text-green-500 hover:text-green-600"
                            />
                            <Trash2  className="text-red-500 hover:text-red-600" onClick={()=>{alert("coming soon")}}/>
                            <MapPin className="text-purple-500 hover:text-purple-600" onClick={()=>{alert("coming soon")}}/>
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex items-center justify-between gap-1">
                        {isVillageTownEditable &&
                        data?.village_town?._id === editableId &&
                        rowIndex === ind ? (
                          <>
                            <input
                              name="add_new_sub_district"
                              id="add_new_sub_district"
                              value={villageTownEditableText}
                              className="w-full"
                              onChange={(e) => {
                                setVillageTownEditableTExt(e?.target?.value);
                              }}
                            />
                          </>
                        ) : (
                          <>{data?.village_town?.name || "Not available"} </>
                        )}
                        {!isVillageTownEditable ||
                        !(data?.village_town?._id === editableId) ||
                        !(rowIndex === ind) ? (
                          <Edit2Icon
                            onClick={() => {
                              setIsVillageTownEditable(true);
                              setVillageTownEditableTExt(
                                data?.village_town?.name
                              );
                              setEditableId(data?.village_town?._id);
                              setRowIndex(ind);
                            }}
                            className="w-4 h-4 cursor-pointer text-blue-500"
                          />
                        ) : (
                          <div className="flex gap-1 cursor-pointer ">
                            <SaveIcon
                              onClick={handleVillageTownUpdate}
                              className="text-blue-500 hover:text-blue-600"
                            />
                            <PlusIcon
                              onClick={() => {
                                handleNewVillageTown(data?.gp?._id);
                              }}
                              className="text-green-500 hover:text-green-600"
                            />
                            <Trash2  className="text-red-500 hover:text-red-600" onClick={()=>{alert("coming soon")}}/>
                            <MapPin className="text-purple-500 hover:text-purple-600" onClick={()=>{alert("coming soon")}}/>
                          </div>
                        )}
                      </div>
                    </td>

                    <td>
                      <Trash2
                        onClick={() => {
                          alert("coming soon.");
                        }}
                        className="text-red-500 w-full hover:text-red-600 align-middle text-center cursor-pointer"
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center border px-4 py-2">
                  No data available
                </td>
              </tr>
            )}
            {/* {allData?.length > 0 ? (
              allData.map((country, ci) =>
                (country?.states?.length ? country.states : [null]).map(
                  (state, si) =>
                    (state?.districts?.length ? state.districts : [null]).map(
                      (district, di) =>
                        (district?.subDistricts?.length
                          ? district.subDistricts
                          : [null]
                        ).map((subDistrict, sdi) =>
                          (subDistrict?.villages?.length
                            ? subDistrict.villages
                            : [null]
                          ).map((village, vi) => (
                            <tr
                              key={`${ci}-${si}-${di}-${sdi}-${vi}`}
                              className="hover:bg-gray-100"
                            >
                              <td className="border px-4 py-2 text-center">
                                <div className="flex items-center justify-between gap-1">
                                  {country?.name || "null"}{" "}
                                  <Edit2Icon className="w-4 h-4 cursor-pointer text-blue-500" />
                                </div>
                              </td>

                              <td className="border px-4 py-2">
                                <div className="flex items-center justify-between gap-1">
                                  {isStateEditable && state?._id===editableId ? (
                                    <>
                                      <input
                                        name="add_new_state"
                                        id="add_new_state"
                                        value={stateEditableText}
                                        className="w-full"
                                        onChange={(e) => {
                                          setStateEditableText(
                                            e?.target?.value
                                          );
                                        }}
                                      />
                                    </>
                                  ) : (
                                    <>{state?.name || "null"} </>
                                  )}
                                  {!isStateEditable ? (
                                    <Edit2Icon
                                      onClick={() => {
                                        setIsStateEditable(true);
                                        setStateEditableText(state?.name);
                                        setEditableId(state?._id);
                                      }}
                                      className="w-4 h-4 cursor-pointer text-blue-500"
                                    />
                                  ) : (
                                    <div className="flex gap-1 cursor-pointer ">
                                      <SaveIcon
                                        onClick={handleStateUpdate}
                                        className="text-blue-500 hover:text-blue-600"
                                      />
                                      <PlusIcon
                                        onClick={()=>{handleNewState(country?._id)}}
                                        className="text-green-500 hover:text-green-600"
                                      />
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td className="border px-4 py-2">
                                <div className="flex items-center justify-between gap-1">
                                  {district?.name || "null"}{" "}
                                  <Edit2Icon className="w-4 h-4 cursor-pointer text-blue-500" />
                                </div>
                              </td>
                              <td className="border px-4 py-2">
                                <div className="flex items-center justify-between gap-1">
                                  {subDistrict?.name || "null"}{" "}
                                  <Edit2Icon className="w-4 h-4 cursor-pointer text-blue-500" />
                                </div>
                              </td>
                              <td className="border px-4 py-2">
                                <div className="flex items-center justify-between gap-1">
                                  {village?.name || "null"}{" "}
                                  <Edit2Icon className="w-4 h-4 cursor-pointer text-blue-500" />
                                </div>
                              </td>
                              <td className="border px-4 py-2 text-red-500 text-center align-middle">
                                <Trash2 />
                              </td>
                            </tr>
                          ))
                        )
                    )
                )
              )
            ) : (
              <tr>
                <td colSpan="5" className="text-center border px-4 py-2">
                  No data available
                </td>
              </tr>
            )} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageData;
