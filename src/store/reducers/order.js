import * as actionTypes from './../actions/actionTypes'

const initialState = {
    orderData: [],
    loading: false
}

const orderReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_SUCCESS:
            const length = action.orderData.processedOrder.length
            const orderId = action.orderData.processedOrder[length-1]._id
            const name = action.orderData.processedOrder[length-1].name
            alert('Thank you '+name+'.\nYour Order ID is '+orderId+'\nGo to Orders to see your Order details.')
            return state

        case actionTypes.PURCHASE_FAIL:
            return state
        
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true
            }

        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orderData: action.orders,
                loading: false
            }

        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading: false
            }

        default: 
        return state
    }
}

export default orderReducer