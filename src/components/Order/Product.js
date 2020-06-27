import React from 'react'

const product = (props) => {
    return (
        <p>{props.name}({props.quantity}) </p>
    );
}

export default product