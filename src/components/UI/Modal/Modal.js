import React, { Component } from 'react'
import classes from './Modal.css'
import Aux from './../../../hoc/Auxiliary/Auxiliary'
import Backdrop from './../Backdrop/Backdrop'

class Modal extends Component {

    render() {
        return (
            <Aux>
            <Backdrop show={this.props.show} cancelled={this.props.cancelled}/>
            <div className={classes.Modal} 
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show? 1: 0
                }}>
                {this.props.children}
            </div>
        </Aux>
        );
    }
}

export default Modal