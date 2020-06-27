import React, { Component } from 'react'
import Aux from './../../hoc/Auxiliary/Auxiliary'
import Product from './../../components/Product/Product'
import classes from './Products.css'
import FixedBarItems from '../../components/Navigation/FixedBarItems/FixedBarItems'
import axios from './../../axios-products'
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler'
import Spinner from './../../components/UI/Spinner/Spinner'
import { connect } from 'react-redux'


class Products extends Component {

    state = {
        products: null,
        categoryShow: 'All Category',
        categoryCheck: false,
        showSpinner: false,
        error: false
    }

    componentDidMount() {
        axios.get('/products')
        .then((response) => {
            this.setState({
                products: response.data
            })
        }).catch((error) => {
            this.setState({
                error: true
            })
        })
    }

//  cartClicked and cartQuantity are made on the usage of "add to cart" button at the first place for each
//  product, so deleted both from state. Earlier both were maitained in state. 
    addToCartClickedHandler = (productName) => {
        const products = this.state.products
        const updatedProducts = products.map((product) => {
            if(product.name === productName) {
                axios.defaults.headers.post['Authorization'] = 'Bearer '+this.props.token
                axios.post('/users/addToCart/'+product._id)
                product.cartClicked = true
                product.cartQuantity = 1
                return product
            }
            return product
        })
        this.setState({
            products: updatedProducts
        })
    }

    decProductQuantityHandler = (productName) => {
        const products = this.state.products
        const updatedProducts = products.map((product) => {
            if(product.name === productName) {
                product.cartQuantity = product.cartQuantity - 1
                if(product.cartQuantity === 0) {
                    product.cartClicked = false
                }
                axios.post('/users/removeFromCart/'+product._id)
                return product
            }
            return product
        })
        this.setState({
            products: updatedProducts
        })
    }
    
    incProductQuantityHandler = (productName) => {
        const products = this.state.products
        const updatedProducts = products.map((product) => {
            if(product.name === productName) {
                axios.post('/users/addToCart/'+product._id)
                product.cartQuantity = product.cartQuantity + 1
                return product
            }
            return product
        })
        this.setState({
            products: updatedProducts
        })
    }

    clickedCategoryHandler = (element) => {
        this.setState({
            categoryCheck: true,
            categoryShow: element
        })
    }

    clickedAllCategoryHandler = () => {
        this.setState({
            categoryCheck: false,
            categoryShow: 'All Category'
        })
    }
    render() {
        let products = this.state.error? <p><h1>Products can't be loaded!</h1></p>: <Spinner />
        let fixedbar = null
        
        if(this.state.products) {
            products = this.state.products.map((product) => {
                return (
                    <Product 
                    key={product.name}
                    name={product.name} 
                    price={product.price}
                    cartClicked={product.cartClicked}
                    cartQuantity={product.cartQuantity}
                    isAuthenticated={this.props.isAuthenticated}
                    addToCartClicked={() => this.addToCartClickedHandler(product.name)}
                    decProductQuantity={() => this.decProductQuantityHandler(product.name)}
                    incProductQuantity={() => this.incProductQuantityHandler(product.name)}/>
                );
            })
            
        if(this.state.categoryCheck) {
            products = this.state.products.map((product) => {
                if(this.state.categoryShow === product.category) {
                    return (
                        <Product 
                        key={product.name}
                        name={product.name} 
                        price={product.price}
                        cartClicked={product.cartClicked}
                        cartQuantity={product.cartQuantity}
                        addToCartClicked={() => this.addToCartClickedHandler(product.name)}
                        decProductQuantity={() => this.decProductQuantityHandler(product.name)}
                        incProductQuantity={() => this.incProductQuantityHandler(product.name)}
                        isAuthenticated={this.props.isAuthenticated}/>
                    );
                }
                return null
            })
        }

        fixedbar = (
            <FixedBarItems clickedCategory={(element) => this.clickedCategoryHandler(element)} 
            clickedAllCategory={this.clickedAllCategoryHandler}
            products={this.state.products}/>
        )
    }

        return (
            <Aux>
                {this.props.isAuthenticated? null : <p style={{textAlign:'end', color:'red'}}>Login to add to cart</p>}
                {fixedbar}
                <div>
                    <ul className={classes.Products}>
                        {products}
                    </ul>
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(withErrorHandler(Products, axios))