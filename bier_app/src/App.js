import { useCallback, useRef, useState } from 'react';
import './App.css';
import {
  GoogleMap, 
  useLoadScript,
  Marker,
  infoWindow,
  InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import mapStyles from './mapStyles';
import Search from './components/UI/Search/Search';

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

  const [ markers, setMarkers] = useState([]);
  const [ selected, setSelected ] = useState(null);
  const onMapClick = useCallback((event) => {
    setMarkers(current => [...current, {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date(),

    }])
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  })

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Error loading maps";

  return (
    <>
      <h1 className='h1'>Beer{" "}<span role="img" aria-label='tent'>🍺</span></h1>
      <Search />
      <GoogleMap 
        mapContainerStyle={mapContainerStyle}
        zoom={11}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
      {markers.map(marker => <Marker 
        key={marker.time.toISOString()} 
        position={{lat: marker.lat, lng: marker.lng}} 
        icon={
          {
            url: 'beer-map.png',
            scaledSize: new window.google.maps.Size(35, 35),
            origin: new window.google.maps.Point(0,0),
            anchor: new window.google.maps.Point(15, 15)
          }
        }
        onClick={() => {
          setSelected(marker);
        }}
      />)}
      {/* inofwindow is a componet that pops out */}
       {selected ? (<InfoWindow 
         position={{lat: selected.lat, lng: selected.lng}} 
         onCloseClick={() => {
         setSelected(null)
       }}> 
        <div>
          <h3>Meetup place</h3>
          <p>Time selected place: {formatRelative(selected.time, new Date())}</p>
        </div>
       </InfoWindow>) : null }
      </GoogleMap>

    </>
  );
}


export default App;
