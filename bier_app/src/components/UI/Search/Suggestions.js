import { set } from 'date-fns';
import { useCallback, useRef, useState } from 'react';
import { OverlayTrigger} from 'react-bootstrap';
import {
    Marker,
    InfoWindow,
  } from "@react-google-maps/api";
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import PopOver from '../PopOver/PopOver';
import './Search.css';

const Suggestions = ({ data, mapRef, selected , setSelected, clearSuggestions }) => {
    const [coordinates, setCoordinates ] = useState([]);

    const [ info, setInfo ] = useState(false)
    const target = useRef(null);
    
    const [ show, setShow ] = useState(true);

    const handleShow = (event) => {
        setShow(!show)
    }
    const handleInfo = () => {
        setInfo(!info);
    }

    const handleSelect = (id, description) =>{
        let searched = data.filter(el => el.place_id  === id)[0]
        let unique = selected.some(el => el.place_id === id)
        if (!unique) {
            setSelected((current) => {
               return  [ searched, ...current]
            });
        }

        getGeocode({ address: description })
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                setCoordinates  ({
                    lat: lat,
                    lng: lng,
                    description: description
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
                        onClick={() =>  handleInfo()} 
                        icon={
                            {
                            url: 'red-pointer.png',
                            scaledSize: new window.google.maps.Size(25, 25),
                            origin: new window.google.maps.Point(0,0),
                            anchor: new window.google.maps.Point(15, 15)
                            }
                        }
                    > 
                    {info && (<InfoWindow 
                            position={coordinates} 
                            opacity={1}
                            onCloseClick={() => {
                                handleInfo()
                        }}> 
                            <h6>{coordinates.description.slice(0,20)}</h6>  
                    </InfoWindow>)}
            </Marker>
          }
        </>
        
        </OverlayTrigger> 
         
     );
}
 
export default Suggestions;