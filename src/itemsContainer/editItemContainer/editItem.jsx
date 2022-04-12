import { useState } from "react"
import {Modal} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../App.css'

const EditItem = (props)=>{
 
    //set state of item to prior values, unless changed
    const [ editItem, setEditItem ] = useState({
        title: props.item.title,
        category: props.item.category,
        details: props.item.details,
        amount: props.item.amount,
        img: props.item.img,
        location: props.item.location,
        available: props.item.available
    })
    
    const inputChange=(e)=>{
        setEditItem({
            ...editItem,
            [e.target.name]: e.target.value
        })
    }
    const submitEdit =(e)=>{
        e.preventDefault();
        props.editItem(props.item.id, editItem)
        window.location.reload()
        
    }
    return(
        <div>
            <form onSubmit={submitEdit}> 
            <label htmlFor="title">Item(s): </label>
                <input onChange={inputChange} type="text" name="title" value={editItem.title}></input>

                <label htmlFor="category">Category: </label>
                <input onChange={inputChange} type="text" name="category" value={editItem.category}></input>

                <label htmlFor="details">Details/Description: </label>
                <input onChange={inputChange} type="text" name="details" value={editItem.details}></input>

                <label htmlFor="amount">Amount </label>
                <input onChange={inputChange} type="number" name="amount" value={editItem.amount}></input>

                {/* <label htmlFor="img">Photo </label>
                <input onChange={(e)=>props.setImage(e.target.files[0])} type="file" name="img" id="item-pic"accept="image/png, image/jpeg" placeholder='upload image'></input> */}

                <label htmlFor="location">Location: </label>
                <input onChange={inputChange} type="text" name="location" value={editItem.location}></input>
                <div>
                    <label htmlFor="available">Available </label>
                    <input onChange={inputChange} type="radio" name="available" value={editItem.available}></input>

                    <label htmlFor="available">Not Available </label>
                    <input onChange={inputChange} type="radio" name="available" value={!editItem.available}></input>
                </div>
                <button onClick ={props.toggleEdit}type="submit">Save Changes</button>
            </form>
        </div>
    )
}
export default EditItem