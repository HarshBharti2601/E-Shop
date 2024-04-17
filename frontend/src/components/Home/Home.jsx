import React , {useEffect} from 'react'
import { CgMouse } from "react-icons/cg";
import './Home.css'
import Product from './Product.jsx'
import MetaData from '../layout/MetaData.jsx';
import { getProduct } from '../../actions/productAction.js';
import { useSelector , useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader.jsx';
import {toast , Bounce} from 'react-toastify'



// const product = {
//   name : "Blue Tshirt",
//   images : [{url : "https://images.meesho.com/images/products/285711749/uhuxj_512.webp"}],
//   price : "Rs 3000",
//   _id : "AVS"
// }

const Home = () => {
  const dispatch  = useDispatch()
  const {loading , error , product , productCount} = useSelector(state =>state.products)
  useEffect(()=>{

    if(error) {
      return toast.info(error, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }

    dispatch(getProduct())

  }, [dispatch , error]) //confusion



console.log(product)

 
  return (
    <>
    {loading ?<Loader/>: (   <>
    <MetaData title="E-Shop"/>

    <div className="banner">
        <p>Welcome to E-Shop</p>
        <h1>Find Amazing Products Below</h1>

        <a href="#container"><button>Scroll <CgMouse /></button></a>

    </div>
    <h2 className='homeHeading'>Featured Products</h2>
    <div className="container" id='container'>
      {/* <Product product = {product}/>
      <Product product = {product}/>
      <Product product = {product}/>
      <Product product = {product}/>

      <Product product = {product}/>
      <Product product = {product}/>
      <Product product = {product}/>
      <Product product = {product}/> */
      
     product && product.map((EachProduct , index)=>{

      return <Product product={EachProduct} key={index}/>

      })
      
      }

      
    </div>
    </>)}
    </>
 
  )
}

export default Home