import React from 'react';
import logo from '../../Images/TokenIcons/logo2.png';
import Buttonicon from '../../Images/prmscan.png';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Input from '../../Component/TokenSelect';
import LanguageIcon from '@material-ui/icons/Language';
import TelegramIcon from '@material-ui/icons/Telegram';
import Switch from '../../Component/multichart/switch';
import Chart2 from '../../Component/basic/chart';
import TableTab from '../../Component/about/tabletab';
import SelectBox from '../../Component/about/select';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: '100%',
        backgroundColor: 'transparent'
    },
    selectBox: {
        color: 'rgb(51,51,51)',
        fontSize: 14,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    buttongrid: {
        textAlign: '-webkit-right',
    },
    button: {
        backgroundColor: '#303032',
        color: 'white',
        height: 35,
        marginLeft: 3
    },
    TokenSelect: {
        backgroundColor: 'white',
        marginLeft: 10
    }
}));

export default function Chart(props) {
    const classes = useStyles();

    const [token, setToken] = React.useState('');
    const handleChange = (event) => {
        setToken(event.target.value);
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid xs>
                        <Grid item style={{}}>
                            <p style={{ display: 'flex', color: 'white', textAlign: 'left', margin: 0, float: 'left' }}>
                                <img className={classes.img} src={logo} width="32" height="32" />
                                <span>
                                    Thoreum (THOREUM/BNB)
                                    <br />$0.0188328
                                </span>
                            </p>
                            <Grid style={{ float: 'left' }}>
                                <Input />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs >
                        <Grid className={classes.buttongrid} >
                            <Button className={classes.button}><img src={Buttonicon} width="18" height="18" /></Button>
                            <Button className={classes.button}>Trade</Button>
                            <Button className={classes.button}>A</Button>
                        </Grid>
                        <Grid className={classes.buttongrid}>
                            <Button style={{ color: 'white' }}><LanguageIcon style={{ color: 'white' }} />Website</Button>
                            <Button style={{ color: 'white' }}><TelegramIcon style={{ color: 'white' }} />Telegram</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={2} xs={12} style={{ marginTop: 15, flexFlow: 'row' }}>
                    <Button className={classes.button}>Reload</Button>
                    <SelectBox className={classes.selectBox} />
                    <Switch />
                </Grid>
                <Chart2 />
                <Grid xs={12} style={{ marginTop: 20 }}>

                    <TableTab />
                </Grid>
            </Paper>
        </div>
    );
}