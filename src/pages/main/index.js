/**
 * @author Ivan Zanon
 * 
 * @description Main page of the Calendar Application. Shows the Calendar and Manges Events.
 * 
 */

import React, { Component } from 'react';
import { format, 
        parseISO, 
        startOfMonth, 
        endOfMonth,
        isBefore,
        addDays, getMonth, getYear
        } from 'date-fns';
import "./styles.css";
import api from '../../services/api';
import EventFormUi from '../../components/Event-ui';
import ComboMonth from '../../components/ComboMonth';
import ComboYear from '../../components/ComboYear';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export default class Main extends Component{

    constructor(props) {
        super(props);

        this.state = {
            message: '',
            username: '',
            idUser: localStorage.getItem('tokenlabCalendar/userID'),
            token: localStorage.getItem('tokenlabCalendar/token'),
            events: [],
            id_delete: '',
            checked: false,
            calendar: [],
            month: getMonth(Date.now()),
            year: getYear(Date.now()),
            idEvent: 0
        }

    }

    async componentDidMount(req, res) {
        
        const token = this.state.token;
        console.log(this.state);

        if (token == null || token === '') {
            this.props.history.push('/');
        }

        // Recovering friendly user name from API
        try{
            const response = await api.get(`/users/${this.state.idUser}`, this.getTokenHeader(token));
            console.log(response);
            const data = response.data;
            this.setState({username: data.name});
        } catch(error) {
            console.log(error);
        }

        // Recovering events from API
        await this.getEvents();

        this.mountCalendarObject();

    }

    mountCalendarObject = () => {
        //Montagem o calendário
        const data_i = parseISO(`${this.state.year}-0${this.state.month}-02`);

        const firstDOTM = startOfMonth(data_i);
        const lastDOTM = endOfMonth(data_i);
 
        var actualDOTM = firstDOTM;

        const arrDays = [];

        const eventList = this.state.events;

        while (isBefore(actualDOTM, lastDOTM)) {
            
            const filteredList = eventList.filter(item => 
               format(parseISO(item.start), "dd/MM/yyyy") === format(actualDOTM, "dd/MM/yyyy")
            );

            arrDays.push({
                    day: format(actualDOTM, "dd"),
                    date: format(actualDOTM, "dd/MM/yyyy"),
                    events: filteredList
                });

            actualDOTM = addDays(actualDOTM, 1);
        }

        console.log(eventList);
        console.log(arrDays);
        this.setState({calendar: arrDays});
    }

    getEvents = async () => {
        const token = this.state.token;
        const date_format = `${this.state.year}-0${this.state.month}-02`;
        console.log(date_format);
        try{
            const params = {
                date: date_format,
                user: this.state.idUser
            };
            const response = await api.post(`/calendar/`, this.getTokenHeader(token), params);
            this.setState({events: response.data});
        } catch(error) {
            console.log(error);
        }
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

        await this.getEvents();
        this.mountCalendarObject();
    }

    editHandler = async id => {
        this.setState({idEvent : id});
        this.setState({checked : true});
    }

    logoutHandler = event => {
        event.preventDefault();
        console.log('Tentou logout');
        localStorage.removeItem('tokenlabCalendar/userID');
        localStorage.removeItem('tokenlabCalendar/token');
        this.props.history.push('/');
    }

    formShowHandler = () => {
        console.log(this.state.checked);
        const show = this.state.checked;
        this.setState({checked: !show});
        console.log(this.state.checked);
    }

    afterSubmit = async () => { 
        this.setState({checked: false});
        await this.getEvents();
        this.mountCalendarObject();
    }

    render() {
        return (
            <div className="events-list">

                <Grid container >
                    <Grid item xs={11}>
                        {/* // Friendly User Name */}
                        <Typography variant="h2">
                            {this.state.username}
                        </Typography>
                        <p>
                            {this.state.message}
                        </p>
                    </Grid>
                    <Grid item xs={1}>
                        {/* //Logout Button */}
                        <IconButton 
                            variant="contained"
                            color="primary"
                            onClick={this.logoutHandler}>
                            <ExitToAppIcon fontSize="small" />
                        </IconButton>

                    </Grid>
                </Grid>

                {/* //Controls to Event Form */}
                <IconButton 
                    variant="contained"
                    color="primary"
                    onClick={this.formShowHandler}>
                    <AddIcon fontSize="large" />
                </IconButton>

                {/* //Form with Event data */}
                <Collapse in={this.state.checked} >
                    <EventFormUi 
                        idUser={this.state.idUser}
                        afterSubmit={this.afterSubmit}
                        eventId={this.state.idEvent}/>
                </Collapse>

                <div className='events-list'>
                    <Paper>
                        <ComboMonth
                            value={this.state.month}
                            changeHandler={async e => {
                                await this.setState({month : e.target.value});
                                await this.getEvents();
                                this.mountCalendarObject();
                            }
                            } />
                        <ComboYear
                            value={this.state.year}
                            changeHandler={e => this.setState({year : e.target.value})} />
                    </Paper>
                </div>

                {/* // List of Days */}
                {this.state.calendar.map(day => (
                    <Paper key={day.day}>
                        <Grid container spacing={1}>
                            <Grid item xs={1}>
                                <strong>{day.day}</strong>
                            </Grid>
                            <Grid item xs={11} >

                                {/* List of Events */}
                                {day.events.map(eve =>
                                    <Paper key={eve.id}>
                                        <Grid container>
                                            <Grid item xs={11}>
                                                <strong>{eve.description}</strong>
                                                <br />
                                                <strong>{`De ${format(parseISO(eve.start), 'HH:mm')} até ${format(parseISO(eve.end), 'HH:mm')}`}</strong>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <IconButton 
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => {
                                                        this.deletar(eve.id);
                                                    }}>
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton 
                                                    variant="contained"
                                                    color="primary" 
                                                    onClick={() => {
                                                        this.editHandler(eve.id);
                                                    }}>
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                )}
                            </Grid>
                        </ Grid>
                    </Paper>
                ))}
            </div>
        );
    }
}