import { useState } from 'react';
import './App.css';

import {
  GoogleMap, 
  useLoadScript,
  Marker,
  infoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import mapStyles from './mapStyles';
// import "reach/combobox/styles.css";

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
  borderRadius: '5px',
}

const center = {
  lat: 40.7128,
  lng: -74.0060
}

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControll: true
}
let api_key = process.env.REACT_APP_API_GOOGLE_MAPS_API_KEY;

function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: api_key,
    libraries,
  })

  const [ markers, setMarkers] = useState([])

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Error loading maps";

  return (
    <>
      <h1 className='h1'>Beer{" "}<span role="img" aria-label='tent'>🍺</span></h1>
      <GoogleMap 
        mapContainerStyle={mapContainerStyle}
        zoom={11}
        center={center}
        options={options}
        onClick={(event) => {
          setMarkers(current => [...current, {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date(),

          }])
        }}
      >
      {markers.map(marker => <Marker 
        key={marker.time.toISOString()} 
        position={{lat: marker.lat, lng: marker.lng}} 
        icon={
          {
            url: 'beer-svg.svg'
          }
        }
      />)}
      </GoogleMap>
    </>
  );
}

export default App;
