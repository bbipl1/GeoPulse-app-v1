import React, { useState } from "react";
import { Filter,X } from "lucide-react";
import BaseMap from "./BaseMap";

const CustomMap = () => {
  const [filterToggle, setFilterToggle] = useState(false);
  return (
    <div className="relative">
      <div className="absolute left-0 top-0 z-10">
        <BaseMap></BaseMap>
      </div>

      {filterToggle ? (
        <>
          <div className="absolute left-12 top-4 z-10 ">
            <div className="border-2 bg-white opacity-80 p-4">
                <div onClick={()=>{setFilterToggle(false)}} className="absolute flex justify-end w-5/6 overflow-hidde">
                    <X className="cursor-pointer"/>
                </div>
              <div className="text-lg py-4 flex justify-center">
                Filter options
              </div>
              <div className="">
                <div className="grid grid-cols-2">
                  <div>
                    <label htmlFor="country">Country</label>
                  </div>
                  <div>
                    <select name="country" id="country" className="w-full">
                      <option value="">Select</option>
                      <option value="india">India</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <label htmlFor="state">State</label>
                  <select name="state" id="state" className="w-full">
                    <option value="">Select</option>
                    <option value="bihar">Bihar</option>
                    <option value="uttar-pradesh">Uttar Pradesh</option>
                    <option value="jharkhand">Jharkhand</option>
                  </select>
                </div>
                <div className="grid grid-cols-2">
                  <label htmlFor="district">District</label>
                  <select name="district" id="district" className="w-full">
                    <option value="">Select</option>
                    <option value="saharsa">Saharsa</option>
                    <option value="madhepura">Madhepura</option>
                  </select>
                </div>
                <div className="grid grid-cols-2">
                  <label htmlFor="block">Block</label>
                  <select name="block" id="block" className="w-full">
                    <option value="">Select</option>
                    <option value="saharsa">sattar kataiya</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="absolute left-2 top-24 z-10">
            <div onClick={()=>{setFilterToggle(!filterToggle)}} className=" bg-white rounded-md p-1"><Filter/></div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomMap;
