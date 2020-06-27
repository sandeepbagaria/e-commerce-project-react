import React, { Component } from 'react'
import Input from './../../components/UI/Input/Input'
import Button from './../../components/UI/Button/Button'
import classes from './Auth.css'
import * as actions from './../../store/actions/index'
import { connect } from 'react-redux'
import Aux from './../../hoc/Auxiliary/Auxiliary'
import Spinner from './../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom';


class Auth extends Component {

    state = {
        controls: {
            name: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            phone_no: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your mobile number'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            email: {
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your mail address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        isSignUp: true,
        newErrorCheck: true
    }

    componentDidMount() {
        this.setState({
            newErrorCheck: false
        })
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
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid
    }

    inputChangeHandler = (event, controlName) => {
       const updatedControls = {
           ...this.state.controls,
           [controlName]: {
               ...this.state.controls[controlName],
               value: event.target.value,
               valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
               touched: true
           }
       }
       this.setState({
           controls: updatedControls
       })
       
    }

    submitHandler = (event) => {
        this.newErrorChecTruekHandler()

        event.preventDefault();
        if(this.state.isSignUp) {
            this.props.onSignUp(this.state.controls.name.value, this.state.controls.phone_no.value, this.state.controls.email.value, this.state.controls.password.value)
        } else {
            this.props.onSignIn(this.state.controls.email.value, this.state.controls.password.value)
        }
    }

    signInClickedButtonHandler = () => {
        this.newErrorCheckFalseHandler()
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }

    newErrorChecTruekHandler = () => {
        this.setState({
            newErrorCheck: true
        })
    }

    newErrorCheckFalseHandler = () => {
        this.setState(prevState => {
            return {
                newErrorCheck: false
            }
        })
    }


    render() {
        let formElementArray = []
        for(let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        if(!this.state.isSignUp) {
            formElementArray = formElementArray.filter((element) => {
                return element.id === 'email' || element.id === 'password'
            })
        }

        let form = formElementArray.map((formElement) => {
            return <Input 
                       key={formElement.id}
                       elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value}
                        onChange={(event) => this.inputChangeHandler(event, formElement.id)}
                        label={formElement.id}
                        invalid={!formElement.config.valid}
                        touched={formElement.config.touched}
                        shouldValidate={formElement.config.validation} />
        })

        if(this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null

        if(this.state.newErrorCheck) {
            if(this.props.error) {
                errorMessage = (
                    <p style={{textAlign:'center', color:'red'}}>{this.props.error}</p>
                    )
                }
        }

        let authRedirect = null
        if(this.props.isAuthenticated) {
            authRedirect = <Redirect to='/' />
        }

        return (
            <Aux>
                <div className={classes.Auth}>
                    {authRedirect}
                    {errorMessage}
                    <form onSubmit={this.submitHandler}>
                        {this.state.isSignUp? <h2 style={{textAlign:'center',fontWeight:'bold',color:'green'}}>Enter your Sign-Up details</h2>: <h2 style={{textAlign:'center',fontWeight:'bold',color:'green'}}>Enter your Sign-In details</h2>}
                        {form}
                        <Button>{this.state.isSignUp? 'Sign-up': 'Sign-in'}</Button>
                    </form>
                </div>
                <div style={{textAlign:'center'}}>
                    <Button clickedButton={this.signInClickedButtonHandler}>{this.state.isSignUp? 'Sign-in': 'Sign-up'}</Button>
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignIn: (email, password) => dispatch(actions.signIn(email, password)),
        onSignUp: (name, phone_no, email, password) => dispatch(actions.signUp(name, phone_no, email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)