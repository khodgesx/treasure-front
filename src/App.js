
import './App.css';
import Nav from './nav'
import Home from './homeContainer/home';
import Items from './itemsContainer/items'
import SingleItem from './itemsContainer/singleItemContainer/singleItem';
import About from './aboutContainer/about';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import SingleItemRoute from './itemsContainer/singleItemContainer/singleItemRoute';
import EditItemRoute from './itemsContainer/editItemContainer/editItemRoute';
import { useState } from 'react';

function App() {
  const [items, setItems] = useState([])
  
  return (
    <Router>
      <div className="App">
        
          
        <Nav />
          <Routes>
            <Route exact path="/" element={< Home />}/>
            <Route exact path="/about" element={ < About />}/>
            <Route  path="/items" element={ < Items items={items}setItems={setItems} />}/>
            <Route exact path="/items/:id" element={ <SingleItemRoute items={items} setItems={setItems} />} /> 
            <Route exact path="/items/update/:id" element = { <EditItemRoute items={items}setItems={setItems}/>}/>
            <Route path="/items/:id" element={ <SingleItem />} /> 
            <Route path="*" element={<Navigate to="/" replace/> }/>
          </Routes>
      </div>
      
    </Router>
  );
}

export default App;
