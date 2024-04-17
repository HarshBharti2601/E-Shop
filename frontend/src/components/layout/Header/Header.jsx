import React from "react";
import {ReactNavbar} from "overlay-navbar"
import logo from "/logo.png"
import { MdAccountCircle } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

const Header = ()=>{
    return <ReactNavbar
    burgerColorHover = "green"
    logo = {logo}
    logoWidth ="15vmax"
    navColor1 = "rgba(1, 50 , 32 , 1)"
    logoHoverSize = "10px"
    logoHoverColor = "#006400"
    link1Text = "Home"
    link2Text = "Product"
    link3Text = "Contact"
    link4Text = "About"
    link1Url = "/"
    link2Url = "/products"
    link3Url = "/contact"
    link4Url = "/about"
    link1Color = "#ADD8E6"
    nav1justifyContent = "flex-end"
    nav2justifyContent = "flex-end"
    nav3justifyContent = "flex-start"
    nav4justifyContent = "flex-start"
    link1ColorHover = "green"
    link1Margin = "2vmax"
    profileIcon = {true}
    ProfileIconElement = {MdAccountCircle}
    cartIcon = {true}
    CartIconElement = {FaCartShopping } 
    searchIcon = {true}
    SearchIconElement = {FaSearch}
    searchIconMargin = "2vw"
    cartIconMargin = "2vw"
    profileIconMargin = "2vw"
    searchIconUrl = "/search"
    cartIconUrl = "/cart"
    profileIconUrl= "/login"

    

   



    
 

    />
}

export default Header