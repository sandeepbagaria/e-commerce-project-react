import React from 'react'
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/' active>Main Page</NavigationItem>
            {props.isAuthenticated? <NavigationItem link='/logout' active>Logout</NavigationItem> : <NavigationItem link='/auth' active>Login</NavigationItem> }
            {props.isAuthenticated? <NavigationItem link='/orders' active>Orders</NavigationItem> : null}
        </ul>
    );
}

export default navigationItems