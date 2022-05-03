import { set } from 'date-fns';
import { useCallback, useRef, useState } from 'react';
import { OverlayTrigger} from 'react-bootstrap';
import {
    GoogleMap, 
    useLoadScript,
    Marker,
    infoWindow,
    InfoWindow,
  } from "@react-google-maps/api";

import { getGeocode, getLatLng } from 'use-places-autocomplete';
import PopOver from '../PopOver/PopOver';
import './Search.css';

const Suggestions = ({ data, mapRef, clearSuggestions }) => {

    const [ selected, setSelected ] = useState([]);
    const [coordinates, setCoordinates ] = useState([]);

    const target = useRef(null);
    
    const [ show, setShow ] = useState(true);

    const handleShow = (event) => {
        setShow(!show)
    }
    
    const handleSelect = (id, description) =>{
        let searched = data.filter(el => el.place_id  === id)
        setSelected(searched);

        getGeocode({ address: description })
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                setCoordinates  ({
                    lat: lat,
                    lng: lng,
                })
                panFunction(lat, lng);
                
                clearSuggestions(null)
            })
            .catch(error => {
                console.log("error:", error);
            })
            setShow(!show)
            
    }

    const panFunction = useCallback(( lat, lng) => {
        mapRef.current.panTo({ lat, lng})
        mapRef.current.setZoom(16)
    })

    return ( 
        <OverlayTrigger
            show={show}
            placement='bottom-end'
            target={target.current}
            onHide={() => setShow(false)}
            overlay={
                <></>
            }
        > 
        <>
            <PopOver 
                data={data}
                handleSelect={handleSelect}
                handleShow={handleShow}
                target={target}
            />  
            {coordinates.lat && coordinates.lng && <Marker
                        position={coordinates} 
                        icon={
                            {
                            url: 'red-pointer.png',
                            scaledSize: new window.google.maps.Size(20, 20),
                            origin: new window.google.maps.Point(0,0),
                            anchor: new window.google.maps.Point(15, 15)
                            }
                        }
                    />

          } 

        </>
        </OverlayTrigger> 
         
     );
}
 
export default Suggestions;