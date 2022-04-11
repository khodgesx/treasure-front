
import './App.css';
import Nav from './nav'
import Home from './homeContainer/home';
import Items from './itemsContainer/items'
import SingleItem from './itemsContainer/singleItemContainer/singleItem';
import About from './aboutContainer/about';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        
          
        <Nav />
          <Routes>
            <Route exact path="/" element={< Home />}/>
            <Route exact path="/about" element={ < About />}/>
            <Route exact path="/items" element={ < Items />}/>
            {/* <Route exact path="/items/:id" element={ <SingleItem />} />  */}
            <Route path="/items/:id" element={ <SingleItem />} /> 
          </Routes>
      </div>
      
    </Router>
  );
}

export default App;
