import React, { Component } from 'react';
import { format, 
        parseISO, 
        startOfMonth, 
        endOfMonth,
        isBefore,
        addDays
        } from 'date-fns';
import "./styles.css";
import api from '../../services/api';
import EventFormUi from '../../components/Event-ui';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export default class Main extends Component{

    constructor(props) {
        super(props);

        this.state = {
            message: '',
            username: '',
            idUser: localStorage.getItem('tokenlabCalendar/userID'),
            events: [],
            id_delete: '',
            token: localStorage.getItem('tokenlabCalendar/token'),
            checked: false,
            calendar: []
        }

    }

    async componentDidMount(req, res) {
        
        const token = this.state.token;

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
        console.log("================MONTANADO CALENDARIO ========================");
        const firstDOTM = startOfMonth(Date.now());
        const lastDOTM = endOfMonth(Date.now());
 
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
        try{
            const response = await api.get(`/calendar/${this.state.idUser}`, this.getTokenHeader(token));
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
        if (result.data.number > 0) {
            this.setState({message: 'Registro excluído com sucesso'});
        }

        this.getEvents();
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

    afterSubmit = () => { 
        this.setState({checked: false});
        this.getEvents();
        this.mountCalendarObject();
    }

    render() {
        return (
            <div className="events-list">

                {/* // Friendly User Name */}
                <Typography variant="h2">
                    {this.state.username}
                </Typography>
                <p>
                    {this.state.message}
                </p>

                {/* //Controls to Event Form */}
                <IconButton 
                    variant="contained"
                    color="primary"
                    onClick={this.formShowHandler}>
                    <AddIcon fontSize="large" />
                </IconButton>
                <FormControlLabel
                    control={<Switch checked={this.state.checked} 
                        onChange={this.formShowHandler} />}
                    label=""
                />

                {/* //Logout Button */}
                <IconButton 
                    variant="contained"
                    color="primary"
                    onClick={this.logoutHandler}>
                    <ExitToAppIcon fontSize="large" />
                </IconButton>

                {/* //Form with Event data */}
                <Collapse in={this.state.checked} >
                    <EventFormUi 
                        eventId={0}
                        idUser={this.state.idUser}
                        afterSubmit={this.afterSubmit}/>
                </Collapse>

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
                                                    color="primary" >
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


                {/* {this.state.events.map(eve => (
                    <Paper key={eve.id}>
                        <div className="info">
                            <strong>{eve.description}</strong>
                            <br />
                            <strong>Início: {this.toDate(eve.start)}</strong>
                            <br />
                            <strong>Fim: {this.toDate(eve.end)}</strong>
                        </div>
                        <div className="operatos">
                            <IconButton 
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    this.deletar(eve.id);
                                }}>
                                <DeleteIcon fontSize="default" />
                            </IconButton>
                            <IconButton 
                                variant="contained"
                                color="primary" >
                                <EditIcon fontSize="default" />
                            </IconButton>
                             <Link className="botao-alterar"
                                to={`/form-event/${eve.id}`}>
                                Alterar
                            </Link>
                        </div>
                    </Paper>
                ))} */}
            </div>
        );
    }
}