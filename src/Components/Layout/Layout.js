import React from 'react';
import Aux from '../../hoc/Aux'
import BurgerBuilder from '../../Containers/BurgerBuilder/BurgerBuilder';
import classes from './Layout.module.css'

const layout = (props) =>{
    return(
        <Aux>
            <div className={classes.toolbar}>
            <div>TOOLBAR</div><div>LOGO</div><div>BACKDROP</div>
            </div>
            <BurgerBuilder />
        </Aux>
    )
}

export default layout;