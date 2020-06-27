import React, { Component } from 'react'
import CartSummary from '../../components/Cart/CartSummary/CarSummary'
import Aux from  './../../hoc/Auxiliary/Auxiliary'
import CartProducts from '../../components/Cart/CartProducts/CartProducts'
import axios from './../../axios-products'
import classes from './Cart.css'
import Button from './../../components/UI/Button/Button'
import { connect } from 'react-redux'


class Cart extends Component {

    state = {
        cart: null,
        showCart: false,
        totalQuantity: 0,
        totalPrice: 0
    }

    componentDidMount() {
        let sum = 0
        let price = 0
        axios.defaults.headers.get['Authorization'] = 'Bearer '+this.props.token
        axios.defaults.headers.post['Authorization'] = 'Bearer '+this.props.token
        axios.get('/users/cartTotal').then((response) => {
            sum = response.data.sum
            price = response.data.price
        })

        axios.get('/users/viewCart').then((response) => {
            this.setState({
                cart: response.data,
                showCart: true,
                totalQuantity: sum,
                totalPrice: price
            })
        })
    }


    clearCartHandler = () => {
        axios.post('/users/clearCart').then((response) => {
            this.setState({
                cart: [],
                totalQuantity: 0,
                totalPrice: 0
            })
        })
    }
    
    getTotalQuantity = () => {
        const products = this.state.cart
        if(products.length === 0) {
            this.setState({
                totalQuantity: 0
            })
        } else {
            const totalQty = this.state.cart.map((product) => {
                return product.quantity
            })
            let sum = 0
            for(let i=0; i<totalQty.length; i++) {
                sum = sum + totalQty[i]
            }
            this.setState({
                totalQuantity: sum
            })
        }
    }

    decProductQuantityHandler = (productName) => {
        const updatedCart = this.state.cart.map((product) => {
            if(product.name === productName) {
                product.price = product.price - (product.price/product.quantity)
                product.quantity = product.quantity - 1
                axios.post('/users/removeFromCart/'+product.product)                
                return product
            }
            return product
        })

        const againUpdatedCart = updatedCart.filter((product) => {
            return product.quantity !== 0
        })

        this.setState({
            cart: againUpdatedCart
        })
        
        this.getTotalQuantity()
        this.getTotalPrice()
    }

    incProductQuantityHandler = (productName) => {
        const cart = this.state.cart
        const updatedCart = cart.map((product) => {
            if(product.name === productName) {
                axios.post('/users/addToCart/'+product.product)
                product.price = product.price + (product.price/product.quantity)
                product.quantity = product.quantity + 1
                return product
            }
            return product
        })

        this.setState({
            cart: updatedCart
        })
        
        this.getTotalQuantity()
        this.getTotalPrice()
    }

    getTotalPrice = () => {
        const products = this.state.cart
        if(products.length === 0) {
            this.setState({
                totalPrice: 0
            })
        } else {
            const totalPrice = this.state.cart.map((product) => {
                return product.price
            })
            let price = 0
            for(let i=0; i<totalPrice.length; i++) {
                price = price + totalPrice[i]
            }
            this.setState({
                totalPrice: price
            })
        }
    }

    checkoutContinueHandler = () => {
        if(this.props.isAuthenticated) {
            this.props.history.replace('/checkout/contact-data')
        } else {
            this.props.history.push('/auth')
        }
    }

    render() {
        let showCart =  null;
        if(this.state.showCart) {
            if(this.state.cart.length === 0) {
                showCart = <h1 style={{textAlign: 'center'}}>Cart is empty</h1>
            }  else {
            showCart = <CartProducts 
            incProductQuantity={(productName) => this.incProductQuantityHandler(productName)} 
            decProductQuantity={(productName) => this.decProductQuantityHandler(productName)}
            cart={this.state.cart}/>
            }
        }
        return (
            <Aux>
               <CartSummary quantity={this.state.totalQuantity} clickedButton={this.clearCartHandler}/>
                {showCart}  
                <p className={classes.Price}>Total Price: {this.state.totalPrice}</p>     
                {this.props.isAuthenticated? <Button clickedButton={this.checkoutContinueHandler}>Proceed to Checkout</Button> : <Button clickedButton={this.checkoutContinueHandler}>Checkout</Button>}
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

export default connect(mapStateToProps)(Cart)