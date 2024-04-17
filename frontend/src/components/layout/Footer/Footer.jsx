import React from 'react'
import appstorelogo from '/appstorelogo.png'
import  playstorelgo from '/playstore.png'
import './Footer.css'
const Footer = () => {
  return (
    <footer id='footer'>
        <div className='leftFooter'>
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download App from Android and IOS mobile phone</p>
            <img src={appstorelogo} alt="appstore" />
            <img src={playstorelgo} alt="plastoore" />
        </div>

        <div className="midFooter">
            <h1>E-Shop</h1>
            <p>We don't deliver products, we deliver happiness</p>
            <p>Copyrights 2024 &copy; AVS</p>
        </div>

        <div className="rightFooter">
            <h4>Follow Us</h4>
            <a href="#insta">Instagram</a>
            <a href="#youtube">Youtube</a>
            <a href="#facebook">Facebook</a>
        </div>

    </footer>
    
  )
}

export default Footer