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

  const yearList = getYearList();
  
  function getYearList()  {
    const years = [];

    for( var i = 2020; i <= 2100; i++) {
        years.push({year: i});
    }
    return(years);
  };

export default function EventFormUi(props) {

    return(
        <TextField
            id="standard-select-currency"
            select
            label="Ano"
            value={props.value}
            onChange={props.changeHandler}
            >
            {yearList.map((option) => (
                <MenuItem key={option.year} value={option.year}>
                {option.year}
                </MenuItem>
            ))}
        </TextField>
    );
}