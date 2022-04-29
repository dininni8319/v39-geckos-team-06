import { useState } from 'react';
import { OverlayTrigger, Popover} from 'react-bootstrap';
import './Search.css';

const Overlay = ({ data }) => {
    const [ selected, setSelected ] = useState([]);
    const [ show, setShow ] = useState(false);
    console.log(selected);
    
    // const Close = () => {
    //     setShow(!show)
    // }

    return ( 
        <OverlayTrigger
            placement='bottom-end'
            show={show}
            overlay={
                <></>
            }
        >
            <Popover id={`Popover-positioned-bottom`} style={
                {
                    position: 'absolute',
                    marginTop: '56px',
                }
            }>

                <section
                    style={{
                        width: '25rem',
                        backgroundColor: 'white',
                    }}
                    >
                        { data?.map(({id, description}) => 
                            <option 
                                    onClick={() => setSelected(description)}
                                    key={id}     
                                    value={description}
                                    style={{
                                      paddingTop: '10px',
                                    }}
                            >
                              {description.slice(0,50)}
                            </option>
        
                        )}
                </section>
            </Popover>
        </OverlayTrigger>  
     );
}
 
export default Overlay;