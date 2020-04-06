import React,{ Component} from 'react';
import Aux from './Aux';
import Modal from '../Components/UI/Modal/Modal';


const withErrorHandler = (WrappedComponent,axios) =>{
        return class extends Component {
            state ={
                error:null
            }
            componentDidMount () {
                this.reqInter = axios.interceptors.request.use(request =>{
                    this.setState({error:null});
                    return request;
                })
                this.resInter = axios.interceptors.response.use(null,error =>{
                    this.setState({error:error});
                })
            }
            componentWillUnmount (){
                axios.interceptors.request.eject(this.reqInter)
                axios.interceptors.request.eject(this.resInter)
            }

            hideModal =()=>{
                this.setState({error:false});
            }
           
            render(){
                return(
                    <Aux >
                        <Modal show={this.state.error ? true : false} onHide={this.hideModal}>
                            {this.state.error ? this.state.error.message : null}
                        </Modal>
                        <WrappedComponent  {...this.props} />
                    </Aux>
                    
                )
            }
        } 
}

export default withErrorHandler;