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
            // <div className="div-login">
            //     <form onSubmit={this.handleInputSubmit}>
            //         {this.state.message && <p>{this.state.message}</p>}
            //         <input 
            //             type="text"
            //             placeholder="Usuário"
            //             name="usr_name"
            //             value={this.state.usr_name}
            //             onChange={this.handleInputChange} 
            //         />
            //         <input
            //             type="password"
            //             placeholder="Senha"
            //             name="usr_password"
            //             value={this.state.usr_password}
            //             onChange={this.handleInputChange} 
            //         />
            //         <Button onClick={this.handleInputSubmit} variant="contained" color="primary">Enviar</Button>
            //         <Button onClick={this.routeToSignIn}  variant="contained" color="primary">SignIn</Button>
            //     </form>


            // </div>

                // <div className="form-structor">
            //     <div className="signup">
            //         <h2 className="form-title" id="signup"><span>or</span>Sign up</h2>
            //         <div className="form-holder">
            //             <input type="text" className="input" placeholder="Name" />
            //             <input type="email" className="input" placeholder="Email" />
            //             <input type="password" className="input" placeholder="Password" />
            //         </div>
            //         <button className="submit-btn">Sign up</button>
            //     </div>
            //     <div className="login slide-up">
            //         <div className="center">
            //             <h2 className="form-title" id="login"><span>or</span>Log in</h2>
            //             <div className="form-holder">
            //                 <input type="email" className="input" placeholder="Email" />
            //                 <input type="password" className="input" placeholder="Password" />
            //             </div>
            //             <button class="submit-btn">Log in</button>
            //         </div>
            //     </div>
            // </div>

        )
    }
}