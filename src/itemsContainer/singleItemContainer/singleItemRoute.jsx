import {useParams, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import apiUrl from '../../apiConfig'
import '../../App.css'

const SingleItemRoute = (props)=>{
    useEffect(() =>{
        getItem();
    }, [])
    const [item, setItem] = useState({})
  
    let id = useParams()
    
    const getItem = async()=>{
        const getApiResponse = await fetch(`${apiUrl}/api/items/${id.id}`)
        const parsedGet = await getApiResponse.json()
        setItem(parsedGet)
        // console.log(parsedGet)
    }


 
   
    return(
        <div id="item-show">
            <h1>{item.title}</h1>
            <img src={item.img}></img>
            <div id="item-details">
                <h3>Category: {item.category}</h3>
                <h3>Amount: {item.amount}</h3>
                <h3>Details/Description: {item.details}</h3>
                <h3>Location: {item.location}</h3>
                <h3>Available: { item.available === true ? 'Yes' :'No' }</h3>
            </div>
            <div>
            <h1 key={`item-${item.id}`}>
               <Link to={`/items/update/${item.id}`}>Edit {item.title}</Link>
             </h1>
             <button onClick={props.deleteItem}>Delete</button>
    
            </div>
            
        </div>
    )
}

export default SingleItemRoute