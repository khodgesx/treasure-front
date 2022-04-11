import {useState, useEffect} from 'react'
// import './App.css'
import {Link, useParams, useLocation} from 'react-router-dom'
import { ReactDOM } from 'react-dom'

// const SingleItem = (props)=>{
const SingleItem = (props)=>{
        console.log(props.match.params.id)
    useEffect(()=>{
        // getItem();
    }, [])
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
            <h2>item page</h2>
            {/* <h2>{item.title}</h2> */}
            {/* <h3>{props.item.title}</h3> */}
            {/* <img src={value.img} />  */}
            {/* <h4>{props.item.category}</h4>
            <h4>{props.item.details}</h4>
            <h4>{props.item.amount}</h4>
            <h4>{props.item.location}</h4>
            <h4>{props.item.available}</h4> */}

        </div>
    )
}


export default SingleItem