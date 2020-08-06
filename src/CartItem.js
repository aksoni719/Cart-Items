import React from 'react';

const CartItem = (props) =>  {

    const{ prices,title,qty} = props.product;
    const {
      product,
      onIncreaseQuantity,
      onDecreaseQuantity,
      onDeleteProduct
      } = props;

    return(
      <div className="cart-item">
      <div className="left-block">
      <img style={styles.image} src={product.img}/>
      </div>

      <div className="right-block">
      <div style={ {fontSize:25} }>{title}</div>
      <div style={ {color:'#777'} }>Rs {prices}</div>
      <div style={ {color:'#777'} }>Qty: {qty}</div>
      <div className="cart-item-actions"></div>
        {/* Buttons */}
        <img style={{width:25,marginRight:5}}
        alt="increase"
        className="action-icons"
        src="plus.png"
        onClick={() => onIncreaseQuantity(product)}
        />
        <img style={{width:25,marginRight:5}}
        alt="decrease"
        className="action-icons"
        src="minus.png"
        onClick={() => onDecreaseQuantity(product)}
        />
        <img style={{width:25}}
        alt="delete"
        className="action-icons"
        src="trash.png"
        onClick={() => onDeleteProduct(product.id)}
        />
      </div>
      </div>
    );
  }

const styles={
  image: {
    height: 110,
    width: 110,
    borderRadius: 4,
    background:'#ccc'
  }
}


export default CartItem;
