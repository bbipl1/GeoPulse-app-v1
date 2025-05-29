
import './App.css';
import AdministrativeFilterContextProvider from './contextProvider/AdministrativeFilterContextProvider';
import BaseMap from './map/BaseMap';

function App() {
  return (
    <div className="bg-red-500  ">
      <h1>✅ Here, all the map data with various map boundaries will be shown.</h1>
      {/* <AdministrativeFilterContextProvider> */}
        <BaseMap/>
      {/* </AdministrativeFilterContextProvider> */}
    </div>
  );
}

export default App;
