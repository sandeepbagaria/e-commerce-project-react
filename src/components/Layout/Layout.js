import React, { Component } from 'react'
import Aux from './../../hoc/Auxiliary/Auxiliary'
import classes from './Layout.css'
import Toolbar from './../Navigation/Toolbar/Toolbar'
import { connect } from 'react-redux'
   
class Layout extends Component {
    render() {
        return (
        <Aux>
            <Toolbar isAuth={this.props.isAuthenticated}/> 
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
        );
    }
} 

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Layout);