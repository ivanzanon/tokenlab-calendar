import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

import "./styles.css";
import api from '../../services/api';

export default class Main extends Component{

    constructor(props) {
        super(props);

        this.state = {
            message: '',
            username: '',
            idUser: localStorage.getItem('tokenlabCalendar/userID'),
            events: [],
            id_delete: ''
        }

    }

    async componentDidMount(req, res) {
        
        const token = localStorage.getItem('tokenlabCalendar/token');
        console.log('Token: '.concat(token));
        if (token == null || token === '') {
            this.props.history.push('/');
        }

        console.log('Pegando nome do Usuário');
        try{
            const response = await api.get(`/users/${this.state.idUser}`, this.getTokenHeader(token));
            console.log(response);
            const data = response.data;
            this.setState({username: data.name});
        } catch(error) {
            console.log(error);
        }

        console.log('Pegando eventos');
        try{
            const response = await api.get(`/calendar/${this.state.idUser}`, this.getTokenHeader(token));

            this.setState({events: response.data});
        } catch(error) {
            console.log(error);
        }
    }

    async componentDidUpdate(req, res) {
    }

    getTokenHeader = token => {
        const authString = 'Bearer '.concat(token);
        
        return {
            headers: {Authorization: authString}
        }
    }

    toDate = date_param => {
        const fmt_date = format(parseISO(date_param), "dd/MM/yyyy");
        const fmt_hour = format(parseISO(date_param), "HH:mm");

        return `${fmt_date} às ${fmt_hour}`;
    }

    deletar = async id => {
        const result = await api.delete(`/events/${id}`);
        if (result.data.number > 0) {
            this.setState({message: 'Registro excluído com sucesso'});
        }

        const token = localStorage.getItem('tokenlabCalendar/token');
        const response = await api.get(`/calendar/${this.state.idUser}`, this.getTokenHeader(token));
        this.setState({events: response.data});
    }

    logoutHandler = event => {
        event.preventDefault();
        console.log('Tentou logout');
        localStorage.removeItem('tokenlabCalendar/userID');
        localStorage.removeItem('tokenlabCalendar/token');
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="events-list">
                <p>
                    {this.state.username}
                </p>
                    <button 
                        onClick={this.logoutHandler}>LogOut</button>
                <p>
                    {this.state.message}
                </p>
                <Link className="adicionar" to='/form-event/0' >+</Link>
                {this.state.events.map(eve => (
                    <article key={eve.id}>
                        <div className="info">
                            <strong>{eve.description}</strong>
                            <br />
                            <strong>Início: {this.toDate(eve.start)}</strong>
                            <br />
                            <strong>Fim: {this.toDate(eve.end)}</strong>
                        </div>
                        <div className="operatos">
                            <button 
                                onClick={ () => {
                                    this.deletar(eve.id);
                                }
                                }>Excluir</button>                            
                            <Link className="botao-alterar"
                                to={`/form-event/${eve.id}`}>
                                Alterar
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        );
    }
}