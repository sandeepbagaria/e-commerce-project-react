import React from 'react'
import classes from './Input.css'

const input = (props) => {
    let validationError = null;
    const inputClasses = [classes.InputElement]

    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
        validationError = <p>Please enter a valid Value!</p>;
    }
        return  (
            <div className={classes.Input}>
                <label className={classes.Label}>{props.label}</label>
                <input className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.onChange} />
                {validationError}
            </div>
        );
}

export default input