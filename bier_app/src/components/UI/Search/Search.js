import { useState, useEffect } from 'react';
import usePlacesAutocomplete from "use-places-autocomplete";
import './Search.css';
import Suggestions from './Suggestions';
import Card from './../Card/Card';
import useGeolocation from '../../Hooks/useGeolocation';
import { api_key, api_near_by_key } from '../Map/utilities';

const Search = ({ mapRef }) => {
    const [ selected, setSelected ] = useState([]);
     
    const local = useGeolocation();
    
    const handleRemoveCard = (id) => {
        let removed = selected.filter(el => el.place_id !== id)
        setSelected(removed)
    }
     
    const {
        ready, 
        value, 
        suggestions: { status, data },
        setValue, //function to set the value
        clearSuggestions, 
    } = usePlacesAutocomplete({
        requestOptions: {
            location: {lat:() => local.coordinates.lat, lng: () => local.coordinates.lng },
            radius: 50000,
            types: ['restaurant', 'bar', 'cafe']
        }
    });

    const request = {
        placeId: selected.place_id,
        fields: ['name', "formatted_address", "place_id", "geometry"]
    };
    
    return (
        <section className="search">
            <section>
                <input 
                    className='mb-5 outline-none input-search'
                    value={value} 
                    onChange={(e) => {
                      setValue(e.target.value)
                    }}
                    disabled={!ready}
                    placeholder="Search for a Place"
                />
                <Suggestions 
                    data={data}
                    mapRef={mapRef}
                    clearSuggestions={clearSuggestions}
                    selected={selected}
                    setSelected={setSelected}
                />
                
            </section>
            <section className='card-section col-12'>
                <div>
                    {
                        selected?.map((item, id) => <Card 
                            selected={item} 
                            key={id}
                            handleRemoveCard={handleRemoveCard}
                        />) 
                    }
                </div>
            </section>
        </section>
    );
}

export default Search;