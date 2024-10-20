import React, { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import {Link} from "react-router-dom"


const ProductItem = ({product}) => {

  const [color, setColor] = useState("")
  const [textColor, setTextColor] = useState("")
  const savedMode = localStorage.getItem('darkMode') === 'true';

  useEffect(() => {
    if(savedMode) {
       setColor("#0e1011")
       setTextColor("white")
    }
      else {
         setColor("white")
         setTextColor("black")
      }

  })

  return ( 
 <>   
        <div className='col-sm-12 col-md-6 col-lg-3 my-3'>
          <div className='card p-4 rounded'style={{ backgroundColor: color}}>
            <img 
            className='card-img-top mx-auto' 
            src={product.images[0]?.url}
            alt={product.name}
            />
            <div className='card-body ps-3 d-flex justify-content-center flex-column'>
              <h5 className='card-title' style={{ color: "#ecf8fd", textAlign: 'left'}}>
                <Link to ={`/product/${product._id}`}>{product.name}</Link>
              </h5>
              <div className='ratings mt-auto d-flex'>
                <StarRatings
                rating={product.ratings}
                starRatedColor='yellow'
                numberOfStars={5}
                name='rating'
                starDimension='24px'
                starSpacing='1px'
                />
                </div>
                <span id='no_of_reviews' className='pt-2 ps-2' style={{ color: textColor}}>
                  {" "}
                  ({product?.numOfReviews})
                </span>
                </div>
                <p className='card-text mt-2' style={{ color: textColor, textAlign: 'center'}}>${product.price}</p> 
                <a href={`/product/${product._id}`} id='view_btn' className='btn btn-block'>View Details</a>
            </div>
          </div>  
</>
  );
};

export default ProductItem;