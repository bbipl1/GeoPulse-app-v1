import { useEffect, useState } from "react";
import axios from "axios";
import apiService from "../../api/services/apiService";

const useFilteredGeoData = (filters = {}) => {
  const {
    country,
    state,
    district,
    sub_district,
    gp,
    village_town,
    category,
    geometry_type,
  } = filters;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilteredData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Trim and build query parameters
        const params = {};
        if (country) params.country = country.trim();
        if (state) params.state = state.trim();
        if (district) params.district = district.trim();
        if (sub_district) params.sub_district = sub_district.trim();
        if (gp) params.gp = gp.trim();
        if (village_town) params.village_town = village_town.trim();
        if (category) params.category = category.trim();
        if (geometry_type) params.geometry_type = geometry_type.trim();
        const suburl =
          "/api/v1/admin/feature_collections_data/get_feature_collection_data";
        const response = await apiService.get(suburl, { params });
        setData(response.data[0]);
        // console.log(response.data[0])
      } catch (err) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredData();
  }, [
    country,
    state,
    district,
    sub_district,
    gp,
    village_town,
    category,
    geometry_type,
  ]);

  return { data, loading, error };
};

export default useFilteredGeoData;
