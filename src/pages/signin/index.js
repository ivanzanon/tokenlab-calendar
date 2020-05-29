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

            // <div className="div-signin">
            //     <form onSubmit={this.handleInputSubmit}>
            //         {this.state.message && <p>{this.state.message}</p>}
            //         <input 
            //             type="text"
            //             placeholder="Nome"
            //             name="usr_name"
            //             onChange={e => this.setState({usr_name: e.target.value}) }
            //         />
            //         <input 
            //             type="text"
            //             placeholder="Usuário"
            //             name="usr_login"
            //             onChange={e => this.setState({usr_login: e.target.value}) }
            //             onLostPointerCapture={ e => alert("Saiu!")}
            //         />
            //         <input
            //             type="password"
            //             placeholder="Senha"
            //             name="usr_password"
            //             onChange={e => this.setState({usr_password: e.target.value}) }
            //         />
            //         <input className="enviar" type="submit" value="Cadastrar" />
            //     </form>

            // </div>
         )
    }
}