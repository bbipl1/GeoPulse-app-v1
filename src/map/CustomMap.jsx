import React, { useEffect, useState } from "react";
import { Filter, X } from "lucide-react";
import BaseMap from "./BaseMap";
import useGetData from "./GetData";

const CustomMap = () => {
  const [filterToggle, setFilterToggle] = useState(false);

  const {
    countries,
    selectedCountry,
    setSelectedCountry,
    states,
    selectedState,
    setSelectedState,
    districts,
    setSelectedDistrict,
    subDistricts,
    setSelectedSubDistrict,
    filteredData,
  } = useGetData();

  const filterDat = {
    states_and_uts: [
      {
        "Andhra Pradesh": [
          "Alluri Sitharama Raju",
          "Anakapalli",
          "Parvathipuram Manyam",
          "Srikakulam",
          "Visakhapatnam",
          "Vizianagaram",
          "Bapatla",
          "Dr. B. R. Ambedkar Konaseema",
          "East Godavari",
          "Eluru",
          "Guntur",
          "Kakinada",
          "Krishna",
          "NTR",
          "Palnadu",
          "Prakasam",
          "Sri Potti Sriramulu Nellore",
          "West Godavari",
          "Anantapur",
          "Annamayya",
          "Chittoor",
          "Kadapa",
          "Kurnool",
          "Nandyal",
          "Sri Sathya Sai",
          "Tirupati",
        ],
      },

      {
        "Arunachal Pradesh": [
          "Anjaw",
          "Bichom",
          "Changlang",
          "Dibang Valley",
          "East Kameng",
          "East Siang",
          "Kamle",
          "Keyi Panyor",
          "Kra Daadi",
          "Kurung Kumey",
          "Lepa Rada",
          "Lohit",
          "Longding",
          "Lower Dibang Valley",
          "Lower Siang",
          "Lower Subansiri",
          "Namsai",
          "Pakke Kessang",
          "Papum Pare",
          "Shi Yomi",
          "Siang",
          "Tawang",
          "Tirap",
          "Upper Siang",
          "Upper Subansiri",
          "West Kameng",
          "West Siang",
          "Itanagar Capital Complex",
        ],
      },
      {
        Assam: [
          "Baksa",
          "Barpeta",
          "Bajali",
          "Biswanath",
          "Bongaigaon",
          "Cachar",
          "Charaideo",
          "Chirang",
          "Darrang",
          "Dhemaji",
          "Dhubri",
          "Dibrugarh",
          "Dima Hasao",
          "Goalpara",
          "Golaghat",
          "Hailakandi",
          "Hojai",
          "Jorhat",
          "Kamrup",
          "Kamrup Metropolitan",
          "Karbi Anglong",
          "Karimganj",
          "Kokrajhar",
          "Lakhimpur",
          "Majuli",
          "Morigaon",
          "Nagaon",
          "Nalbari",
          "Sivasagar",
          "Sonitpur",
          "South Salmara-Mankachar",
          "Tamulpur",
          "Tinsukia",
          "Udalguri",
          "West Karbi Anglong",
        ],
      },
      {
        Bihar: [
          "Araria",
          "Arwal",
          "Aurangabad",
          "Banka",
          "Begusarai",
          "Bhagalpur",
          "Bhojpur",
          "Buxar",
          "Darbhanga",
          "East Champaran",
          "Gaya",
          "Gopalganj",
          "Jamui",
          "Jehanabad",
          "Kaimur",
          "Katihar",
          "Khagaria",
          "Kishanganj",
          "Lakhisarai",
          "Madhepura",
          "Madhubani",
          "Munger",
          "Muzaffarpur",
          "Nalanda",
          "Nawada",
          "Patna",
          "Purnia",
          "Rohtas",
          "Saharsa",
          "Samastipur",
          "Saran",
          "Sheikhpura",
          "Sheohar",
          "Sitamarhi",
          "Siwan",
          "Supaul",
          "Vaishali",
          "West Champaran",
        ],
      },
      {
        Chhattisgarh: [
          "Balod",
          "Baloda Bazar",
          "Balrampur",
          "Bastar",
          "Bemetara",
          "Bijapur",
          "Bilaspur",
          "Dantewada",
          "Dhamtari",
          "Durg",
          "Gariaband",
          "Gaurela-Pendra-Marwahi",
          "Janjgir-Champa",
          "Jashpur",
          "Kabirdham",
          "Kanker",
          "Kondagaon",
          "Korba",
          "Koriya",
          "Mahasamund",
          "Mungeli",
          "Narayanpur",
          "Raigarh",
          "Raipur",
          "Rajnandgaon",
          "Sukma",
          "Surajpur",
          "Surguja",
        ],
      },
      {
        Goa: ["North Goa", "South Goa"],
      },
      {
        Gujarat: [
          "Ahmedabad",
          "Amreli",
          "Anand",
          "Aravalli",
          "Banaskantha",
          "Bharuch",
          "Bhavnagar",
          "Botad",
          "Chhota Udaipur",
          "Dahod",
          "Dang",
          "Devbhoomi Dwarka",
          "Gandhinagar",
          "Gir Somnath",
          "Jamnagar",
          "Junagadh",
          "Kheda",
          "Kutch",
          "Mahisagar",
          "Mehsana",
          "Morbi",
          "Narmada",
          "Navsari",
          "Panchmahal",
          "Patan",
          "Porbandar",
          "Rajkot",
          "Sabarkantha",
          "Surat",
          "Surendranagar",
          "Tapi",
          "Vadodara",
          "Valsad",
          "Vav-Tharad",
        ],
      },
      {
        Haryana: [
          "Ambala",
          "Bhiwani",
          "Charkhi Dadri",
          "Faridabad",
          "Fatehabad",
          "Gurugram",
          "Hisar",
          "Jhajjar",
          "Jind",
          "Kaithal",
          "Karnal",
          "Kurukshetra",
          "Mahendragarh",
          "Nuh",
          "Palwal",
          "Panchkula",
          "Panipat",
          "Rewari",
          "Rohtak",
          "Sirsa",
          "Sonipat",
          "Yamunanagar",
        ],
      },
      {
        "Himachal Pradesh": [
          "Bilaspur",
          "Chamba",
          "Hamirpur",
          "Kangra",
          "Kinnaur",
          "Kullu",
          "Lahaul and Spiti",
          "Mandi",
          "Shimla",
          "Sirmaur",
          "Solan",
          "Una",
        ],
      },
      {
        Jharkhand: [
          "Bokaro",
          "Chatra",
          "Deoghar",
          "Dhanbad",
          "Dumka",
          "East Singhbhum",
          "Garhwa",
          "Giridih",
          "Godda",
          "Gumla",
          "Hazaribagh",
          "Jamtara",
          "Khunti",
          "Koderma",
          "Latehar",
          "Lohardaga",
          "Pakur",
          "Palamu",
          "Ramgarh",
          "Ranchi",
          "Sahibganj",
          "Seraikela Kharsawan",
          "Simdega",
          "West Singhbhum",
        ],
      },
      {
        Karnataka: [
          "Bagalkot",
          "Ballari",
          "Belagavi",
          "Bengaluru Rural",
          "Bengaluru Urban",
          "Bidar",
          "Chamarajanagar",
          "Chikkaballapur",
          "Chikkamagaluru",
          "Chitradurga",
          "Dakshina Kannada",
          "Davanagere",
          "Dharwad",
          "Gadag",
          "Hassan",
          "Haveri",
          "Kalaburagi",
          "Kodagu",
          "Kolar",
          "Koppal",
          "Mandya",
          "Mysuru",
          "Raichur",
          "Ramanagara",
          "Shivamogga",
          "Tumakuru",
          "Udupi",
          "Uttara Kannada",
          "Vijayanagara",
          "Yadgir",
        ],
      },
      {
        Kerala: [
          "Alappuzha",
          "Ernakulam",
          "Idukki",
          "Kannur",
          "Kasaragod",
          "Kollam",
          "Kottayam",
          "Kozhikode",
          "Malappuram",
          "Palakkad",
          "Pathanamthitta",
          "Thiruvananthapuram",
          "Thrissur",
          "Wayanad",
        ],
      },
      {
        "Madhya Pradesh": [
          "Agar Malwa",
          "Alirajpur",
          "Anuppur",
          "Ashoknagar",
          "Balaghat",
          "Barwani",
          "Betul",
          "Bhind",
          "Bhopal",
          "Burhanpur",
          "Chhatarpur",
          "Chhindwara",
          "Damoh",
          "Datia",
          "Dewas",
          "Dhar",
          "Dindori",
          "Guna",
          "Gwalior",
          "Harda",
          "Hoshangabad",
          "Indore",
          "Jabalpur",
          "Jhabua",
          "Katni",
          "Khandwa",
          "Khargone",
          "Mandla",
          "Mandsaur",
          "Morena",
          "Narsinghpur",
          "Neemuch",
          "Panna",
          "Raisen",
          "Rajgarh",
          "Ratlam",
          "Rewa",
          "Sagar",
          "Satna",
          "Sehore",
          "Seoni",
          "Shahdol",
          "Shajapur",
          "Sheopur",
          "Shivpuri",
          "Sidhi",
          "Singrauli",
          "Tikamgarh",
          "Ujjain",
          "Umaria",
          "Vidisha",
        ],
      },
      {
        Maharashtra: [
          "Ahmednagar",
          "Akola",
          "Amravati",
          "Aurangabad",
          "Beed",
          "Bhandara",
          "Buldhana",
          "Chandrapur",
          "Dhule",
          "Gadchiroli",
          "Gondia",
          "Hingoli",
          "Jalgaon",
          "Jalna",
          "Kolhapur",
          "Latur",
          "Mumbai City",
          "Mumbai Suburban",
          "Nagpur",
          "Nanded",
          "Nandurbar",
          "Nashik",
          "Osmanabad",
          "Palghar",
          "Parbhani",
          "Pune",
          "Raigad",
          "Ratnagiri",
          "Sangli",
          "Satara",
          "Sindhudurg",
          "Solapur",
          "Thane",
          "Wardha",
          "Washim",
          "Yavatmal",
        ],
      },
      {
        Manipur: [
          "Bishnupur",
          "Chandel",
          "Churachandpur",
          "Imphal East",
          "Imphal West",
          "Jiribam",
          "Kakching",
          "Kamjong",
          "Kangpokpi",
          "Noney",
          "Pherzawl",
          "Senapati",
          "Tamenglong",
          "Tengnoupal",
          "Thoubal",
          "Ukhrul",
        ],
      },
      {
        Meghalaya: [
          "East Garo Hills",
          "East Jaintia Hills",
          "East Khasi Hills",
          "North Garo Hills",
          "Ri Bhoi",
          "South Garo Hills",
          "South West Garo Hills",
          "South West Khasi Hills",
          "West Garo Hills",
          "West Jaintia Hills",
          "West Khasi Hills",
        ],
      },
      {
        Mizoram: [
          "Aizawl",
          "Champhai",
          "Khawzawl",
          "Kolasib",
          "Lawngtlai",
          "Lunglei",
          "Mamit",
          "Saiha",
          "Serchhip",
        ],
      },
      {
        Nagaland: [
          "Dimapur",
          "Kiphire",
          "Kohima",
          "Longleng",
          "Mokokchung",
          "Mon",
          "Peren",
          "Phek",
          "Tuensang",
          "Wokha",
          "Zunheboto",
        ],
      },
      {
        Odisha: [
          "Angul",
          "Balangir",
          "Balasore",
          "Bargarh",
          "Bhadrak",
          "Boudh",
          "Cuttack",
          "Deogarh",
          "Dhenkanal",
          "Gajapati",
          "Ganjam",
          "Jagatsinghpur",
          "Jajpur",
          "Jharsuguda",
          "Kalahandi",
          "Kandhamal",
          "Kendrapara",
          "Kendujhar",
          "Khordha",
          "Koraput",
          "Malkangiri",
          "Mayurbhanj",
          "Nabarangpur",
          "Nayagarh",
          "Nuapada",
          "Puri",
          "Rayagada",
          "Sambalpur",
          "Sonepur",
          "Sundargarh",
        ],
      },
      {
        Punjab: [
          "Amritsar",
          "Barnala",
          "Bathinda",
          "Faridkot",
          "Fatehgarh Sahib",
          "Fazilka",
          "Ferozepur",
          "Gurdaspur",
          "Hoshiarpur",
          "Jalandhar",
          "Kapurthala",
          "Ludhiana",
          "Mansa",
          "Moga",
          "Muktsar",
          "Pathankot",
          "Patiala",
          "Rupnagar",
          "Sangrur",
          "SAS Nagar",
          "Shahid Bhagat Singh Nagar",
          "Tarn Taran",
        ],
      },
      {
        Rajasthan: [
          "Ajmer",
          "Alwar",
          "Banswara",
          "Baran",
          "Barmer",
          "Bharatpur",
          "Bhilwara",
          "Bikaner",
          "Bundi",
          "Chittorgarh",
          "Churu",
          "Dausa",
          "Dholpur",
          "Dungarpur",
          "Hanumangarh",
          "Jaipur",
          "Jaisalmer",
          "Jalore",
          "Jhalawar",
          "Jhunjhunu",
          "Jodhpur",
          "Karauli",
          "Kota",
          "Nagaur",
          "Pali",
          "Pratapgarh",
          "Rajsamand",
          "Sawai Madhopur",
          "Sikar",
          "Sirohi",
          "Sri Ganganagar",
          "Tonk",
          "Udaipur",
        ],
      },
      {
        Sikkim: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
      },
      {
        "Tamil Nadu": [
          "Ariyalur",
          "Chengalpattu",
          "Chennai",
          "Coimbatore",
          "Cuddalore",
          "Dharmapuri",
          "Dindigul",
          "Erode",
          "Kallakurichi",
          "Kanchipuram",
          "Kanyakumari",
          "Karur",
          "Krishnagiri",
          "Madurai",
          "Nagapattinam",
          "Namakkal",
          "Nilgiris",
          "Perambalur",
          "Pudukottai",
          "Ramanathapuram",
          "Ranipet",
          "Salem",
          "Sivaganga",
          "Tenkasi",
          "Thanjavur",
          "Theni",
          "Thoothukudi",
          "Tiruchirappalli",
          "Tirunelveli",
          "Tiruppur",
          "Tiruvallur",
          "Tiruvannamalai",
          "Tiruvarur",
          "Vellore",
          "Viluppuram",
          "Virudhunagar",
        ],
      },
      {
        Telangana: [
          "Adilabad",
          "Bhadradri Kothagudem",
          "Hyderabad",
          "Jagtial",
          "Jangaon",
          "Jayashankar Bhupalpally",
          "Jogulamba Gadwal",
          "Kamareddy",
          "Karimnagar",
          "Khammam",
          "Komaram Bheem Asifabad",
          "Mahabubabad",
          "Mahbubnagar",
          "Mancherial",
          "Medak",
          "Medchal",
          "Nagarkurnool",
          "Nalgonda",
          "Narayanpet",
          "Nirmal",
          "Nizamabad",
          "Peddapalli",
          "Rajanna Sircilla",
          "Rangareddy",
          "Sangareddy",
          "Siddipet",
          "Suryapet",
          "Vikarabad",
          "Wanaparthy",
          "Warangal Rural",
          "Warangal Urban",
          "Yadadri Bhuvanagiri",
        ],
      },
      {
        Tripura: [
          "Dhalai",
          "Gomati",
          "Khowai",
          "North Tripura",
          "Sepahijala",
          "South Tripura",
          "Unakoti",
          "West Tripura",
        ],
      },
      {
        "Uttar Pradesh": [
          "Agra",
          "Aligarh",
          "Ambedkar Nagar",
          "Amethi",
          "Amroha",
          "Auraiya",
          "Ayodhya",
          "Azamgarh",
          "Baghpat",
          "Bahraich",
          "Ballia",
          "Balrampur",
          "Banda",
          "Barabanki",
          "Bareilly",
          "Basti",
          "Bhadohi",
          "Bijnor",
          "Bulandshahr",
          "Chandauli",
          "Chitrakoot",
          "Deoria",
          "Etah",
          "Etawah",
          "Farrukhabad",
          "Fatehpur",
          "Firozabad",
          "Gautam Buddha Nagar",
          "Ghaziabad",
          "Ghazipur",
          "Gonda",
          "Gorakhpur",
          "Hamirpur",
          "Hapur",
          "Hardoi",
          "Hathras",
          "Jalaun",
          "Jaunpur",
          "Jhansi",
          "Jyotiba Phule Nagar",
          "Kannauj",
          "Kanpur Dehat",
          "Kanpur Nagar",
          "Kasganj",
          "Kaushambi",
          "Kushinagar",
          "Lakhimpur Kheri",
          "Lalitpur",
          "Lucknow",
          "Maharajganj",
          "Mahoba",
          "Mainpuri",
          "Mathura",
          "Mau",
          "Meerut",
          "Mirzapur",
          "Moradabad",
          "Muzaffarnagar",
          "Pilibhit",
          "Pratapgarh",
          "Raebareli",
          "Rampur",
          "Saharanpur",
          "Sambhal",
          "Sant Kabir Nagar",
          "Shahjahanpur",
          "Shamli",
          "Shravasti",
          "Siddharthnagar",
          "Sitapur",
          "Sonbhadra",
          "Sultanpur",
          "Unnao",
          "Varanasi",
        ],
      },
      "Uttarakhand",
      {
        "West Bengal": [
          "Alipurduar",
          "Bankura",
          "Birbhum",
          "Cooch Behar",
          "Dakshin Dinajpur",
          "Darjeeling",
          "Hooghly",
          "Howrah",
          "Jalpaiguri",
          "Jhargram",
          "Kalimpong",
          "Kolkata",
          "Malda",
          "Murshidabad",
          "Nadia",
          "North 24 Parganas",
          "Paschim Bardhaman",
          "Paschim Medinipur",
          "Purba Bardhaman",
          "Purba Medinipur",
          "Purulia",
          "South 24 Parganas",
          "Uttar Dinajpur",
        ],
      },
      {
        "Andaman and Nicobar Islands (UT)": [
          "Nicobar",
          "North and Middle Andaman",
          "South Andaman",
        ],
      },
      "Chandigarh (UT)",
      {
        "Dadra and Nagar Haveli and Daman and Diu (UT)": [
          "Dadra and Nagar Haveli",
          "Daman",
          "Diu",
        ],
      },
      {
        "Delhi (UT)": [
          "Central Delhi",
          "East Delhi",
          "New Delhi",
          "North Delhi",
          "North East Delhi",
          "North West Delhi",
          "Shahdara",
          "South Delhi",
          "South East Delhi",
          "South West Delhi",
          "West Delhi",
        ],
      },
      {
        "Jammu and Kashmir (UT)": [
          "Anantnag",
          "Bandipora",
          "Baramulla",
          "Budgam",
          "Doda",
          "Ganderbal",
          "Jammu",
          "Kathua",
          "Kishtwar",
          "Kulgam",
          "Kupwara",
          "Poonch",
          "Pulwama",
          "Rajouri",
          "Ramban",
          "Reasi",
          "Samba",
          "Shopian",
          "Srinagar",
          "Udhampur",
        ],
      },
      {
        "Ladakh (UT)": ["Leh", "Kargil"],
      },
      {
        "Lakshadweep (UT)": [],
      },
      {
        "Puducherry (UT)": ["Karaikal", "Mahe", "Puducherry", "Yanam"],
      },
    ],
  };

  return (
    <div className="relative">
      <div className="absolute left-0 top-0 z-10">
        <BaseMap></BaseMap>
      </div>

      {filterToggle ? (
        <>
          <div className="absolute left-12 top-4 z-10 ">
            <div className="border-2 bg-white opacity-80 p-4">
              <div
                onClick={() => {
                  setFilterToggle(false);
                }}
                className="absolute flex justify-end w-5/6 overflow-hidde"
              >
                <X className="cursor-pointer" />
              </div>
              <div className="text-lg py-4 flex justify-center">
                Filter options
              </div>
              <div className="">
                <div className="">
                  <div className="">
                    <label htmlFor="country" className="font-bold">Country</label>
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
                    <label htmlFor="state" className="font-bold">State</label>
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
                    <label htmlFor="district" className="font-bold">District</label>
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
                    <label htmlFor="block" className="font-bold">Block</label>
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
              <div>
                <button onClick={()=>{alert("Loading please wait."); setFilterToggle(!filterToggle)}} className="w-full text-center rounded-md bg-green-500 text-white mt-4">Submit</button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="absolute left-2 top-24 z-10">
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
  );
};

export default CustomMap;
