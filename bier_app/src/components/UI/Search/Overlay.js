import { set } from 'date-fns';
import { useCallback, useRef, useState } from 'react';
import { Overlay, OverlayTrigger} from 'react-bootstrap';
import { getGeocode, getLatLng, usePlacesAutocomplete, clearSuggestions,  } from 'use-places-autocomplete';
import PopOver from '../PopOver/PopOver';
import './Search.css';

const Suggestions = ({ data, mapRef, clearSuggestions}) => {
    const [ selected, setSelected ] = useState([]);
    const target = useRef(null);
    
    const [ show, setShow ] = useState(true);

    const handleShow = (event) => {
        setShow(!show)
    }

    const handleSelect = (id, description) =>{
        let searched = data.filter(el => el.place_id  === id)
        setSelected(searched)
        getGeocode({ address: description })
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) => {
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
        mapRef.current.setZoom(14)
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
            <PopOver 
                data={data}
                handleSelect={handleSelect}
                handleShow={handleShow}
                target={target}
            />   
        </OverlayTrigger>  
     );
}
 
export default Suggestions;