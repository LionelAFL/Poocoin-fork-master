import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

const useStyles = makeStyles({
  inLineLink: {
    color: '#3BAAEB'
  }
});

export default function CustomSelect(props) {
  const classes = useStyles();
  const [timeFrame, setTimeFrame] = React.useState(props.options);
  const handleChange = (newValue) => {
    setTimeFrame(newValue);
  };

  return (
    <select onChange={handleChange}>
      {/* timeFrame.forEach(element => {
            
        }); */}
    </select>
  )
}