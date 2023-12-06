import { React, useState } from 'react';
import Poocoin from './Poocoin';
import Achtools from './Achtools';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader } from '@material-ui/core';
import '../../css/advertise.css';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { BrowserRouter as Router, Switch, Route, Redirect, Link, useLocation } from "react-router-dom";
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
const useStyles = makeStyles((theme) => ({
    HeaderBtn: {
        marginLeft: '.25rem!important',
        backgroundColor: '#000000',
        borderRadius: '.25rem!important',
        boxShadow: 'inset 0 1px 0 hsl(0deg 0% 100% / 15%), 0 1px 1px rgb(0 0 0 / 8%)',
        lineHeight: 1,
        textTransform: 'none',
        padding: '0px'
    },
    aTag: {
        padding: '11px'
    }
}));
export default function Telegram() {
    const classes = useStyles();
    let location = useLocation();
    const [alignment, setAlignment] = useState();
    if (alignment == undefined) {
        if (location.pathname == '/advertise/pricebot/primalcoin') {
            setAlignment('1');
        } else if (location.pathname == '/advertise/pricebot') {
            setAlignment('1');
        } else if (location.pathname == '/advertise/pricebot/achtools') {
            setAlignment('2');
        }
    }
    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };
    return (
        <div>
            <Router>
                <Card className={'Card'} style={{ textAlign: 'left', color: 'white' }}>
                    <CardHeader style={{ marginBottom: '1rem', marginLeft: '5px' }} title="Price bots" />
                    <ToggleButtonGroup
                        exclusive
                        value={alignment}
                        onChange={handleAlignment}
                        aria-label="text alignment"
                    >
                        <ToggleButton className={classes.HeaderBtn} value="1" aria-label="right aligned">
                            <Link className={classes.aTag} to="/advertise/pricebot/primalcoin">Hamster Price Bot</Link>
                        </ToggleButton>
                        {/*<ToggleButton className={classes.HeaderBtn} value="2" aria-label="right aligned">
                            <Link className={classes.aTag} to="/advertise/pricebot/achtools">AchTools Price Bot</Link>
    </ToggleButton>*/}
                    </ToggleButtonGroup>
                </Card>
                <Switch>
                    <Route exact path="/advertise/pricebot">
                        <Redirect to="/advertise/pricebot/primalcoin" />
                    </Route>
                    <Route exact path="/advertise/pricebot/primalcoin" component={Poocoin} />
                    <Route exact path="/advertise/pricebot/achtools" component={Achtools} />
                </Switch>
            </Router>
        </div>
    )
}
