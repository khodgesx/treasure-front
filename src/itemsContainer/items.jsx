import '../App.css'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, Modal} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from 'react-router-dom'
import NewItem from './newItemContainer/newItem'
import apiUrl from '../apiConfig'

const Items =(props)=>{
    useEffect(() =>{
        getItems();
    }, [])
    

    const [showing, setShowing] = useState(false)
    const toggleShow =()=>setShowing(!showing)

    const getItems = async()=>{
        const getApiResponse = await fetch(`${apiUrl}/api/items`)
        const parsedGet = await getApiResponse.json()
        props.setItems(parsedGet)
    }

    const [image, setImage] = useState()

    const [newItem, setNewItem] = useState({
        title:'',
        category:'',
        details:'',
        amount:0,
        img:'',
        location:'',
        available:true
    })
    const inputChange=(e)=>{
        setNewItem({
            ...newItem,
            [e.target.name]:e.target.value
        })
    }
    const imageChange=(e)=>{
            setNewItem({
                ...newItem, 
                img: e.target.files[0]
            })
       
        
    }
    const submitNew = async(e)=>{
        e.preventDefault()
        
        let form_data = new FormData();
        form_data.append('img', newItem.img)
        form_data.append('title', newItem.title)
        form_data.append('category', newItem.category)
        form_data.append('details', newItem.details)
        form_data.append('amount', newItem.amount)
        form_data.append('location', newItem.location)
        form_data.append('available', newItem.available)
        let url = `${apiUrl}/api/items/`;
        axios.post(url, form_data, {
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        .then(res=>{
            const newArray = [res.data, ...props.items]
            props.setItems(newArray)
        })
        .catch(err => console.log(err))
        toggleShow()
        setNewItem(({
            title:'',
            category:'',
            details:'',
            amount:0,
            img:'',
            location:'',
            available:true
        }))
        
 
    }
   
  

return( 
    <div id="items-div">
        <button id="add" onClick={setShowing}>Add Trashure</button>
        <Modal show={showing} onHide={toggleShow}>
            <Modal.Header closeButton>
                <Modal.Title>Add details about your item(s) here:</Modal.Title>
            </Modal.Header>
            <div>
                <NewItem image={image} setImage={setImage} 
                newItem={newItem}inputChange={inputChange}imageChange={imageChange}submitNew={submitNew}></NewItem>
            </div>
        </Modal>
        { props.items.map((item)=>{
            return(
                <div id="item-map" key={`item-${item.id}`}>
                    <div>
                        <h1 key={`item-${item.id}`}>
                        <Link to={`/items/${item.id}`}>{item.title} ({item.category})</Link>
                        
                        </h1>
                        <Link to={`/items/${item.id}`}><img id="map-img"src={item.img}></img></Link>
                        <p>Location: {item.location}</p>
                     </div>
              </div>
            
            )
        })}
    </div>
)

}

export default Items