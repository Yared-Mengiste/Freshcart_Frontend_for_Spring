// CartItem component
// Represents a single item in the cart sidebar.
// Used for displaying name, price, quantity and remove button.

import React from 'react'
import Delete from "../assets/delete.png";
import './cartItem.css'

const CartItem = (props) => {
  function removeProduct(){
    props.removeFromCart(props.id)
  }
  return (
   <div className="cart-card">
      <div className="cart-description">
        <div className='amount'>
          <h3 className="cart-product-name">{props.name}</h3>
          <p style={{fontWeight:'bold', fontSize:'18px'}}>{props.quantity} kg/L</p>
        </div>
        <div>
          <p style={{fontWeight:'bold', fontSize:'18px'}} className="cart-product-price">${props.price} / kg</p>
        <button onClick={removeProduct}className="cart-add-to-cart">
          <img src={Delete} alt="add to cart" className="icons" />
        </button>
        </div>

      </div>
    </div>
  )
}

export default CartItem