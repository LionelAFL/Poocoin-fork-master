import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function Switches() {
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      {/* <Switch
        checked={state.checkedA}
        onChange={handleChange}
        name="checkedA"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
        style={{color: 'white'}}
      > Single blocks </Switch> */}
      <FormControlLabel
        control={<Switch checked={state.checkedA} onChange={handleChange} color="primary" name="checkedA" inputProps={{ 'aria-label': 'secondary checkbox' }} />}
        label="Single blocks" style={{ color: 'white', marginLeft: 0 }}
      />
      <FormControlLabel
        control={<Switch checked={state.checkedB} onChange={handleChange} color="primary" name="checkedB" inputProps={{ 'aria-label': 'primary checkbox' }} />}
        label="Show trades" style={{ color: 'white' }}
      />
    </div>
  );
}