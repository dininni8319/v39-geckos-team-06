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

    const url = `https://trueway-places.p.rapidapi.com/FindPlacesNearby/`

    useEffect(() => {
       fetch(`${url}`, {
            method: 'GET',
            params: {location: `${local.loaded ? local.lat : null},${local.loaded ? local.lng : null}`, type: 'cafe', radius: '150', language: 'en'},
            headers: {
            'X-RapidAPI-Host': 'trueway-places.p.rapidapi.com',
            'X-RapidAPI-Key': `${api_near_by_key}`
            }
      })
        .then(resp => console.log(resp))
        .then(data => console.log(data, 'testing'))
    }, [])

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