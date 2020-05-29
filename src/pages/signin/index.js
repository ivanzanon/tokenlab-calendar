/**
 * 
 * @author Ivan Zanon
 * 
 * @description SignUp page
 * 
 * @todo: Show message for user existing
 * 
 */

import React, { Component } from 'react';
import './styles.css';
import api from '../../services/api'
import SignUpUi from '../../components/SignUp-ui';

    export default class SignIn extends Component {
        
        constructor (props) {
            super(props);
            
            this.state = {
                message: '',
                usr_name: '',
                usr_login: '',
                usr_password: ''
            }

    }

    handleInputSubmit = async (event) => {
        event.preventDefault();

        const result = await api.post("/userExists", { login: this.state.usr_login });

        if (result.data.exists) {
            this.setState({ message: 'Usuário já cadastrado.'});
        } else {
            await this.signIn();
            this.props.history.push('/');
        }
    }

    signIn = async () => {

        api.post("/users", {
            name: this.state.usr_name,
            login: this.state.usr_login,
            password: this.state.usr_password
        })
    }

    render() {
        return (

            <SignUpUi 
                signUpHandler={this.handleInputSubmit}
                nameHandler={e => this.setState({usr_name: e.target.value})}
                usernameHandler={e => this.setState({usr_login: e.target.value})}
                passwordHandler={e => this.setState({usr_password: e.target.value})}
                loginRouteHandler={e => this.props.history.push('/')}
            />

         )
    }
}