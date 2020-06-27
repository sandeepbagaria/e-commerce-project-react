import React from 'react'
import Aux from './../../hoc/Auxiliary/Auxiliary'
import ProductImage from './../ProductImage/ProductImage'
import classes from './Product.css'
import CartButton from './../UI/Button/CartButton/CartButton'

const product = (props) => {
    
    let cartButton = null

        cartButton = (
            <div className={classes.CartDiv}>
                <button disabled={!props.isAuthenticated} onClick={props.addToCartClicked} className={classes.CartButton}>Add to Cart</button>
            </div>
    )

    if(props.cartClicked) {
        cartButton = (
            <CartButton decProductQuantity={props.decProductQuantity}
            incProductQuantity={props.incProductQuantity}
            cartQuantity={props.cartQuantity}/>
            )
    }

    return (
        <Aux>
            <li className={classes.List}>
                <div className={classes.Product}>
                    <ProductImage name={props.name} />
                    <div className={classes.ProductName}>{props.name}</div>
                    <div className={classes.ProductPrice}>Rs. {props.price}</div>
                    {cartButton}
                </div>
            </li>
        </Aux>
    );
}

export default product