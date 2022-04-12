import {useState} from 'react'
import '../../App.css'

const NewItem = (props) =>{
//     const [newItem, setNewItem] = useState({
//         title:'',
//         category:'',
//         details:'',
//         amount:0,
//         img:'https://i.imgur.com/3cHAFsx.jpg',
//         location:'',
//         available:true
//     })
//     const inputChange=(e)=>{
//         setNewItem({
//             ...newItem,
//             [e.target.name]:e.target.value
//         })
//     }
//     const imageChange=(e)=>{
//         setNewItem({
//             ...newItem, 
//             img: e.target.files[0]
//         })
//     }
//     const submitNew = async(e)=>{
//         e.preventDefault()
//         let form_data = new FormData();
//         form_data.append('img', newItem.img)
//         form_data.append('title', newItem.title)
//         form_data.append('category', newItem.category)
//         form_data.append('details', newItem.details)
//         form_data.append('amount', newItem.amount)
//         form_data.append('location', newItem.location)
//         form_data.append('available', newItem.available)
//         props.createNew(newItem)
//     }
    return(
        <div id="create-form">
            <form onSubmit={props.submitNew} encType="multipart/form">
                <div>
                    <label htmlFor="title">Item(s): </label>
                    <input onChange={props.inputChange} type="text" name="title" value={props.newItem.title}></input>
                </div>
                <div>
                    <label htmlFor="category">Category: </label>
                    <input onChange={props.inputChange} type="text" name="category" value={props.newItem.category}></input>
                </div>
                 
               <div>
                    <label htmlFor="amount">Amount: </label>
                    <input onChange={props.inputChange} type="number" name="amount" value={props.newItem.amount}></input>
               </div>
               
                <div>
                    <label htmlFor="img">Photo: </label>
                    <input onChange={props.imageChange} type="file" name="img" id="item-pic"accept="image/png, image/jpeg" placeholder='upload image'></input>
                </div>
                
                <div>
                    <label htmlFor="location">Location: </label>
                    <input onChange={props.inputChange} type="text" name="location" value={props.newItem.location}></input>
                </div>
                <div id="details">   
                    <label htmlFor="details">Details/Description: </label>
                    <input onChange={props.inputChange} type="text" name="details" value={props.newItem.details}></input>
                </div>
               
                <div id="radio">
                    <label htmlFor="available">Available </label>
                    <input onChange={props.inputChange} type="radio" name="available" value={props.newItem.available}></input>

                    <label htmlFor="available">Not Available </label>
                    <input onChange={props.inputChange} type="radio" name="available" value={!props.newItem.available}></input>
                </div>

               <button id="create-submit"  type="submit">Add Item</button>

            </form>
        </div>
    )
}

export default NewItem