import React from 'react'
import classes from './FixedBarItems.css'
import FixedBarItem from './FixedBarItem/FixedBarItem'

const fixedBar = (props) => {

    const allCategoryArray = props.products.map((prod) => {
        return prod.category
    })

    const categoryArray = []
    let count = 0
    
    for(let i=0; i < allCategoryArray.length; i++) {
        count = 0
        for(let j=i;j<allCategoryArray.length;j++) {
            if(allCategoryArray[i] === allCategoryArray[j] ) {
                count++
            }
        }
        if(count === 1) {
            categoryArray.push(allCategoryArray[i])
        }
    }

    const category = categoryArray.map((element) => {
        return <FixedBarItem key={element} clicked={() => props.clickedCategory(element)} productCategory={element}/>
    })
    return (
        <div className={classes.FixedBar}>
            <div onClick={props.clickedAllCategory} >All Category</div>
            {category}
        </div>
    );
}

export default fixedBar