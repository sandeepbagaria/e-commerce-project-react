import React from 'react'
// import imagePath from './../../assets/product_images/apple.jpg'
import classes from './ProductImage.css'
import Aux from './../../hoc/Auxiliary/Auxiliary'

const productImage = (props) => {
    const imagePath = '/images/'+props.name+'.jpg'
    return (
        <Aux>
            <img className={classes.Image} src={imagePath} alt='product'/>
        </Aux>
    );
}

export default productImage