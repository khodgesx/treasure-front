import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import apiUrl from '../../apiConfig'
import axios from 'axios'

const EditItemRoute = ()=>{
    let id = useParams()
    const [submitted, setSubmitted] = useState(false)
    useEffect(() =>{
        getItem();
    }, [])
    const [item, setItem] = useState({
                id:null,
                title:'',
                category:'',
                details:'',
                amount:0, 
                img:'',
                location:'', 
                available:true
    })
    const getItem = async()=>{
        const getApiResponse = await fetch(`${apiUrl}/api/items/${id.id}`)
        const parsedGet = await getApiResponse.json()
        setEditItem(parsedGet)

        // console.log('inside get',item)
    }
    

    const [editItem, setEditItem] = useState({
        title: item.title,
        category: item.category,
        details: item.details,
        amount: item.amount,
        img: item.img,
        location: item.location,
        available: item.available
    })
    console.log(editItem)


    // const getItem =()=>{
    //     axios.get(`${apiUrl}/api/items/${id.id}`)
    //     .then((response)=>{
    //         setEditItem({
    //             id:response.data.id,
    //             title:response.data.title,
    //             category:response.data.category,
    //             details:response.data.details,
    //             amount:response.data.amount, 
    //             img:response.data.img,
    //             location:response.data.location, 
    //             available:response.data.available
    //         })
    //         console.log(editItem.title)
    //     })
    //     .catch((e)=>{
    //         console.log(e)
    //     })
    // }
    // const updateItem = ()=>{
    //     axios.put(`${apiUrl}/api/items/update/${id.id}`, 
    //     )
    // }
    
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
            // console.log(res.data)
            // console.log(form_data)
        })
        .catch(err => console.log(err))
        
    }
    return(
        <div>
        <div>
            <h1 id="edit-title">edit <strong>{editItem.title}</strong> here:</h1>
        </div>
             <div id="edit-form">
              <form onSubmit={submitEdit}> 
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
                        <label htmlFor="amount">Amount </label>
                        <input onChange={inputChange} type="number" name="amount" value={editItem.amount}></input>
                    </div>
                    {/* <div>
                        <label htmlFor="img">Photo </label>
                         <input onChange={imageChange} type="file" name="img" id="item-pic"accept="image/png, image/jpeg" placeholder='upload image'></input>
                    </div> */}
                    <div>
                        <label htmlFor="location">Location: </label>
                        <input onChange={inputChange} type="text" name="location" value={editItem.location}></input>
                    </div>
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

