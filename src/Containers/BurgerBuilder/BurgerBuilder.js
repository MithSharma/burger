import React ,{ Component } from 'react';
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Aux from '../../hoc/Aux';
import Spinner from '../../Components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler';

const INGREDIENT_PRICES ={
    salad:.5,
    meat:1.3,
    cheese:.4,
    bacon:.7
}

class BurgerBuilder extends Component{

    state ={
        ingredients:null,
        totalprice:4,
        purchaseable:false,
        purchasing:false,
        loading:false
    }

    componentDidMount(){
        axios.get("/ingredients.json")
        .then(response =>{
            this.setState({ingredients:response.data})
        })
        .catch(error => console.log(error.message))
    }

    setModalShow = (bool) => {
        this.setState({purchasing:bool})
        console.log(this.state.purchasing);
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

    postDataHandler = () => {
        this.setState({loading:true});
        let post = {
            ingredients: this.state.ingredients,
            customer:{
                name:"mithelesh sharma",
                address:{
                    street:"kudlu date",
                    city:"bangalore"
                }
            },
            price:this.state.totalprice,
            delivery:"fastest"
        }
        axios.post("/orders",post)
        .then(response =>{
            this.setState({loading:false,purchasing:false});
            console.log(response)
        })
        .catch(error => {
            this.setState({loading:false,purchasing:false});
            console.log(error)
        })
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = (disabledInfo[key] <= 0);
        }
        let burger = <Spinner/>;
        let orderSummary =  <OrderSummary 
                price={this.state.totalprice}
                onHide={() => this.setModalShow(false)}
                onSave={this.postDataHandler}
                ingredients={this.state.ingredients} />;
        if(this.state.loading){
            orderSummary =  <Spinner/>;
        }

        if(this.state.ingredients){
             burger = (
                 <Aux>
                    <Burger  ingredients= {this.state.ingredients}/>
                    <BuildControls 
                    added= {this.addIngredientHandler} 
                    removed= {this.removeIngredientHandler}
                    totalPrice={this.state.totalprice}
                    disabled={this.state.purchaseable}
                    removeDisabled={disabledInfo}
                    setModalShow = {() => this.setModalShow(true)}/>
                </Aux>
                );
        }
        return(
            <div>
                <Modal show={this.state.purchasing}  > 
                   {orderSummary}
                </Modal>
                {burger}
            </div>
        )
    }
}

export default WithErrorHandler(BurgerBuilder,axios);