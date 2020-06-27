import React from 'react'
import Button from '../../UI/Button/Button'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import classes from './CartSummary.css'

const cartSummary = (props) => {
    return (
        <Aux>
            <div className={classes.TopDiv}>
                <p>You have {props.quantity} items in your shopping cart</p>
                <Button disabled={props.quantity === 0} clickedButton={props.clickedButton}>Clear Shopping Cart</Button>
            </div>
            <div className={classes.HeaderDiv}>
                <p>Product</p>
                <p>Quantity</p>
                <p>Price</p>
            </div>
        </Aux>
    ); 
}

export default cartSummary