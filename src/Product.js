
import React from 'react';
import { useState} from 'react'
import {useParams} from 'react-router-dom';

const Product = ({products,reviews,auth,createReview}) => {
    const [text, setText] = useState('');
    const [rating, setRating] = useState(0);
    const { id } = useParams();
    const product = products.find(p => p.id === id);
    const productReviews = reviews.filter((r) => r.product_id === product.id);
    if(!product){
      return null;
    }
    const save = (ev)=> {
       ev.preventDefault();
       const review = {
         product_id: product.id,
         author: auth.username,
         text: text,
         rating: rating
       };
       createReview(review);
       setText('');
       setRating(0);
    }
  
    return(
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>{ "$" +(product.price).toFixed(2)}</p>
        <h3>Reviews for {product.name}:</h3>
  
        <ul>
        {productReviews.map( r => {
          return(
            <li key={ r.id }>
              <div>
              {`${r.text} `}
              </div>
              <div>
              {[...Array(5)].map((x, i) =>
                <span key={i} >{i < r.rating ? '★' : '☆'}</span>
              )}
              </div>
              <div>
                By {r.author}
              </div>
            </li>
          )
        })}
        </ul>
        <p>
        {productReviews.length ? '': 'No Reviews :('}
        </p>
        <form onSubmit={ save } className='reviewForm'>
          <p>Write a Review for <span className='bold'>{product.name}</span>:</p>
          <textarea
            rows="6"
            cols="30"
            value={ text } onChange={ ev => setText(ev.target.value)}
          ></textarea>
          <label>Rating: <span><input type="number" placeholder='1' min="1" max="5" value={ rating } onChange={ ev => setRating(ev.target.value)}/>/5</span></label>
          <button disabled={text === "" || rating === "0"}>Create New Review</button>
        </form>
      </div>
    )
  }

  export default Product;
