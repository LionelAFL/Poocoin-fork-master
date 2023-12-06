import React, { useState } from 'react';
import { Button, OutlinedInput } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: 'white',
    height: '56px'
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 0,
    '&:hover': {
      backgroundColor: 'green'
    },
    minWidth: '25px'
  },
  Input: {
    width: '100%',
    display: 'flex',
    borderRadius: '.25rem',
    backgroundColor: 'white',
    '& .Mui-focused > .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #9fdcff!important',
      outline: 0,
      boxShadow: '0 0 0 .25rem rgba(62,184,255,.25)',
    },
    '& .MuiInputBase-root': {
      flexGrow: 1,
    }
  },
  tokenInput: {
    fontSize: '13px',
    '& .MuiOutlinedInput-input': {
      padding: '.75rem 0rem .75rem .75rem',
    },
    '& fieldset': {
      top: 0,
    }
  }
}));

export default function TokenInput({ inputHandle }) {
  const classes = useStyles();
  const [token, setToken] = useState("");

  const onTokenChange = (event) => {
    setToken(event.target.value);
  }

  return (
    <div className={classes.Input}>
      <OutlinedInput value={token} placeholder="Token Address..." name="webSite" onChange={onTokenChange} autoComplete="off" className={classes.tokenInput} style={{ fontSize: '13px!important' }} />
      <Button variant="contained" onClick={() => { inputHandle(token) }} className={classes.button}>Go</Button>
    </div>
  )
}