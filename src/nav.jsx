
import './App.css';
import {Link} from 'react-router-dom'

const Nav=()=> {
    const navStyle = {
        color:'white'
    }
  return (
    <div>
       <nav>
           <Link style={navStyle}to="/"><h3 id='logo'>Trashhhhhure</h3></Link>
           <ul className='nav-links'>
               <Link style={navStyle}to="/about"><li>About</li></Link>
               <Link style={navStyle}to="/items"><li>Treasure List</li></Link>
           </ul>
        </nav>
  
    </div>
  );
}

export default Nav;
