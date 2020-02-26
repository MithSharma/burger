import React from 'react';
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const buildControls = ( props ) =>{

    const ingredients = [
        {name:"Salad",type:"salad"},
        {name:"Cheese",type:"cheese"},
        {name:"Bacon",type:"bacon"},
        {name:"Meat",type:"meat"}
    ]

    let buildControlsJSX = ingredients.map((ing)=>{
            return <BuildControl 
            key={ing.type} 
            name={ing.name} 
            added={()=>props.added(ing.type)} 
            removed={()=>props.removed(ing.type)}
            totalPrice={props.totalPrice}
            removeDisabled={props.removeDisabled[ing.type]}/>
    })

    return(
        <div className={classes.BuildControls}>
        <p className={classes.Bold}>Total price:{props.totalPrice.toFixed(2)}</p>
            {buildControlsJSX}
        <button className={classes.OrderButton} disabled={!props.disabled}>Order Now</button>
        </div>
    )
}

export default buildControls;