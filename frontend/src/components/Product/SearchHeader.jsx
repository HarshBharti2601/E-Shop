import React, { useState } from 'react'
import './SearchHeader.css'

import { useNavigate } from 'react-router-dom'

const  SearchHeader = () => {
    const [keyword , setKeyword] = useState("")
    const navigate = useNavigate();
    const searchSubmitHandler = (e)=>{
        e.preventDefault() 
        if(keyword.trim()){
            navigate(`/products/${keyword}`)
        }
        else{

            navigate('/products')

        }
    }
  return (
    <>
    <div className='mainDiv1'>
    <form action="" className="searchBox1" onSubmit={searchSubmitHandler}>
        <input type="text"  placeholder='Search' onChange={(e)=>{
            setKeyword(e.target.value)
        }}/>

        <input type="submit"  value="Search" />

    </form>
    </div>
    </>
  )
}

export default SearchHeader