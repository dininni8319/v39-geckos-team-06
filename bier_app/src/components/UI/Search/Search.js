import React from 'react';
import usePlacesAutocomplete from "use-places-autocomplete";
import './Search.css';
import Suggestions from './Overlay';

const Search = ({ mapRef }) => {

    const {
        ready, 
        value, 
        suggestions: { status, data },
        setValue, //function to set the value
        clearSuggestions, 
    } = usePlacesAutocomplete({
        requestOptions: {
            location: {lat:() => 40.7128, lng: () => -74.0060},
            radius: 2 * 50,
        }
    });

    return (
        <section className="search">
            <section>
                <input 
                    className='mb-5'
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