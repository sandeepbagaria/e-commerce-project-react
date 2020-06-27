import * as actionTypes from './actionTypes';
import axios from './../../axios-products'

export const purchaseCartSuccess = (orderData) => {
    return {
        type: actionTypes.PURCHASE_SUCCESS,
        orderData: orderData
    };
}

export const purchaseCartFail = (error) => {
    return {
        type: actionTypes.PURCHASE_FAIL,
        error: error
    };
}

export const purchaseStart = (orderData, token) => {
    return dispatch => {
        axios.defaults.headers.post['Authorization'] = 'Bearer '+token
        axios.post('/users/placeOrder', orderData).then((response) => {
            dispatch(purchaseCartSuccess(response.data))
        }).catch((error) => {
            dispatch(purchaseCartFail(error))            
        })
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token) => {
    return (dispatch) => {
        axios.defaults.headers.get['Authorization'] = 'Bearer '+token
        axios.get('/users/orders').then((response) => {
            dispatch(fetchOrdersSuccess(response.data))
        }).catch((error) => {
            dispatch(fetchOrdersFail(error))
        })
    }
}
// const length = response.data.processedOrder.length
// const orderId = response.data.processedOrder[length-1]._id
// const name = response.data.processedOrder[length-1].name
// alert('Thank you '+name+'.\nYour Order ID is '+orderId+'\nGo to Orders to see your Order details.')