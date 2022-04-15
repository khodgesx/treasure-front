import {useParams, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import { Modal } from 'react-bootstrap'

const EditItemRoute = (props)=>{
    let navigate = useNavigate()

    const backToShowPage = ()=>{
        navigate(`/items/${id}`)
    }
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
                image:'',
                location:'', 
                available:true
    })
    const [editItem, setEditItem] = useState({
        title: item.title,
        category: item.category,
        details: item.details,
        amount: item.amount,
        image: item.image,
        location: item.location,
        available: item.available
    })
 
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
            image: e.target.files[0]
        })
    }
    const submitEdit = async(e)=>{
        e.preventDefault()
        let form_data = new FormData();
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
            const edited = res.data
            const newArray = props.items.map(item => item.id === id ? {...editItem, edited} : item)
                props.setItems(newArray)
                navigate (`/items/${id}`)
        })
        .catch(err => console.log(err))
       
    }

    const editImage = async(editItem) =>{
        try {
            if(editItem.image){
                const data = new FormData()
                data.append('file', editItem.image)
                data.append('upload_preset', 'treasure')
                console.log(editItem.image)
                const imageUpload = await axios.post('https://api.cloudinary.com/v1_1/dmc4kghoi/image/upload', data)
                console.log(imageUpload.data.url)
                editItem.image = await imageUpload.data.url
            }else{
                editItem.image = 'https://i.imgur.com/3cHAFsx.jpg'
            }
            console.log(editItem)
            let form_data = new FormData();
            form_data.append('image', editItem.image)
            form_data.append('title', editItem.title)
            form_data.append('category', editItem.category)
            form_data.append('details', editItem.details)
            form_data.append('amount', editItem.amount)
            form_data.append('location', editItem.location)
            form_data.append('available', editItem.available)
            const editImage = await axios.put(`${apiUrl}/api/items/${id}`, form_data,{
                
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            })
            console.log(editImage)
            
        } catch (err) {
            console.log(err)
        }
        const newArray = props.items.map(item => item.id === id ? {editItem} : item)
        props.setItems(newArray)
        navigate(`/items/update/${id}`)
        
    }
    const submitImage = async(e)=>{
        e.preventDefault()
        editImage(editItem) 
    }
  
    return(
        <div>
            <div>
                <h1 id="edit-title">{editItem.title}</h1>
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
                        <label htmlFor="location">Location: </label>
                        <input onChange={inputChange} type="text" name="location" value={editItem.location}></input>
                    </div>
                    <div>
                        <label htmlFor="available">Available: </label>
                        <input onChange={inputChange} type="radio" name="available" value={editItem.available}></input>
     
                        <label htmlFor="available">Not Available: </label>
                        <input onChange={inputChange} type="radio" name="available" value={!editItem.available}></input>
                    </div>
                        <div id="save-edits">
                            <button  type="submit">Save Changes</button>
                        </div>
                      
                  </form>
                  
                  <div id="photo-back-buttons">
                    <button id="change-photo" onClick={setShow}>Change Photo</button>
                    <button onClick={backToShowPage}>Back</button>
                  </div>
                  
                  <Modal id="photo-modal"show={show} onHide={toggleShow}>
                          <Modal.Header id="modal-header" closeButton><Modal.Title id="photo-modal">New Photo:</Modal.Title></Modal.Header>
                          
                          <form id="photo-form"onSubmit={submitImage} encType="multipart/form">
                          <div id="edit-photo">
                        <label htmlFor="image"> </label>
                         <input onChange={imageChange} type="file" name="image" id="item-pic"accept="image/png, image/jpeg" placeholder='upload image'></input>
                    </div>
                    <div id="submit-photo">
                        <button type="submit"onClick={toggleShow}>Submit</button>
                    </div>

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

