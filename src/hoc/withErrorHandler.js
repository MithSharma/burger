import React,{ Component} from 'react';
import Aux from './Aux';
import Modal from '../Components/UI/Modal/Modal';


const withErrorHandler = (WrappedComponent,axios) =>{
        return class extends Component {
            state ={
                error:null
            }
            componentDidMount () {
                axios.interceptors.request.use(request =>{
                    this.setState({error:null});
                })
                axios.interceptors.response.use(null,error =>{
                    this.setState({error:error});
                })
            }
            hideModal = () =>{
                this.setState({error:null});
            }
            render(){
                return(
                    <Aux onClick={this.hidemodal}>
                        <Modal show={this.state.error}>
                            {this.state.error ? this.state.error.message : null}
                        </Modal>
                        <WrappedComponent  {...this.props} />
                    </Aux>
                    
                )
            }
        } 
}

export default withErrorHandler;