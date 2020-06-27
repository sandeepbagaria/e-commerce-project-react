import React from 'react'
import classes from './CartButton.css'

const cartButton = (props) => {
    return (
        <div className={classes.CartDiv}>
                <button onClick={props.decProductQuantity} className={classes.LessButton}>-</button>
                <strong><p>{props.cartQuantity} in cart</p></strong>
                <button onClick={props.incProductQuantity} className={classes.MoreButton}>+</button>
        </div> 
    );
}

export default cartButton