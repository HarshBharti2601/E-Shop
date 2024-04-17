import React, { useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import './ProductDetails.css'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../../actions/productAction'
import { useParams } from 'react-router-dom'
import ReactStars from "react-rating-stars-component"
import ReviewCard from './ReviewCard.jsx'
import './ReviewCard.css'
import Loader from '../layout/Loader/Loader.jsx'
import {toast , Bounce} from 'react-toastify'




const ProductDetails = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector(state => state.productDetails)
    console.log(error)

    useEffect(() => {
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
        dispatch(getProductDetails(id)) 
    
    }, [dispatch, id , error])
    const options = {
        edit: false,
        color: "rgba(20 , 20 , 20 , 0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product && product.ratings ? product.ratings : 0,
        isHalf: true,
        count : 5
    }

    return (
       <>
       {loading? <Loader/>: product && ( <>
            <div className="ProductDetails">
                <div className='IMAGE'>
                    <Carousel>
                        {

                            product.images &&
                            product.images.map((item, i) => {

                                return <img src={item.url} alt={item.url} className='CarouselImage' key={item.url} />
                            })
                        }

                    </Carousel>
                </div>
                <div className='detail-box'>
                    <div className='detailsBlock-1'>
                        <h1>{product.name}</h1>
                        <p>Product # {product._id}</p>
                    </div>
                    <div className='detailsBlock-2'>
                        <ReactStars {...options} />
                        <span>{product.numberOfReviews} Reviews</span>
                    </div>
                    <div className="detailsBlock-3">
                        <h1>&#8377; {product.price}</h1>
                        <div className="detailsBlock-3-1">
                            <div className="detailsBlock-3-1-1">
                            <button>+</button>
                            <input type="number" value="1" />
                            <button>-</button>
                            </div>{" "}
                            <button className='AddToCart'>Add to Cart</button>
                        </div>
                        <p>
                            Status: {" "}
                            <b className={product.Stock <1? "redColor" : "greenColor"}>

                                {product.Stock<1? "OutOfStock" : "InStock"}

                            </b>
                        </p>
                    </div>

                    <div className='detailsBlock-4'>
                      <b>  Description : </b> <p>{product.description}</p>
                    </div>


                    <button className='submitReviews'> Submit Review</button>
                 

                </div>

            </div>

            
            <div className='reviewsHeading'>
            <h3>Reviews</h3>
            </div>
            

            {product.reviews && product.reviews[0] ?( <div className="reviews">
                {product.reviews && product.reviews.map((review , index)=>{
                  
                   return <ReviewCard review = {review} key={index}/>
                })}
            </div> ):(<p className='noReivews'> No Reviews Yet </p>) }
        </>)}
       </>
    )
}

export default ProductDetails