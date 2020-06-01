import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function LogOutButton(props) {
    
    const logoutHandler = event => {
        event.preventDefault();
        localStorage.removeItem('tokenlabCalendar/userID');
        localStorage.removeItem('tokenlabCalendar/token');

        props.routeHandler && props.routeHandler();
    }

    return (
        <IconButton 
            variant="contained"
            color="primary"
            onClick={logoutHandler}>
            <ExitToAppIcon fontSize="small" />
        </IconButton>
    )
}
