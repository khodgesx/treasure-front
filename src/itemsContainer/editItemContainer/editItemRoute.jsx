import {useParams, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import { Modal } from 'react-bootstrap'

const EditItemRoute = (props)=>{
    let navigate = useNavigate()
    //params grabs the id from the url - react router
    const params = useParams()
    const id = params.id

    useEffect(() =>{
        getItem();
    }, [])
    const [show, setShow] = useState(false)
    const toggleShow=()=>setShow(!show)

    const [item, setItem] = useState({
                id:null,
                title:'',
                category:'',
                details:'',
                amount:0, 
                img:'',
                location:'', 
                available:true
    })
    const [editItem, setEditItem] = useState({
        title: item.title,
        category: item.category,
        details: item.details,
        amount: item.amount,
        img: item.img,
        location: item.location,
        available: item.available
    })
    // console.log(editItem)
    const getItem = async()=>{
        const getApiResponse = await fetch(`${apiUrl}/api/items/${id}`)
        const parsedGet = await getApiResponse.json()
        setEditItem(parsedGet)
    }

    const inputChange=(e)=>{
        setEditItem({
            ...editItem,
            [e.target.name]:e.target.value
        })
    }
    const imageChange=(e)=>{
        setEditItem({
            ...editItem, 
            img: e.target.files[0]
        })
    }
    const submitEdit = async(e)=>{
        e.preventDefault()
        let form_data = new FormData();
        // form_data.append('img', editItem.img)
        form_data.append('title', editItem.title)
        form_data.append('category', editItem.category)
        form_data.append('details', editItem.details)
        form_data.append('amount', editItem.amount)
        form_data.append('location', editItem.location)
        form_data.append('available', editItem.available)
        let url = `${apiUrl}/api/items/${id}`;
        axios.put(url, form_data, {
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        
        .then(res=>{
            // console.log(res.data)
            const edited = res.data
            const newArray = props.items.map(item => item.id === id ? {...editItem, edited} : item)
                props.setItems(newArray)
                navigate (`/items/${id}`)
        })
        .catch(err => console.log(err))
       
    }
    const submitImage = async(e)=>{
        e.preventDefault()
        let form_data = new FormData();
        form_data.append('img', editItem.img)
        form_data.append('title', editItem.title)
        form_data.append('category', editItem.category)
        form_data.append('details', editItem.details)
        form_data.append('amount', editItem.amount)
        form_data.append('location', editItem.location)
        form_data.append('available', editItem.available)
        let url = `${apiUrl}/api/items/${id}`;
        axios.put(url, form_data, {
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        
        .then(res=>{
            console.log(res.data)
            const edited = res.data
            const newArray = props.items.map(item => item.id === id ? {...editItem, edited} : item)
                props.setItems(newArray)
                navigate (`/items/update/${id}`)
        })
        .catch(err => console.log(err))
       
    }
  
    return(
        <div>
            <div>
                <h1 id="edit-title">edit <strong>{editItem.title}</strong> here:</h1>
            </div>
             <div id="edit-form">
              <form onSubmit={submitEdit} encType="multipart/form"> 
                    <div>
                        <label htmlFor="title">Item(s): </label>
                        <input onChange={inputChange} type="text" name="title" value={editItem.title}></input>
                    </div>
                    <div>
                        <label htmlFor="category">Category: </label>
                        <input onChange={inputChange} type="text" name="category" value={editItem.category}></input>
                    </div>
                    <div id="edit-details">
                        <label htmlFor="details">Description: </label>
                        <input onChange={inputChange} type="text" name="details" value={editItem.details}></input>
                    </div>    
                    <div>
                        <label htmlFor="amount">Amount: </label>
                        <input onChange={inputChange} type="number" name="amount" value={editItem.amount}></input>
                    </div>
                    <div>
                        {/* <label htmlFor="img">Photo </label>
                         <input onChange={imageChange} type="file" name="img" id="item-pic"accept="image/png, image/jpeg" placeholder='upload image'></input> */}
                    </div>
                    <div>
                        <label htmlFor="location">Location: </label>
                        <input onChange={inputChange} type="text" name="location" value={editItem.location}></input>
                    </div>
                    <div>
                        <label htmlFor="available">Available: </label>
                        <input onChange={inputChange} type="radio" name="available" value={editItem.available}></input>
     
                        <label htmlFor="available">Not Available: </label>
                        <input onChange={inputChange} type="radio" name="available" value={!editItem.available}></input>
                    </div>

                      <button type="submit">Save Changes</button>
                  </form>

                  <button onClick={setShow}>Change Photo</button>
                  <Modal show={show} onHide={toggleShow}>
                          <Modal.Header closeButton><Modal.Title>Edit Image</Modal.Title></Modal.Header>
                          
                          <form onSubmit={submitImage} encType="multipart/form">
                          <div>
                        <label htmlFor="img">Photo </label>
                         <input onChange={imageChange} type="file" name="img" id="item-pic"accept="image/png, image/jpeg" placeholder='upload image'></input>
                    </div>
                    <button type="submit"onClick={toggleShow}>Submit</button>


                    <div id="hidden">
                         
                        <label htmlFor="title">Item(s): </label>
                        <input onChange={inputChange} type="hidden" name="title" value={editItem.title}></input>
                    
                        <label htmlFor="category">Category: </label>
                        <input onChange={inputChange} type="hidden" name="category" value={editItem.category}></input>
                   
                   
                        <label htmlFor="details">Description: </label>
                        <input onChange={inputChange} type="hidden" name="details" value={editItem.details}></input>
                       
                
                        <label htmlFor="amount">Amount: </label>
                        <input onChange={inputChange} type="hidden" name="amount" value={editItem.amount}></input>
                 
                    
                    
                        <label htmlFor="location">Location: </label>
                        <input onChange={inputChange} type="hidden" name="location" value={editItem.location}></input>
                   
                        <label htmlFor="available">Available: </label>
                        <input onChange={inputChange} type="hidden" name="available" value={editItem.available}></input>
     
                        <label htmlFor="available">Not Available: </label>
                        <input onChange={inputChange} type="hidden" name="available" value={!editItem.available}></input>
                    </div>
                                
                                

                          </form>
                          
                      </Modal>
             </div>
             </div>
    )
}

export default EditItemRoute

