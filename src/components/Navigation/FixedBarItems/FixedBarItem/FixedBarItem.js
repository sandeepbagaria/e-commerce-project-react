import React from 'react'

const fixedBarItem = (props) => {
    return (
        <div onClick={props.clicked}>{props.productCategory}</div>
    );
}

export default fixedBarItem