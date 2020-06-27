import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from './../../axios-products'
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler'
import * as actions from './../../store/actions/index'
import { connect } from 'react-redux'

class Orders extends Component  {

    // state = {
    //     orders: [],
    //     loading: true
    // }

    componentDidMount() {
        this.props.onFetchOrders(this.props.token);
        // axios.get('/users/orders').then((response) => {
        //     this.setState({
        //         loading: false,
        //         orders: response.data
        //     })
        // }).catch((error) => {
        //     this.setState({
        //         loading: false
        //     })
        // })
    }

    render() {
        let orders = null
        if(this.props.orders.length === 0) {
            orders = <h1 style={{textAlign: 'center'}}>No Orders yet...</h1>
        } else {
            orders = this.props.orders.map((product) => {
            return <Order key={product._id}
            id={product._id}
            products={product.products}
            totalPrice={product.totalPrice}
            totalQuantity={product.totalQuantity}
            name={product.name}
            address={product.address}
            city={product.city}
            pinCode={product.pinCode}
            />
        })
    }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orderData,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))