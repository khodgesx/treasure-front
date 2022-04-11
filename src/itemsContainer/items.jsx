import '../App.css'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import SingleItem from './singleItemContainer/singleItem'

const Items =()=>{
    useEffect(() =>{
        getItems();
    }, [])
    const [items, setItems] = useState([])

    const getItems = async()=>{
        const getApiResponse = await fetch('http://localhost:8000/api/items')
        const parsedGet = await getApiResponse.json()
        setItems(parsedGet)
    }


return(
    <div id="items-div">
        <h4></h4>
        { items.map((item)=>{
            return(
            //   <SingleItem item={item}></SingleItem>
            <h1 key={item.id}>
                <Link to={`/items/${item.id}`}>{item.title}</Link>
            </h1>
            )
        })}
    </div>
)

}

export default Items