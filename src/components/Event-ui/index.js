import React, { useState } from 'react';
import api from '../../services/api';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { format } from 'date-fns';
import { MuiPickersUtilsProvider, } from '@material-ui/pickers';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow:1,
  },
  paper: {
    margin: theme.spacing(1),
  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
}));

export default function EventFormUi(props) {
    const classes = useStyles();

    const formatDateDefault = date => format(date, "yyyy-MM-dd'T'HH:mm");

    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(formatDateDefault(Date.now()));
    const [endDate, setEndDate] = useState(formatDateDefault(Date.now()));
    const [idUser, setIdUser] = useState(0);

    const eventUser = 
        {
            description: '',
            idUser: '',
            startDate: formatDateDefault(Date.now()),
            endDate: formatDateDefault(Date.now()),
        }

    const handleInputSubmit = async event => {
        event.preventDefault();

        console.log(eventUser);
        console.log(description);

        const event_ts = {
            description: description,
            idUser: props.idUser,
            start: startDate,
            end: endDate
        };

        if (props.eventId === 0) {
            await api.post('/events', event_ts);
        } else {
            await api.put(`/events/${props.eventId}`, event_ts);
        }

        setDescription('');
        setStartDate(formatDateDefault(Date.now()));
        setEndDate(formatDateDefault(Date.now()));

        if (props.afterSubmit != null) {
            props.afterSubmit();
        }

    }

    return (
    <Container component="main" maxWidth="lg">
        <CssBaseline />
        <div className={classes.paper}>
            <form 
                className={classes.form} 
                noValidate 
                onSubmit={handleInputSubmit}
            >
            <Grid container spacing={0} alignItems="flex-end" >
                <Grid item xs={12}>
                    <TextField
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        id="description"
                        label="Description"
                        name="descriprion"
                        autoFocus
                        value = {description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid item xs={6} >
                        <TextField
                            id="sart-date"
                            label="Início"
                            type="datetime-local"
                            className={classes.textField}
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                                }}
                        />
                    </Grid>
                    <Grid item xs={6} >
                        <TextField
                                id="end-date"
                                label="Fim"
                                type="datetime-local"
                                className={classes.textField}
                                value={endDate}
                                onChange={e => setEndDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                    }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Cadastrar
                </Button>
            </Grid>
            </form>
        </div>
    </Container>
  );
}