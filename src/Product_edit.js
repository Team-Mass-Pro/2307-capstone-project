
import React from 'react';
import { useState,useEffect} from 'react'
import {useParams} from 'react-router-dom';

const Product_edit = ({products,reviews,updateProduct,tags,createTag,deleteReview}) => {
  
    const [newtag, setNewTag] = useState("");
    const [name, setName] = useState("");
    const [vip,setVIP] = useState(false);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [activeTags, setActiveTags] = useState({});
    const [red, setRed] = useState(0);
    const [green, setGreen] = useState(0);
    const [blue, setBlue] = useState(0);

    useEffect(()=> {
      const setData = ()=> {
        const product = products.find(p => p.id === id);
            
        if(!product){
          return null;
        }

        setName(product.name);
        setVIP(product.is_vip);
        setDescription(product.description);
        setPrice(product.price);
        setRed(product.red);
        setGreen(product.green);
        setBlue(product.blue);
      };
      setData();
    }, [products]);
    
    const { id } = useParams();

    const product = products.find(p => p.id === id);

    const productReviews = reviews.filter((r) => r.product_id === product.id);
    
    if(!product){
      return null;
    }


    const actTags = {};
    //const currentTags = {};
    let isSame = true;
    tags.forEach((t) => {
      if(t.name === "vip"){
        return;
      }
      if (activeTags[t.name] !== undefined) {
        actTags[t.name] = activeTags[t.name];
      }
      else{
      actTags[t.name] = product.tags.includes(' '+ t.name + ' ');
      }
    });
    tags.forEach((t) => {
      if(t.name === "vip"){
        return;
      }
      const t_isTrue = product.tags.includes(' '+ t.name + ' ');
      
      if(t_isTrue !== actTags[t.name]){
        isSame = false;
      }
    });
    const css = `
    .productDisplayOuter{
      background-color: rgb(${product.red},${product.green},${product.blue});
      border:solid rgb(${product.red},${product.green},${product.blue}) 1px;
    }
    .colorPreview{
      background-color: rgb(${red},${green},${blue});
    }
    `;

    const save = (ev)=> {
       ev.preventDefault();
       let tags = ' ';
       for(let t in actTags){
        if(actTags[t]){
          tags += t + " ";
        }
       }
       if(vip){
        tags += "vip ";
       }
       console.log(tags);
       const produck = {name,description,price:price*1,id:product.id,is_vip:vip,tags,red,green,blue};
       updateProduct(produck);
    }
  
    return(
      <div>
        <div className="productDisplayOuter">
        <div className="productDisplayInner">
          <h3>{product.is_vip ? 'VIP ':'' }{product.name}</h3>
          <p>{product.description}</p>
          <p>{ "$" +(product.price).toFixed(2)}</p>
        </div>
        </div>
        <form onSubmit={ save } className='productForm'>
          <h2>EDIT PRODUCT</h2>
          <label>Is VIP:<input type='checkbox' checked={vip} onChange={ () => setVIP(!vip)}/></label>
          <label>Change name:<input value={ name } onChange={ ev => setName(ev.target.value)}/></label>
          <label>Change Color</label>
          <label>Red:<input type="number" min="0" max="255" value={ red } onChange={ ev => setRed(ev.target.value)}/> Green:<input type="number" min="0" max="255" value={ green } onChange={ ev => setGreen(ev.target.value)}/> Blue:<input type="number" min="0" max="255" value={ blue } onChange={ ev => setBlue(ev.target.value)}/></label>
          <div className="colorPreview"></div>
          <style>{css}</style>
          <label>Change description:</label>
          <textarea
            rows="6"
            cols="30"
            value={description} onChange={ ev => setDescription(ev.target.value)}
          ></textarea>
          <label>Price: <input type="number" placeholder='1' min="0" value={ price } onChange={ ev => setPrice(ev.target.value)}/></label>
          <p>Set Tags</p>
          <div>
          {tags.map((t) => {
          if(t.name === 'vip')return;
          return (
            <button type='button' className={'clicked'+ actTags[t.name]} key={t.id} onClick={() => {actTags[t.name] = !actTags[t.name]; setActiveTags(actTags)}}>{t.name}</button>
          )
          })}
          <label>New Tag:<input value={ newtag } onChange={ ev => setNewTag(ev.target.value)}/></label>
          <button disabled={newtag === '' || newtag.includes(' ')} type='button' onClick={() => {createTag({name:newtag});setNewTag('')}}>+</button>
          <span className='smol'>{'(no spaces allowed)'}</span>
          </div>
          <button disabled={name === "" || description === "" || (name === product.name && description === product.description && price*1 === product.price*1 && vip === product.is_vip && red*1 === product.red*1 && green*1 === product.green*1 && blue*1 === product.blue*1 && isSame)}>EDIT PRODUCT</button>
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
              <button onClick={ ()=> deleteReview(r)}>X</button>
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
