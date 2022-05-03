import React from 'react';
import usePlacesAutocomplete from "use-places-autocomplete";
import './Search.css';
import Suggestions from './Overlay';
import useGeolocation from '../../Hooks/useGeolocation';
const Search = ({ mapRef }) => {
    const local = useGeolocation();

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
            types: ['restaurant', 'bar', 'cafe', ]
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
                />
            </section>
        </section>
    );
}

export default Search;