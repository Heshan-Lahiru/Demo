import React, { useState } from "react"
import "./header.css"
import { Link } from "react-router-dom"

const Header = () => {
  const [navList, setNavList] = useState(false)

  return (
    <>
      <header>
        <div className='container flex'>
          <div className='logo'>
            <img src='https://files.eventleadershipinstitute.com/2018/12/ELI-Logo-Square-Black-1024x344.png' alt='' />
          </div>
          <div className='nav'>
            <ul className={navList ? "small" : "flex"}>
              
                <li>
                  
                  <Link  to="/">Home</Link>
                </li>
                <li>
                  <Link to="/category">Services</Link>
                </li>
               
                <li>
                  <Link to="/event">EVENT</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">signup</Link>
                </li>
                <li style={{marginRight:'50px'}}>
                <a href='/aboutus'>
                <img style={{ width: '75px', height:'50px' }} src='https://static.vecteezy.com/system/resources/previews/019/787/018/non_2x/shopping-cart-icon-shopping-basket-on-transparent-background-free-png.png' alt='' />
                  
                   </a>
                </li>
              

                <li>
                <a href='/profile'>
                <img style={{ width: '30px', height:'30px' }} src='./images/5987424.png' alt='' />
                   <h4>K.B.L.lahiru Heshan</h4>
                   </a>
                </li>

            </ul>
          
    </div>
   
          <div className='toggle'>
            <button style={{backgroundColor:'#E00947'}} onClick={() => setNavList(!navList)}>{navList ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}</button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
