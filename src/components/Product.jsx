// Product component
// Used to show individual product cards on different pages.
// Displays product info and has an add-to-cart button.

import React, {useState} from "react";
import  {useNavigate} from 'react-router-dom'
import "./Product.css";
import Plus from "../assets/plus.png";


function Product(props) {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const addToCart = (e) => {
    e.preventDefault();

    if(props.login){props.addToCart({id: props.id, quantity: quantity, name: props.name, price: props.price});
    setQuantity(1);
    document.querySelector('.successfully-added').style.display = 'block';
    setTimeout(() => {
      document.querySelector('.successfully-added').style.display = 'none';
    }, 500);
  }else{
      console.log(' not logged in');
      navigate('/signin')
  }
}
  return (
    <div className="relation-container">
      <div className="product-card">
        <img
          src={`/images/${props.img}`}
          alt={props.name}
          className="product-image"
        />
        <div className="description">
          <div className="cursor-default">
            <h3 className="product-name">{props.name}</h3>
            <p className="product-price">${props.price} / kg</p>
          </div>
          <div>
          <div>
            <form action="" onSubmit={addToCart}>
              <input  type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" />
              <button type="submit"className="add-to-cart"><img src={Plus} alt="add to cart" className="icons" /></button>
            </form>
          </div>
          </div>
        </div>
      </div>

      <h3 className="successfully-added" style={{display: 'none'}}>Added Successfully <br /> price : {quantity * props.price}</h3>
    </div>
  );
}

export default Product;
