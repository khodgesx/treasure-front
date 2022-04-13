import {useParams, Link, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import apiUrl from '../../apiConfig'
import '../../App.css'

const SingleItemRoute = (props)=>{
   
    useEffect(() =>{
        getItem();
    }, [])
    let navigate = useNavigate()

    const [item, setItem] = useState({})
  
    const params = useParams()
    const id = params.id
    
    const getItem = async()=>{
        const getApiResponse = await fetch(`${apiUrl}/api/items/${id}`)
        const parsedGet = await getApiResponse.json()
        setItem(parsedGet)
    }
   
    const deleteItem = async()=>{
        console.log('1st',id)
        try{
            console.log(id)
            const deleteResponse = await fetch(`http://localhost:8000/api/items/${id}`,{
                method:"DELETE"
            })
            console.log('2nd',id)
                const newList = props.items.filter((item)=>item.id !==id)
                props.setItems(newList)
                if(deleteResponse.status === 204){
                    navigate ("/")
                } 
                
        }catch(err){
            console.log(err)
        }
    }
   
    


 
   
    return(
        <div id="item-show">
            <h1 id="item-title">{item.title}</h1>
            <img src={item.img}></img>
            <div id="item-details">
                <h3><u>Category:</u> {item.category}</h3>
                <h3><u>Amount:</u> {item.amount}</h3>
                <h3><u>Description:</u> {item.details}</h3>
                <h3><u>Location:</u> {item.location}</h3>
                <h3><u>Available:</u> { item.available === true ? 'Yes' :'No' }</h3>
            </div>
            <div>
            <h1 key={`item-${item.id}`}>
               <Link id="edit-link"to={`/items/update/${item.id}`}>Edit {item.title}</Link>
             </h1>
             <div id="delete-div">
                <button id="delete-button"onClick={deleteItem}>Delete</button>
             </div>
             
    
            </div>
            
        </div>
    )
}

export default SingleItemRoute