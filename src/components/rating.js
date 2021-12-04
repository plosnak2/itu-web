/**
 * Author: Jozef Čásar (xcasar)
 * This is logical and graphic component that displays users rating for actual recipe
 */
import React from "react";
import { UsersRef, RecipeRef } from "../firebase";
import { Rating } from 'react-simple-star-rating'

const RatingPage = ({actualRating, user, id, rate_count, rate}) => {
    let default_rating = actualRating;

    //update users rating, when it is changed
    const ratingCompleted = (rating_value) => {
        let rating = rating_value / 20;
        if(default_rating == 0){
            rate_count++; 
        }
        rate = rate + (rating - default_rating)
        default_rating = rating;
        RecipeRef.doc(id).update({"rate": rate})
        RecipeRef.doc(id).update({"rate_count": rate_count})
        UsersRef.doc(user).update({["rating."+id]:rating})
      }
      
    return (       
        <Rating size={40} onClick={ratingCompleted} ratingValue={default_rating} showRating={false}/>
    )
    
} 
export default RatingPage