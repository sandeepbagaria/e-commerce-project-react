import React from 'react'
import classes from './Order.css'
import Product from './Product'

const order = (props) => {

    const products = props.products.map((product) => {
        return <Product key={product.name} name={product.name} quantity={product.quantity}/>
    })

    return (
        <div className={classes.Order}>
            <p>Order Number: {props.id}</p>
            <p style={{display:'flex'}}>Products in the order: <p>{products}</p></p>
            <p>Delivery to: {props.name}</p>
            <p>Address: {props.address}</p>
            <p>City: {props.city}</p>
            <p>Pin code: {props.pinCode}</p>
            <p>Total Quantity: {props.totalQuantity}</p>
            <p>Total Price: Rs. {props.totalPrice}</p>
        </div>
    );
}

export default order