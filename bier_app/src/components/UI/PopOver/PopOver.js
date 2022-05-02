import { Popover } from 'react-bootstrap';

const PopOver = ( { data, handleSelect, handleShow, target }) => {
   
    return ( 
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
                    {data?.map(({id, description, place_id }) => 
                        <option 
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
                        </option>
    
                    )}
            </section>
        </Popover>
     );
}
 
export default PopOver;