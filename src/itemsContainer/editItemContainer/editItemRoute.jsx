import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import apiUrl from '../../apiConfig'
import axios from 'axios'

const EditItemRoute = ()=>{
    let id = useParams()
    useEffect(() =>{
        getItem();
    }, [])
    const [editItem, setEditItem] = useState({})
    const getItem = async()=>{
        const getApiResponse = await fetch(`${apiUrl}/api/items/${id.id}`)
        const parsedGet = await getApiResponse.json()
        setEditItem(parsedGet)

        // console.log('inside get',item)
    }
    // console.log('outside get',item)

    // const [editItem, setEditItem] = useState({
    //     title: item.title,
    //     category: item.category,
    //     details: item.details,
    //     amount: item.amount,
    //     img: item.img,
    //     location: item.location,
    //     available: item.available
    // })
    // console.log(editItem.title)
    
    
    

    
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
        form_data.append('img', editItem.img)
        form_data.append('title', editItem.title)
        form_data.append('category', editItem.category)
        form_data.append('details', editItem.details)
        form_data.append('amount', editItem.amount)
        form_data.append('location', editItem.location)
        form_data.append('available', editItem.available)
        let url = `${apiUrl}/api/items/${id.id}`;
        axios.put(url, form_data, {
            headers:{
                'Content-Type':'multipart/form-data' 
            }
        })
        .then(res=>{
            console.log(res.data)
        })
        .catch(err => console.log(err))
        
    }
    return(
        <div>

        
        <div>
            <h1>edit <strong>{editItem.title}</strong> here:</h1>
        </div>
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
     
                      <label htmlFor="img">Photo </label>
                      <input onChange={imageChange} type="file" name="img" id="item-pic"accept="image/png, image/jpeg" placeholder='upload image'></input>
     
                      <label htmlFor="location">Location: </label>
                      <input onChange={inputChange} type="text" name="location" value={editItem.location}></input>
                     <div>
                          <label htmlFor="available">Available </label>
                          <input onChange={inputChange} type="radio" name="available" value={editItem.available}></input>
     
                          <label htmlFor="available">Not Available </label>
                          <input onChange={inputChange} type="radio" name="available" value={!editItem.available}></input>
                     </div>
                      <button type="submit">Save Changes</button>
                  </form>
             </div>
             </div>
    )
}

export default EditItemRoute

    // return(
    //    
    // )