import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from './Burger.module.css';
const burger = ( props ) =>{

    let transformedIngredient = Object.keys(props.ingredients).map(igkey =>{
    
        return [...Array(props.ingredients[igkey])].map((_,i) =>{
                return <BurgerIngredient key={igkey + i} type={igkey}/>
        })
    }).reduce((arr,el)=>{
        return arr.concat(el);
    },[]).reduce((arr,el)=>{
        return arr.concat(el);
    },[]);

    if(transformedIngredient.length === 0){
        transformedIngredient = <strong>Please add some ingredients here</strong>;
    }


    console.log(transformedIngredient)
    return(
        <div className={classes.Container}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredient}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default burger;