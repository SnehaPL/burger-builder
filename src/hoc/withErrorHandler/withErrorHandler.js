import React, { Component } from 'react';

import Aux from '../Auxiliary.js';
import Modal from '../../components/UI/Modal/Modal.js';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount(){
            this.reqInterceptors = axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request;
            });

            this.resInterceptors = axios.interceptors.response.use(response => response, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }

        errorConfirmHandler= () =>{
            this.setState({error: null})
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                 </Aux>
            );
        }
    }
};

export default withErrorHandler;