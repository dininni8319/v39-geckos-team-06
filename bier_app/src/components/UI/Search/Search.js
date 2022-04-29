import usePlacesAutocomplete from "use-places-autocomplete";
import './Search.css';

const Search = (props) => {

    const {
        ready, 
        value, 
        suggestions: { status, data },
        setValue, //function to set the value
        clearSuggestions, 
    } = usePlacesAutocomplete({
        requestOptions: {
            location: {lat:() => 40.7128, lng: () => -74.0060},
            radius: 200 * 1000,
        }
    });

    return (
        <section className="search">
            <section onSelect={(address) => {
                console.log(address)
                }}
            >
                <input value={value} onChange={(e) => {
                    setValue(e.target.value)
                    }}
                    disabled={!ready}
                    placeholder="Search for a Place"
                />
            </section>
        </section>
    );
}

export default Search;