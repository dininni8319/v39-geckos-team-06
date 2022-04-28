import React from 'react';
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
  height: '100vh'
}

const center = {
  lat: 40.7128,
  lng: -74.0060
}

const options = {
  styles: mapStyles,
}
let api_key = process.env.REACT_APP_API_GOOGLE_MAPS_API_KEY;

function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: api_key,
    libraries,
  })

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Error loading maps";

  return (
    <>
      <GoogleMap 
        mapContainerStyle={mapContainerStyle}
        zoom={11}
        center={center}
        options={options}
      ></GoogleMap>
    </>
  );
}

export default App;
