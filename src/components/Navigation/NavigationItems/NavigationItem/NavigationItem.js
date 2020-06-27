import React from 'react'
import {NavLink} from 'react-router-dom'
import classes from './NavigationItem.css'

const navigationItem = (props) => {
    return (
        <li className={classes.NavigationItem}>
            <NavLink to={props.link}
            exact
            activeClassName='my-active'
            activeStyle={{
                backgroundColor: '#c0c0c0',
                borderBottom: '4px solid #706e6e',  
                color: 'white',
            }}>
                {props.children}
            </NavLink>
        </li>
    );
}

export default navigationItem