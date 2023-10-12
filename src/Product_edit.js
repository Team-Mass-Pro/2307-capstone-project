
import React from 'react';
import { useState} from 'react'
import {useParams} from 'react-router-dom';

const Product_edit = ({products,reviews,updateProduct}) => {
    

    const { id } = useParams();
    const product = products.find(p => p.id === id);
    if(!product){
      return null;
    }
    const productReviews = reviews.filter((r) => r.product_id === product.id);
    const [name, setName] = useState(product.name);
    const [vip,setVIP] = useState(product.is_vip);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);

    const save = (ev)=> {
       ev.preventDefault();
       console.log(vip)
       const produck = {name,description,price:price*1,id:product.id,is_vip:vip};

       updateProduct(produck);
    }
  
    return(
      <div>
        <h3>{product.is_vip ? 'VIP ':'' }{product.name}</h3>
        <p>{product.description}</p>
        <p>{ "$" +(product.price).toFixed(2)}</p>
        
        <form onSubmit={ save } className='productForm'>
          <h2>EDIT PRODUCT</h2>
          <label>Is VIP:<input type='checkbox' checked={vip} onChange={ () => setVIP(!vip)}/></label>
          <label>Change name:<input value={ name } onChange={ ev => setName(ev.target.value)}/></label>
          <label>Change description:</label>
          <textarea
            rows="6"
            cols="30"
            value={description} onChange={ ev => setDescription(ev.target.value)}
          ></textarea>
          <label>Price: <input type="number" placeholder='1' min="0" value={ price } onChange={ ev => setPrice(ev.target.value)}/></label>
          <button disabled={name === "" || description === "" || (name === product.name && description === product.description && price*1 === product.price*1 && vip === product.is_vip)}>EDIT PRODUCT</button>
        </form>

        <h2>DELETE REVIEWS</h2>
  
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
      </div>
    )
  }

  export default Product_edit;
