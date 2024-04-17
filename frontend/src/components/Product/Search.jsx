import React, { useState } from 'react'
import './Search.css'
import { useNavigate } from 'react-router-dom'

const Search = () => {
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
    <div className='mainDiv'>
    <form action="" className="searchBox" onSubmit={searchSubmitHandler}>
        <input type="text"  placeholder='Seach' onChange={(e)=>{
            setKeyword(e.target.value)
        }}/>

        <input type="submit"  value="Search" />

    </form>
    </div>
    </>
  )
}

export default Search