
import React from 'react';
import { useState} from 'react'
//import {useNavigate} from 'react-router-dom';

const Product_create = ({createProduct,tags,createTag}) => {
    
    const [name, setName] = useState('');
    const [vip,setVIP] = useState(false);
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [activeTags, setActiveTags] = useState({});
    const [newtag, setNewTag] = useState("");
    const [red, setRed] = useState(0);
    const [green, setGreen] = useState(0);
    const [blue, setBlue] = useState(0);

    const actTags = {};
    
    tags.forEach((t) => {
      actTags[t.name] = false;
      if (activeTags[t.name] === true) {
        actTags[t.name] = activeTags[t.name];
      }
    });

    const css = `
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
      createProduct({name,description,price:price*1,is_vip:vip,tags,red,green,blue});
    }
    return(
      <div>
        <form onSubmit={ save } className='productForm'>
          <h2>CREATE PRODUCT</h2>
          <label>Name:<input value={ name } onChange={ ev => setName(ev.target.value)}/></label>
          <label>Red:<input type="number" min="0" max="255" value={ red } onChange={ ev => setRed(ev.target.value)}/> Green:<input type="number" min="0" max="255" value={ green } onChange={ ev => setGreen(ev.target.value)}/> Blue:<input type="number" min="0" max="255" value={ blue } onChange={ ev => setBlue(ev.target.value)}/></label>
          <div className="colorPreview"></div>
          <style>{css}</style>
          <label>Is VIP:<input type='checkbox' checked={vip} onChange={ () => setVIP(!vip)}/></label>
          <label>Description:</label>
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
          <button disabled={name === "" || description === ""}>CREATE PRODUCT</button>
        </form>
      </div>
    )
  }

  export default Product_create;
