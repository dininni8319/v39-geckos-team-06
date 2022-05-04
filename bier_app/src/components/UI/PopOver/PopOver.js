import { Popover } from 'react-bootstrap';
import './../Search/Search.css';

const PopOver = ( { data, handleSelect, handleShow, target }) => {
   
    return ( 
        <Popover id={`Popover-positioned-bottom`}
            className='tooltip.top tooltip-arrow'
            style={
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
                    {data?.map(({id, description, place_id }) => 
                        <Popover.Body 
                                ref={target}
                                onClick={() => {
                                    handleSelect(place_id, description)
                                }}
                                key={id}     
                                value={description}
                                style={{
                                  paddingTop: '10px',
                                }}
                        >
                          {description.slice(0,50)}
                        </Popover.Body>
    
                    )}
            </section>
        </Popover>
     );
}
 
export default PopOver;