import './App.css'
import { BrowserRouter , Route , Routes} from 'react-router-dom';
import Header from './components/layout/Header/Header';

import { useEffect } from 'react';
import WebFont from 'webfontloader';

import Footer from "./components/layout/Footer/Footer"
import Home from "./components/Home/Home.jsx"
import ProductDetails from "./components/Product/ProductDetails.jsx"
import Products from "./components/Product/Products.jsx"
import SearchHeader from './components/Product/SearchHeader.jsx';
import Search from "./components/Product/Search.jsx"

import LoginSignUp from './components/User/LoginSignUp.jsx';

function App() {
  useEffect(()=>{

    WebFont.load({
      google: {
        families : ["Roboto" , "Droid Sans" , "Chilanka"]
      }
    })

  }, [])
  return (
    <BrowserRouter>
    <Header/>
    <SearchHeader/>
    <Routes>
    <Route path='/' Component={Home}/>
    <Route path='/product/:id' Component={ProductDetails}/>
    <Route path='/products' Component={Products}/>
    <Route path='/products/:keyword' Component={Products}/>
    <Route path='/search' element={<Search/>}/>
    <Route path='/login' element={<LoginSignUp/>}/>
    
    </Routes>
    <Footer/>
    </BrowserRouter>

  )
}

export default App;
