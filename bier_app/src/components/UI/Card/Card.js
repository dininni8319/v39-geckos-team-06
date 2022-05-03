
const Card = ({selected, handleRemoveCard}) => {
    
    return ( 
        <section className="container-fluid">
            <div className='row p-1'>
                <div className='card p-2 shadow'>
                    <h5>Searched Recent Location</h5>
                    <p>{selected.description}</p>
                    <button className='btn btn-warning' onClick={() => handleRemoveCard(selected.place_id)}>Remove</button>
                </div>
            </div>
        </section>
     );
}
 
export default Card;