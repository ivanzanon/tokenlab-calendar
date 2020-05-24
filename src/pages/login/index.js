import React, {Component} from 'react';
//import {Link} from 'react-router-dom';

import "./styles.css";
import api from '../../services/api';

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

    async handleInputSubmit(event) {
        event.preventDefault();

        const data = await this.login();
        
        if (data.result === 1) {
            localStorage.setItem("tokenlabCalendar/username", this.state.usr_name);
            localStorage.setItem("tokenlabCalendar/userID", data.idUser);
            this.props.history.push("/main");
        } else {
            this.setState({
                message: "Erro na senha tenta de novo!"
            })
        }
        
    }

    login = async () => {

        const { data } = await api.post("/login", 
            {
                name: this.state.usr_name,
                password: this.state.usr_password
            }
        );

        return data;
    }

    render() {
        return (
            <div className="div-login">
                <form onSubmit={this.handleInputSubmit}>
                    {this.state.message && <p>{this.state.message}</p>}
                    <input 
                        type="text"
                        placeholder="Usuário"
                        name="usr_name"
                        value={this.state.usr_name}
                        onChange={this.handleInputChange} 
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        name="usr_password"
                        value={this.state.usr_password}
                        onChange={this.handleInputChange} 
                    />
                    <input className="enviar" type="submit" value="Enviar" />
                </form>

            </div>
        )
    }
}