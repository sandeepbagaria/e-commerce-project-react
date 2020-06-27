import React from 'react' 
import classes from './Button.css'

const button = (props) => {
    return (
        <button className={classes.Button}
            disabled={props.disabled} 
            onClick={props.clickedButton}>
            {props.children}
        </button>
    );
}

export default button