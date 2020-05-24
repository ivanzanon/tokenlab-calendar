import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { format, parseISO } from 'date-fns';

import "./styles.css";
import api from '../../services/api';

export default class Main extends Component{

    constructor(props) {
        super(props);

        this.state = {
            username: localStorage.getItem('tokenlabCalendar/username'),
            idUser: localStorage.getItem('tokenlabCalendar/userID'),
            events: []
        }
    }

    async componentDidMount(req, res) {
        const response = await api.get(`/calendar/${this.state.idUser}`);

        console.log(response.data);

        this.setState({events: response.data});
    }

    toDate = date_param => {
        const fmt_date = format(parseISO(date_param), "dd/MM/yyyy");
        const fmt_hour = format(parseISO(date_param), "hh:mm");

        return `${fmt_date} às ${fmt_hour}`;
    }

    render() {
        return (
            <div className="events-list">
                <p>
                    {this.state.username}
                </p>
                {this.state.events.map(event => (
                    <article key={event.id}>
                        <strong>{event.description}</strong>
                        <br />
                        <strong>Início: {this.toDate(event.start)}</strong>
                        <br />
                        <strong>Fim: {this.toDate(event.end)}</strong>
                    </article>
                ))}
                <Link to='/form-event' >+</Link>
            </div>
        );
    }
}