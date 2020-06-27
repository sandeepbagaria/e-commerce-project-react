import React, { Component } from 'react'
import Button from './../../components/UI/Button/Button'
import OrderSummary from './../../components/Cart/OrderSummary/OrderSummary'
import Aux from './../../hoc/Auxiliary/Auxiliary'
import axios from './../../axios-products'
import classes from './ContactData.css'
import Input from './.././../components/UI/Input/Input'
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import * as actions from './../../store/actions/index'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            address: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            city: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your city'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            pinCode: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Pin-code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                valid: false,
                touched: false
            }
        },
        cart: [],
        totalPrice: 0,
        totalQuantity: 0,
        formIsValid: false
    }

    componentDidMount() {
        let sum = 0
        let price = 0
        axios.get('/users/cartTotal').then((response) => {
            sum = response.data.sum
            price = response.data.price
        }).catch((error) => {

        })
        axios.get('/users/viewCart').then((response) => {
            this.setState({
                cart: response.data,
                totalPrice: price,
                totalQuantity: sum
            })
        }).catch((error) => {

        })
    }

    clickedButtonHandler = (event) => {
        if(this.state.cart.length === 0) {
            alert('You have 0 items in cart!!! Add some items to Place Order')
            this.props.history.replace('/')
        } else {
            const formData = {}
            for( let id in this.state.orderForm) {
                formData[id] = this.state.orderForm[id].value
            }
            // axios.post('/users/placeOrder', formData).then((response) => {
            //     const length = response.data.processedOrder.length
            //     const orderId = response.data.processedOrder[length-1]._id
            //     const name = response.data.processedOrder[length-1].name
            //     alert('Thank you '+name+'.\nYour Order ID is '+orderId+'\nGo to Orders to see your Order details.')
            // })
            // this.props.history.replace('/')
            this.props.onOrderButtonClick(formData, this.props.token)
            this.props.history.replace('/')
        }
    }

    checkValidity(value, rules) {
        let isValid = true
        if(rules.required) {
            isValid = (value.trim() !== '' && isValid)
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength&& isValid
        }
        return isValid
    }

    inputChangeHandler = (event, id) => {
        const updatedOrderForm = {...this.state.orderForm}
        const updatedFormElement = {...updatedOrderForm[id]}
        updatedFormElement.value = event.target.value
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true
        updatedOrderForm[id] = updatedFormElement
        let formIsValid = true;
        for(let id  in updatedOrderForm) {
            formIsValid = updatedOrderForm[id].valid && formIsValid
        }
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        })

    }

        render() {

            const formElementArray = []
            for(let key in this.state.orderForm) {
                formElementArray.push({
                    id: key,
                    config: this.state.orderForm[key]
                })
            }
            
            const formElement = formElementArray.map((formElement) => {
                    return <Input  key={formElement.id}
                            elementConfig={formElement.config.elementConfig} 
                            value={formElement.config.value}
                            onChange={(event) => this.inputChangeHandler(event, formElement.id)}
                            label={formElement.id}
                            invalid={!formElement.config.valid}
                            touched={formElement.config.touched}
                            shouldValidate={formElement.config.validation} />
                    })
            
            return (
            <Aux>
                <OrderSummary price={this.state.totalPrice} quantity={this.state.totalQuantity} cart={this.state.cart}/>
                <div className={classes.ContactData}>
                    <h4>Enter contact data</h4>
                    <form onSubmit={this.clickedButtonHandler}>
                        {formElement}
                        <Button disabled={!this.state.formIsValid}>Place Order</Button>
                    </form>
                </div>
            </Aux>
            );
        }
    }

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderButtonClick: (orderData, token) => dispatch(actions.purchaseStart(orderData, token))
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))
// export default ContactData
