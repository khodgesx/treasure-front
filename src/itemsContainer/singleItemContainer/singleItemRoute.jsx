import {useParams, Link, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {Modal} from 'react-bootstrap'
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

    const [show, setShow] = useState(false)
    const toggleShow=()=>setShow(!show)

    const [showDelete, setShowDelete] = useState(false)
    const toggleShowDelete=()=>setShowDelete(!showDelete)
    
    const getItem = async()=>{
        const getApiResponse = await fetch(`${apiUrl}/api/items/${id}`)
        const parsedGet = await getApiResponse.json()
        setItem(parsedGet)
    }
   
    const deleteItem = async()=>{
       
        try{
            console.log(id)
            const deleteResponse = await fetch(`${apiUrl}/api/items/${id}`,{
                method:"DELETE"
            })
                const newList = props.items.filter((item)=>item.id !==id)
                props.setItems(newList)
                if(deleteResponse.status === 204){
                    navigate ("/items")
                } 
                
        }catch(err){
            console.log(err)
        }
    }
   
    return(
        <div id="item-show">
            <h1 id="item-title">{item.title}</h1>
            <img id="img-show" onClick={toggleShow}src={item.img}></img>
            <h1 key={`item-${item.id}`}>
               <Link id="edit-link"to={`/items/update/${item.id}`}>Edit Details</Link>
             </h1>
            <Modal show={show} onHide={toggleShow}>
                <Modal.Header closeButton><Modal.Title>{item.title}</Modal.Title></Modal.Header>
                <img id="modal-img"src={item.img}></img>
            </Modal>
            <div id="item-details">
                <h3><u>Category:</u> {item.category}</h3>
                <h3><u>Amount:</u> {item.amount}</h3>
                <h3><u>Description:</u> {item.details}</h3>
                <h3><u>Location:</u> {item.location}</h3>
                <h3><u>Available:</u> { item.available === true ? 'Yes' :'No' }</h3>
            </div>
            <div>
            
             <div id="delete-div">
                <button onClick={toggleShowDelete}id="delete-button">Delete</button>
            </div>
                 <div id="delete-modal">
                     <Modal  show={showDelete} onHide={toggleShowDelete}>
                        <Modal.Header closeButton></Modal.Header>
                        <h2 id="confirm">Are you sure you want to delete?</h2>
                        
                        <button id="oops"onClick={toggleShowDelete}>Oops, don't delete!</button>
                        <button id="confirm-delete"onClick={deleteItem}>Yes, delete!</button>
                    </Modal>
                
                 </div>
        
             
    
            </div>
            
        </div>
    )
}

export default SingleItemRoute