import React ,{ Component } from 'react';
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import { object } from 'prop-types';

const INGREDIENT_PRICES ={
    salad:.5,
    meat:1.3,
    cheese:.4,
    bacon:.7
}

class BurgerBuilder extends Component{

    state ={
        ingredients :{
            "meat":0,
            "salad":0,
            "cheese":0,
            "bacon":0
        },
        totalprice:4,
        purchaseable:false
    }

    addIngredientHandler=(type)=>{
        let updatedCount = this.state.ingredients[type] + 1; 

        let localIngrdient = {
            ...this.state.ingredients
        }
        localIngrdient[type] = updatedCount;
        let totalprice =  this.state.totalprice + INGREDIENT_PRICES[type];
        this.setState({ingredients:localIngrdient ,totalprice:totalprice})
        this.getUpdatedCountHandler(localIngrdient)
    }
    removeIngredientHandler=(type)=>{
        let updatedCount = this.state.ingredients[type] - 1; 

        let localIngrdient = {
            ...this.state.ingredients
        }
        if(localIngrdient[type] <= 0){
            return;
        }
        localIngrdient[type] = updatedCount;
        let totalprice =  this.state.totalprice - INGREDIENT_PRICES[type];
        this.setState({ingredients:localIngrdient,totalprice:totalprice })
        this.getUpdatedCountHandler(localIngrdient)
    }

    getUpdatedCountHandler= (ingredients) =>{
        let totalIngredientCount = Object.keys(ingredients).reduce((sum ,igKey)=>{
            return sum + ingredients[igKey];
        },0);
        this.setState({purchaseable:(totalIngredientCount > 0)})
    }
    getIngredientCountHandler=(type)=>{
        return this.state.ingredients[type]>0
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = (disabledInfo[key] <= 0);
        }
        console.log(disabledInfo)
        return(
            <div>
                <Burger  ingredients= {this.state.ingredients}/>
                <BuildControls 
                added= {this.addIngredientHandler} 
                removed= {this.removeIngredientHandler}
                totalPrice={this.state.totalprice}
                disabled={this.state.purchaseable}
                removeDisabled={disabledInfo}/>
            </div>
        )
    }
}

export default BurgerBuilder;