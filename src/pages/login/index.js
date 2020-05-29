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

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputSubmit = this.handleInputSubmit.bind(this);

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleChangePassword = event => {
        console.log('Handler do Password');
        const target = event.target;
        const value = target.value;
        this.setState({
            usr_password: value
        });
    }

    handleChangeUserName = event => {
        console.log('Handler do Usuário');
        const target = event.target;
        const value = target.value;
        this.setState({
            usr_name: value
        });
    }

    async handleInputSubmit(event) {
        event.preventDefault();

        console.log(this.state);
        const data = await this.login();
        
        console.log(data);
        
        if (data.auth) {
            localStorage.setItem("tokenlabCalendar/userID", data.idUser);
            localStorage.setItem("tokenlabCalendar/token", data.token);
            this.props.history.push("/main");
        } else {
            this.setState({
                message: "Usuário ou Senhas Inválidos."
            })
        }
        
    }

    login = async () => {
        const { data } = await api.post("/login", 
            {
                login: this.state.usr_name,
                password: this.state.usr_password
            }
        );

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
                signupHandler={this.routeToSignIn}/>

        )
    }
}