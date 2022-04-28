import { createContext } from 'react';

const MapContext = createContext();

export function MapProvider(props) {

    return (
        <MapContext.Provider>
            {props.children}
        </MapContext.Provider>
    );
}