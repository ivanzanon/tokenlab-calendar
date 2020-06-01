/**
 * @author Ivan Zanon
 * 
 * @description LogIn Page
 */

import React, {Component} from 'react';

import "./styles.css";
import api from '../../services/api';
import LoginUi from '../../components/LogIn-ui';

export default class Login extends Component{

    constructor(props) {
        super(props);

        this.state = {
            message: "",
            usr_name: "",
            usr_password: ""
        };

        this.handleInputSubmit = this.handleInputSubmit.bind(this);

    }

    handleChangePassword = event => {
        const target = event.target;
        const value = target.value;
        this.setState({
            usr_password: value
        });
    }

    handleChangeUserName = event => {
        const target = event.target;
        const value = target.value;
        this.setState({
            usr_name: value
        });
    }

    async handleInputSubmit(event) {
        event.preventDefault();

        const response = await this.login();
        
        if (response.auth) {
            localStorage.setItem("tokenlabCalendar/userID", response.idUser);
            localStorage.setItem("tokenlabCalendar/token", response.token);
            this.props.history.push("/main");
        } else {
            this.setState({
                message: "Usuário ou Senhas Inválidos."
            });
        }
        
    }

    login = async () => {
        const response = await api.post("/login", 
            {
                login: this.state.usr_name,
                password: this.state.usr_password
            }
        );
        const data = response.data;

        return data;
    }

    routeToSignIn = () => {
        this.props.history.push('/signin');
    }

    render() {
        return (

            <LoginUi 
                usernameHandler={this.handleChangeUserName}
                passwordHandler={this.handleChangePassword}
                loginHandler={this.handleInputSubmit} 
                signupHandler={this.routeToSignIn}
                message={this.state.message}/>

        )
    }
}