import React, { Component } from 'react'
import logoImage  from './../../assets/Logo/logoImage.jpg'
import cartLogo  from './../../assets/Logo/cartLogo.png'
import classes from './Logo.css'
import Aux from './../../hoc/Auxiliary/Auxiliary'
import { withRouter } from 'react-router-dom'

class Logo extends Component {

    clickedCartLogoHandler = () => {
        if(this.props.isAuthenticated) {
            this.props.history.push('/cart')
        } else {
            this.props.history.push('/auth')
        }
    }

    render() {
        return(
            <Aux>
            {this.props.toggle ==='cart'? 
            <div className={classes.Logo}>
               <button onClick={this.clickedCartLogoHandler}><img src={cartLogo} alt='MyCart' /></button> 
            </div>
            : 
            <div className={classes.Logo}>
               <img src={logoImage} alt='logo' />
            </div>
            }
        </Aux>
        );
    }
}

export default withRouter(Logo)