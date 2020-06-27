import React from 'react'
import Aux from './../../../hoc/Auxiliary/Auxiliary'
import classes from './OrderSummary.css'

const orderSummary = (props) => {

    const summary = props.cart.map((product) => {
        return <div key={product.name} className={classes.OrderSummary}>
            <p>{product.quantity} x {product.name}</p> <p>Rs.{product.price}</p>
        </div>
    })

    return(
        <Aux>
            <div>
                <p style={{textAlign: 'center'}}>You have {props.quantity} items in your shopping cart</p>
                {summary}
                <div className={classes.TotalPrice}><p>Total: </p> <p>Rs. {props.price}</p></div>
            </div>
        </Aux>

    );
}

export default orderSummary