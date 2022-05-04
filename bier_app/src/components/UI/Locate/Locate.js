import useGeolocation from '../../Hooks/useGeolocation';
import './../Search/Search.css';

const Locate = ({ panFunction }) => {
    const location = useGeolocation();

    return ( 
        <button className='locate' onClick={() => panFunction(
            location.coordinates.lat, location.coordinates.lng)}>
            <img src='compass.png' alt="Compass" width='75px' height='75px'/>
        </button>
     );
}
 
export default Locate;