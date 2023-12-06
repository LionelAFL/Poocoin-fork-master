import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    textAlign: '-webkit-center',
    color: 'white'
  },
  
});

export default function Toilet () {
  const classes = useStyles();
  return (
      <div className={classes.root} >
          <h1>Toilet</h1>
          <h2>See the pending yield for your farms</h2>
          <Button variant="outlined" style={{color: 'white'}}>Connect Wallet</Button>
      </div>
  )
}