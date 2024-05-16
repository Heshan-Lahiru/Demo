import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div className='container'>
          <div  className='box bigest'>
            <div className='logo'>
              <img src='https://files.eventleadershipinstitute.com/2018/12/ELI-Logo-Square-Black-1024x344.png' alt='' style={{ maxWidth: '100%' }} />
              <h2>Do You Need Help With Anything?</h2>
              <p>Receive updates, hot deals, discounts sent straight to your inbox every month</p>

              <div className='input flex'>
                <input type='text' placeholder='Email Address' />
                <button style={{ marginLeft: '20px', backgroundColor: '#E00947' }}>Subscribe</button>
              </div>
            </div>
          </div>


          <div className='responsive-box'>
            <div style={{marginLeft:'100px', width:'200px'}} className='box'>
            <center> <h3>Follow Us</h3>
              <ul>
              <li>  <a  style={{color:'white'}}  href='https://web.facebook.com/login/?_rdc=1&_rdr'>Facebook</a></li>
                <li>  <a  style={{color:'white'}}  href='https://www.whatsapp.com/download'>Whatsapp </a></li>
                <li>  <a  style={{color:'white'}}  href='https://www.instagram.com/accounts/login/?hl=en'>Instergram </a></li>
                <li>  <a  style={{color:'white'}}  href='https://web.botim.me/#/'>Botim</a></li>
                <li>  <a  style={{color:'white'}}  href='https://web.telegram.org/k/'>Teligram </a></li>
              </ul>
              </center> </div>
            
          </div>
          <div className='responsive-box'>
          <div style={{marginLeft:'100px', width:'200px'}}  className='box'>
          <center>   <h3>Company</h3>
              <ul  >
                <li>  <a  style={{color:'white'}}  href='/aboutus'>About us </a></li>
                <li>  <a  style={{color:'white'}}  href='/contactus'>Contact us </a></li>
                <li>  <a  style={{color:'white'}}  href='/join'>Join with Us </a></li>
                <li>  <a  style={{color:'white'}}  href='/details'>Details</a></li>
                <li>  <a  style={{color:'white'}}  href='/chat'>chat </a></li>
              </ul>
              </center> </div>
            </div>

            <div className='res'>
          <div style={{marginLeft:'100px', width:'200px'}}  className='box'>
             <center> <h3>App</h3>
              <ul>
              
              <li>
  <a href='https://play.google.com/store/games?hl=en&gl=US&pli=1'>
    <img src='https://freelogopng.com/images/all_img/1664287128google-play-store-logo-png.png' alt='' style={{ width:'130px' }}/>
  </a>
</li>

<li>
  <a href='https://www.apple.com/app-store/'>
  <img src='https://w7.pngwing.com/pngs/34/523/png-transparent-app-store-apple-logo-apple-text-logo-video-game.png' alt='' style={{ width:'130px' }} />  </a>
</li>



              </ul>
              </center>  </div>
            </div>



        </div>
      </footer>
      <div className='legal'>
        <span>© 2024 . Eventleadership Institute.</span>
      </div>
    </>
  );
};

export default Footer;
