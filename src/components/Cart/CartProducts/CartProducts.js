import React from 'react'
import classes from './CartProducts.css'
import CartButton from './../../UI/Button/CartButton/CartButton'

const cartProducts = (props) => {

    const product = props.cart.map((product) => {
        return (
        <div key={product._id} className={classes.Product}>
            <p>{product.name}</p>
            <CartButton
            decProductQuantity={() => props.decProductQuantity(product.name)}
            incProductQuantity={() => props.incProductQuantity(product.name)}
            cartQuantity={product.quantity}/>
            <p>{product.price}</p>
        </div>)
    })
    return (
        <div >
            {product}
        </div>
    );
}

export default cartProducts