import React from 'react'
import './ReviewCard.css'
import ReactStars from "react-rating-stars-component"

const ReviewCard = ({review}) => {
    const options = {
        edit: false,
        color: "rgba(20 , 20 , 20 , 0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: review.rating,
        isHalf: true,
        count : 5
    }
  return (
    <div className="review-card">
    <div className="user-info">
      <h3>{review.name}</h3>
      <div className="rating">{<ReactStars {...options} />} </div>
    </div>
    <div className="comment">{review.comment}</div>
  </div>
  )
}

export default ReviewCard