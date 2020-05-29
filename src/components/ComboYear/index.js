/**
 * @author Ivan Zanon
 * 
 * @description Component for a Combo with Year from 2000 to 2100
 */

import React from 'react';
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
  
  const classes = useStyles();
  
  return(
        <TextField className={classes.root}
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