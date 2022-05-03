import mapStyles from '../../../mapStyles';

export const api_key = process.env.REACT_APP_API_GOOGLE_MAPS_API_KEY;

export const libraries = ['places'];

export const mapContainerStyle = {
    width: '80vw',
    height: '100vh',
    borderRadius: '5px',
}

export const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControll: true,
  }