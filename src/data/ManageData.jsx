import React, { useEffect, useState } from "react";
import apiService from "../api/services/apiService";
import axios, { all } from "axios";
import { CrossIcon, Edit2Icon, PlusIcon, SaveIcon, Trash2 } from "lucide-react";

const ManageData = () => {
    const [refresh,setRefresh]=useState(0);
  const [countries, setCountries] = useState(null);
  const [states, setStates] = useState(null);
  const [districts, setDistricts] = useState(null);
  const [subDistricts, setSubDistricts] = useState(null);
  const [villages_towns, setVillages_Towns] = useState(null);

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

  const [isVillageTownEditable,setIsVillageTownEditable]=useState(false);
  const [villageTownEditableText,setVillageTownEditableTExt]=useState(null);

  useEffect(() => {
    let suburl = `/api/v1/admin/data/manage_data/get_all_data_details`;
    apiService
      .get(suburl)
      .then((res) => {
        setAllData(res?.data);
        console.log(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

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
        setRefresh(refresh+1)
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
  const handleStateUpdate = () => {
    setIsStateEditable(false);
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
        setRefresh(refresh+1)
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
  const handleDistrictUpdate = () => {
    setIsStateEditable(false);
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
        setRefresh(refresh+1)
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
  const handleSubDistrictUpdate = () => {
    setIsStateEditable(false);
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
        setRefresh(refresh+1)
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
      sub_district_id: id,
    };

    // console.log("payload is", payload);

    apiService
      .post(suburl, payload)
      .then((res) => {
        console.log(res);
        setRefresh(refresh+1)
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
          <PlusIcon onClick={handleNewCountry}/>
          {/* <button className="p-2 rounded-md border-4 border-red-500 ml-4 bg-black text-white" >Add new</button> */}
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
              <th className="border  border-gray-500 px-4 py-2">Sub-District</th>
              <th className="border border-gray-500 px-4 py-2">Village/Town</th>
              <th className="border border-gray-500 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allData?.length > 0 ? (
              allData?.map((data, ind) => {
                return (
                  <tr className={`${ind%2===1?"bg-white":"bg-gray-200"}`}>
                    <td className="text-center">{++ind}</td>
                    <td className="pl-4 border border-gray-300 px-4 py-2">{data?.name}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex items-center justify-between gap-1">
                        {isStateEditable && data?.state?._id === editableId ? (
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
                          <>{data?.state?.name || "null"} </>
                        )}
                        {!isStateEditable ||
                        !(data?.state?._id === editableId) ? (
                          <Edit2Icon
                            onClick={() => {
                              setIsStateEditable(true);
                              setStateEditableText(data?.state?.name);
                              setEditableId(data?.state?._id);
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
                              onClick={() => {
                                handleNewState(data?._id);
                              }}
                              className="text-green-500 hover:text-green-600"
                            />
                          </div>
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
                          <>{data?.district?.name || "null"} </>
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
                              onClick={handleDistrictUpdate}
                              className="text-blue-500 hover:text-blue-600"
                            />
                            <PlusIcon
                              onClick={() => {
                                handleNewDistrict(data?.state?._id);
                              }}
                              className="text-green-500 hover:text-green-600"
                            />
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
                          <>{data?.sub_district?.name || "null"} </>
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
                              onClick={handleSubDistrictUpdate}
                              className="text-blue-500 hover:text-blue-600"
                            />
                            <PlusIcon
                              onClick={() => {
                                handleNewSubDistrict(data?.district?._id);
                              }}
                              className="text-green-500 hover:text-green-600"
                            />
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
                          <>{data?.village_town?.name || "null"} </>
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
                                handleNewVillageTown(data?.sub_district?._id);
                              }}
                              className="text-green-500 hover:text-green-600"
                            />
                          </div>
                        )}
                      </div>
                    </td>
                    <td><Trash2 onClick={()=>{alert("coming soon.")}} className="text-red-500 w-full hover:text-red-600 align-middle text-center cursor-pointer"/></td>
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
