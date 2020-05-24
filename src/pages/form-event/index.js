import React, { Component } from 'react';

import "./styles.css";
import api from '../../services/api';

export default class Login extends Component{

    render() {
        return (
            <div className="div-form-event">
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

        );
    }
}