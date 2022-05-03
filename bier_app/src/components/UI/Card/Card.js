
const Card = ({selected}) => {
    
    return ( 
        <section className="container-fluid">
            <div className='row p-1'>
                <div className='card p-2 shadow'>
                    <h5>Searched Recent Location</h5>
                    <p>{selected.description}</p>
                </div>
            </div>
        </section>
     );
}
 
export default Card;