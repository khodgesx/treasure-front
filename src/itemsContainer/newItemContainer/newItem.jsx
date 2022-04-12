import {useState} from 'react'
import '../../App.css'

const NewItem = (props) =>{
    const [newItem, setNewItem] = useState({
        title:'',
        category:'',
        details:'',
        amount:0,
        img:'https://i.imgur.com/3cHAFsx.jpg',
        location:'',
        available:true
    })
    const inputChange=(e)=>{
        setNewItem({
            ...newItem,
            [e.target.name]:e.target.value
        })
    }
    const submitNew = async(e)=>{
        e.preventDefault()
        props.createNew(newItem)
    }
    return(
        <div id="create-form">
            <form onSubmit={submitNew} encType="multipart/form">
                <label htmlFor="title">Item(s): </label>
                <input onChange={inputChange} type="text" name="title" value={newItem.title}></input>

                <label htmlFor="category">Category: </label>
                <input onChange={inputChange} type="text" name="category" value={newItem.category}></input>

                <label htmlFor="details">Details/Description: </label>
                <input onChange={inputChange} type="text" name="details" value={newItem.details}></input>

                <label htmlFor="amount">Amount </label>
                <input onChange={inputChange} type="number" name="amount" value={newItem.amount}></input>

                {/* <label htmlFor="img">Photo </label>
                <input onChange={(e)=>props.setImage(e.target.files[0])} type="file" name="img" id="item-pic"accept="image/png, image/jpeg" placeholder='upload image'></input> */}

                <label htmlFor="location">Location: </label>
                <input onChange={inputChange} type="text" name="location" value={newItem.location}></input>
                <div>
                    <label htmlFor="available">Available </label>
                    <input onChange={inputChange} type="radio" name="available" value={newItem.available}></input>

                    <label htmlFor="available">Not Available </label>
                    <input onChange={inputChange} type="radio" name="available" value={!newItem.available}></input>
                </div>

               <button id="create-submit" onClick={props.toggleShow} type="submit">Add Item</button>

            </form>
        </div>
    )
}

export default NewItem