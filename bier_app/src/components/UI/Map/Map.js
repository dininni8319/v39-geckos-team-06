import { useCallback, useRef, useState } from 'react';
import '../../../App.css';
import {
  GoogleMap, 
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import { 
  mapContainerStyle, 
  options, 
  api_key, 
  libraries
} from './utilities';
import useGeolocation from '../../Hooks/useGeolocation';
import Search from '../Search/Search';
import Location from './../Locate/Locate';

const Map = () => {
  const [ markers, setMarkers ] = useState([]);

  const [ selected, setSelected ] = useState(null);
  
  const mapRef = useRef();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: api_key,
    libraries,
  })
  
  const panFunction = useCallback(( lat, lng) => {
    mapRef.current.panTo({ lat, lng})
    mapRef.current.setZoom(16)
  })

  const location = useGeolocation();

  const center = {
    lat: location.coordinates.lat,
    lng: location.coordinates.lng
  };

  const onMapClick = useCallback((event) => {
    setMarkers(current => [...current, {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date(),

    }])
  }, []);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  })

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Error loading maps";

  return (
    <section className='d-flex'>
      <h3 className='h1'>Beer App{" "}<span role="img" aria-label='tent'>🍺</span></h3>
      <GoogleMap 
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
      <Search 
        mapRef={mapRef}
        panFunction={panFunction}
        setMarkers={setMarkers}
      />


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

        {/* My location  */}
         {center.lat && center.lng && <Marker 
             position={center} 
             icon={
              {
                url: 'blue-pointer.png',
                scaledSize: new window.google.maps.Size(60, 60),
                origin: new window.google.maps.Point(0,0),
                anchor: new window.google.maps.Point(15, 15)
              }
            }
          />
        }
      <Location panFunction={panFunction} />
      
      {/* infowindow is a component that pops out */}
       {selected ? (<InfoWindow 
         position={{lat: selected.lat, lng: selected.lng}} 
         onCloseClick={() => {
         setSelected(null)
       }}> 
        <div>
          <h3>Meetup place</h3>
          <p>{selected.description}</p>
        </div>
       </InfoWindow>) : null }
      </GoogleMap>

    </section>
  );
}

export default Map;
