import '../App.css'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Button, Modal} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from 'react-router-dom'
import SingleItem from './singleItemContainer/singleItem'
import NewItem from './newItemContainer/newItem'
import apiUrl from '../apiConfig'

const Items =()=>{
    useEffect(() =>{
        getItems();
    }, [])
    const [items, setItems] = useState([])
    const [showing, setShowing] = useState(false)
    const toggleShow =()=>setShowing(!showing)

    const getItems = async()=>{
        const getApiResponse = await fetch(`${apiUrl}/api/items`)
        const parsedGet = await getApiResponse.json()
        setItems(parsedGet)
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
                console.log(res.data)
            })
            .catch(err => console.log(err))
            toggleShow()
            window.location.reload()
            
        }
    // const createNew = async (newItem)=>{
    //     try{
    //         // if(image){
    //         //     const data = new FormData()
    //         //     data.append('file', image)
    //         //     data.append('upload_preset', 'items')

    //         //     const imgUpload = await fetch('https://api.cloudinary.com/v1_1/dmc4kghoi/image/upload', {
    //         //         method: "POST",
    //         //         body: data
    //         //     })
    //         //     const parsedImg = await imgUpload.json()
    //         //     newItem.img = await parsedImg.url
    //         // }else{
    //         //     newItem.img = 'https://i.imgur.com/3cHAFsx.jpg'
    //         // }
    //         const createResponse = await fetch(`${apiUrl}/api/items/`, {
    //             method: "POST",
    //             body: JSON.stringify(newItem),
    //             headers:{
    //                 "Content-Type": "application/json",
    //                 "Accept":"application/json"
    //             }
    //         })
    //         console.log(createResponse)
    //         console.log('new item:', newItem)
    //         const parsedCreate = await createResponse.json()
    //         console.log('parsed response', parsedCreate)
            
    //         if(parsedCreate.status === 200){
    //             console.log(parsedCreate)
    //         }
            
    //     }catch(err){
    //         console.log(err)
    //     }
    //     window.location.reload()
    // }

    const editItem = async(idToEdit, itemToEdit)=>{
        try{
            const editResponse = await fetch(`http://localhost:8000/api/items/${idToEdit}`,{
                method:"PUT",
                body:JSON.stringify(itemToEdit),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const parsedEdit = await editResponse.json()
            
            if(parsedEdit.status === 204){
                const newArray = items.map(item => item.id === idToEdit ? {...item, itemToEdit} : item)
                setItems(newArray)
            }
        }catch(err){
            console.log(err)
        }
    }
    const deleteItem = async(idToDelete)=>{
        try{
            const deleteResponse = await fetch(`http://localhost:8000/api/items/${idToDelete}`,{
                method:"DELETE"
            })
            console.log(idToDelete)
            const parsedDelete = await deleteResponse.json()
            console.log(parsedDelete)
            if(parsedDelete.status === 204){
                const newArray = items.filter((item)=>item.id !==idToDelete)
                setItems(newArray)
            }
        }catch(err){
            console.log(err)
        }
        window.location.reload()
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
        { items.map((item)=>{
            return(
                <div id="item-map" key={`item-${item.id}`}>

              <SingleItem deleteItem={deleteItem}editItem={editItem} item={item}></SingleItem>
              
              </div>
            // <h1 key={`item-${item.id}`}>
            //     <Link to={`/items/${item.id}`}>{item.title}</Link>
            // </h1>
            )
        })}
    </div>
)

}

export default Items