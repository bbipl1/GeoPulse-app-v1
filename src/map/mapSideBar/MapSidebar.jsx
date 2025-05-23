
import { Filter } from "lucide-react";
import DataFilter from "./DataFilter";

const MapSidebar = ({setFilteredData}) => {
  return (
    <div>
      <DataFilter setFilteredData={setFilteredData} />
    </div>
  );
};

export default MapSidebar;
