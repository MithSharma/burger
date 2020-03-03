import React from 'react';
import Aux from '../../hoc/Aux'
import {Button } from 'react-bootstrap';
import classes from './OrderSummary.module.css'

const orderSummary = ( props ) => {

    let orderedItems = Object.keys(props.ingredients).map(igkey=>{
        return (<li key={igkey}><span>{igkey}:</span><span>{props.ingredients[igkey]}</span></li>);
    });

    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious Burger witht he following ingredients:</p>
            <ul>
                {orderedItems}
            </ul>
            <p><strong>Total price:{props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <div className={classes.ModalFooter}>
                <Button onClick={props.onHide} variant="danger">Close</Button>
                <Button onClick={props.onHide} variant="success">Continue</Button>
            </div>
        </Aux>
    );
}

export default orderSummary;