import React from 'react';
import classes from './BuildControl.module.css';

const burgerControl = (props) =>{
        return(
                <div className={classes.BurgerControl}>
                    <div className={classes.Label}>{props.name}</div>
                    <button className={classes.More} onClick={props.added}>Add</button>
                    <button className={classes.Less} onClick={props.removed} disabled={props.removeDisabled}>Remove</button>
                </div>
        )
}

export default burgerControl;