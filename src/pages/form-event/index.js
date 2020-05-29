import React, { Component } from 'react';

import "./styles.css";
import api from '../../services/api';
import { format } from 'date-fns';

export default class FormEvent extends Component{

    constructor(props) {
        super(props);

        this.state = {
            message: '',
            eventID: 0,
            description: '',
            idUser: localStorage.getItem('tokenlabCalendar/userID'),
            start:  this.formatDateDefault(Date.now()),
            end: this.formatDateDefault(Date.now())
        }

    }

    formatDateDefault = date =>  format(date, "yyyy-MM-dd'T'hh:mm");

    async componentDidMount() {
        const eventId = this.props.match.params.id;

        if (eventId != 0) {
            const result = await api.get(`/events/${eventId}`);

            const {data} = result;

            this.setState ({
                message: '',
                eventID: eventId,
                description: data.description,
                idUser: localStorage.getItem('tokenlabCalendar/userID'),
                start: this.formatDateDefault(Date.parse(data.start)),
                end: this.formatDateDefault(Date.parse(data.end))
            });
        }
    }

    handleInputSubmit = async event => {
        event.preventDefault();

        const event_ts = {
            description: this.state.description,
            idUser: this.state.idUser,
            start: this.state.start,
            end: this.state.end
        };

        if (this.state.eventID === 0) {
            const result = await api.post('/events', event_ts);
        } else {
            const result = await api.put(`/events/${this.state.eventID}`, event_ts);
        }

        this.props.history.push('/main');
    }

    render() {
        return (
            <div className="div-form-event">
                <form onSubmit={this.handleInputSubmit}>
                    {this.state.message && <p>{this.state.message}</p>}
                    <label>
                        Descrição:
                        <input 
                            type="text"
                            placeholder="Descreva o evento."
                            name="description"
                            value={this.state.description}
                            onChange={e => this.setState({description: e.target.value})}
                        />
                    </label>
                    <br />
                    <label>
                        Início:
                        <input
                            type="datetime-local"
                            placeholder="Data e Hora de Início do evento"
                            name="start"
                            value={this.state.start}
                            onChange={e => this.setState({start: e.target.value})}
                        />
                    </label>
                    <label>
                        Fim:
                        <input
                            type="datetime-local"
                            placeholder="Data e Hora de Fim do evento"
                            name="end"
                            value={this.state.end}
                            onChange={e => this.setState({end: e.target.value})}
                        />
                    </label>
                    <input className="enviar" type="submit" value="Enviar" />
                </form>

            </div>

        );
    }
}