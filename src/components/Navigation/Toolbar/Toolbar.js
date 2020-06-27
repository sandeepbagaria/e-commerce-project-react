import React from 'react'
import classes from './Toolbar.css'
import Logo from './../../Logo/Logo'
import NavigationItems from './../NavigationItems/NavigationItems'
//import Badge from './../../UI/Badge/Badge'

const toolbar = (props) => {
    
    return (
        <header className={classes.Toolbar}>
            <Logo toggle='logoImage'/>
            <Logo isAuthenticated={props.isAuth} toggle='cart'/>
            <nav className={classes.Nav}>
                <NavigationItems isAuthenticated={props.isAuth} />
            </nav>
        </header>
    );
}

export default toolbar