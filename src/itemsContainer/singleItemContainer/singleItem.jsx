import {useState, useEffect} from 'react'
// import './App.css'
import {Link, useParams, useLocation} from 'react-router-dom'
import {Modal} from 'react-bootstrap'
import Items from '../items'
import EditItem from '../editItemContainer/editItem'

// const SingleItem = (props)=>{
const SingleItem = (props)=>{
    const [show, setShow] = useState(false)
    const toggleShow =()=>setShow(!show)

    const [editShow, setEditShow] = useState(false)
    const toggleEdit =()=>setEditShow(!editShow)
        // console.log(props.match.params.id)
    // useEffect(()=>{
    //     // getItem();
    // }, [])
    // const [item, setItem] = useState({})
    // const getItem = async()=>{
    //     const getItem = await fetch(`http://localhost:8000/api/items/1`)
    //     //I need to get the correct id in the route from clicking on the Link
    //     //in the items page
    //     const parsedItem = await getItem.json()
    //     setItem(parsedItem)
    //     console.log(parsedItem)
    // }
    // getItem()

    
    return(
        
        <div id="single-item">
            <div id="single-title">
                <h2>{props.item.title}</h2>
                {/* <button onClick={setShow}>Click to see more</button> */}
                <h3>Click photo to see more</h3>
            </div>
            <img id="item-img"onClick={setShow}src='https://i.imgur.com/3cHAFsx.jpg'></img>

            <Modal show={show} onHide={toggleShow}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.item.title}</Modal.Title>
                </Modal.Header>
                <div>
                    <h3>Category: {props.item.category}</h3>
                    <h3>Amount: {props.item.amount}</h3>
                    <h3>Details/Description: {props.item.details}</h3>
                    <h3>Location: {props.item.location}</h3>
                    <h3>Available: { props.item.available === true ? 'Yes' :'No' }</h3>
                </div>
            </Modal>
            <div id="buttons">
                <button id="edit-button" onClick={toggleEdit}>Edit</button>
                <button id="delete"onClick={()=>{props.deleteItem(props.item.id)}}>Delete</button>
            </div>
            

            <Modal show={editShow} onHide={toggleEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditItem toggleEdit={toggleEdit} item={props.item}editItem={props.editItem}></EditItem>
                </Modal.Body>
            </Modal>

           

        </div>
    )
}


export default SingleItem