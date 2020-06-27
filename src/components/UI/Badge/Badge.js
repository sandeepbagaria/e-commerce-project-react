import React from 'react'
import badgeImage from './../../../assets/Logo/badge.png'
import classes from './Badge.css'

const badge = (props) => {
    return (
        <div className={classes.Badge}>
            <img src={badgeImage} alt='cart'/>
            <div className={classes.Text}>
                <p>0</p>
            </div>
        </div>
    );
}

export default badge