import { set } from 'date-fns';
import { useRef, useState } from 'react';
import { OverlayTrigger} from 'react-bootstrap';
import {
    Marker,
    InfoWindow,
  } from "@react-google-maps/api";
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import PopOver from '../PopOver/PopOver';
import './Search.css';

const Suggestions = ({ data, mapRef, selected , setSelected, clearSuggestions, setValue, panFunction, setMarkers}) => {
    const [coordinates, setCoordinates ] = useState([]);
     console.log(coordinates, 'test');
    const [ info, setInfo ] = useState(false)
    const target = useRef(null);
    
    const [ show, setShow ] = useState(true);

    const handleShow = (event) => {
        setShow(!show)
    }
    const handleInfo = () => {

        setInfo(!info);
    }
    const handleLocation = (marker) => {
        
        setMarkers([marker])
        setCoordinates(null)
        panFunction(marker.lat, marker.lng)
    }
    const handleSelect = (id, description) =>{
        setValue(description, false)

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
                    description: description,
                    time: new Date()
                })

                panFunction(lat, lng);
                clearSuggestions(null)
            })
            .catch(error => {
                console.log("error:", error);
            })
            setShow(!show)   
    }

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
            {coordinates?.lat && <Marker
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
                            > 
                            <>
                                <h6>{coordinates.description.slice(0,20)}</h6>
                                <button onClick={(e) => {
                                    e.preventDefault()
                                    handleLocation(coordinates)
                                }} className='btn btn-info'>Create a meet app point</button>  
                            </>
                    </InfoWindow>)}
            </Marker>
          }

        </>
        
        </OverlayTrigger> 
         
     );
}
 
export default Suggestions;