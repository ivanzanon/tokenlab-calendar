import React, {Component} from 'react';
//import {Link} from 'react-router-dom';

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

    render() {
        return (
            <div className="events-list">
                <h1>
                    {this.state.username}
                </h1>
                {this.state.events.map(event => (
                    <article key={event.id}>
                        <strong>{event.description}</strong>
                        <br />
                        <strong>{event.start}</strong>
                        <br />
                        <strong>{event.end}</strong>
                    </article>
                ))}
                {/* <Link to='/form-event' >+</Link> */}
            </div>
        );
    }
}