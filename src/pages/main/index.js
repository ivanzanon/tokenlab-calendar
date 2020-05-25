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
            username: localStorage.getItem('tokenlabCalendar/username'),
            idUser: localStorage.getItem('tokenlabCalendar/userID'),
            events: [],
            id_delete: ''
        }

    }

    async componentDidMount(req, res) {
        const response = await api.get(`/calendar/${this.state.idUser}`);
        this.setState({events: response.data});
    }

    async componentDidUpdate(req, res) {
        const response = await api.get(`/calendar/${this.state.idUser}`);
        this.setState({events: response.data});
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
    }

    render() {
        return (
            <div className="events-list">
                <p>
                    {this.state.username}
                </p>
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
                            <Link
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