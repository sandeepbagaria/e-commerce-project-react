import * as actionTypes from './actionTypes'
import axios from './../../axios-products'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const signUp = (name, phone_no, email, password) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            name: name,
            phone_no: phone_no,
            email: email,
            password: password
        }
        axios.post('/users', authData).then((response) => {
            localStorage.setItem('token', response.data.token)
            dispatch(authSuccess(response.data.token))
        }).catch((error) =>{
            dispatch(authFail(error.response.data.message))
        })
    }
}

export const signIn = (email, password) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password
        }
        axios.post('/users/login', authData).then((response) => {
            localStorage.setItem('token', response.data.token)
            dispatch(authSuccess(response.data.token))
        }).catch((error) =>{
            dispatch(authFail(error.response.data.error))
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if(!token) {
            dispatch(logout())
        } else {
            dispatch(authSuccess(token))
        }
    }
}

