import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

  const monthList = [ 
            {description: "JAN", number: 1},
            {description: "FEV", number: 2},
            {description: "MAR", number: 3},
            {description: "ABR", number: 4},
            {description: "MAI", number: 5},
            {description: "JUN", number: 6},
            {description: "JUL", number: 7},
            {description: "AGO", number: 8},
            {description: "SET", number: 9},
            {description: "OUT", number: 10},
            {description: "NOV", number: 11},
            {description: "DEZ", number: 12}
        ];

export default function EventFormUi(props) {

    return(
        <TextField
            id="standard-select-currency"
            select
            label="Mês"
            value={props.value}
            onChange={props.changeHandler}
            >
            {monthList.map((option) => (
                <MenuItem key={option.number} value={option.number}>
                {option.description}
                </MenuItem>
            ))}
        </TextField>
    );
}