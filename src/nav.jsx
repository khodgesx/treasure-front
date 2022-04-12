
import './App.css';
import {Link} from 'react-router-dom'

const Nav=()=> {
    
  return (
    <div>
       <nav>
           <Link to="/"><h3 id='logo'>Trashhhhhure</h3></Link>
           <ul className='nav-links'>
               <Link to="/about"><li className="links">About</li></Link>
               <Link to="/items"><li className="links">Treasure List</li></Link>
           </ul>
        </nav>
  
    </div>
  );
}

export default Nav;
