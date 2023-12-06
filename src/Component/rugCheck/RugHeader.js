/* eslint-disable jsx-a11y/alt-text */
import { React, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import '../../css/advertise.css';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import bscscan from '../../Images/prmscan.png';

const useStyles = makeStyles((theme) => ({
    HeaderBtn: {
        marginLeft: '.25rem!important',
        backgroundColor: '#000000',
        borderRadius: '.25rem!important',
        boxShadow: 'inset 0 1px 0 hsl(0deg 0% 100% / 15%), 0 1px 1px rgb(0 0 0 / 8%)',
        lineHeight: 1,
        textTransform: 'none',
        padding: '0px',
    },
    aTag: {
        padding: '11px',
    },
    imgBtn: {
        padding: 5
    }
}));
export default function AdvertiseHeader() {
    const classes = useStyles();
    let location = useLocation();
    const [alignment, setAlignment] = useState();
    if (alignment == undefined) {
        if (location.pathname == '/rugcheck/activity') {
            setAlignment('1');
        } else if (location.pathname == "/rugcheck/holders") {
            setAlignment('2');
        }
    }
    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };
    return (
        <div style={{ marginBottom: '1rem' }}>
            <div  style={{ textAlign: 'left', color: 'white', marginLeft: '1.3%', width: '100%' }}>
                <ToggleButtonGroup
                    exclusive
                    value={alignment}
                    onChange={handleAlignment}
                    aria-label="text alignment"
                >
                    <ToggleButton className={classes.HeaderBtn} value="1" aria-label="left aligned">
                        <Link className={classes.aTag} to="/rugcheck/activity">Dev Activity</Link>
                    </ToggleButton>
                    <ToggleButton className={classes.HeaderBtn} value="2" aria-label="centered">
                        <Link className={classes.aTag} to="/rugcheck/holders">Top Hoders</Link>
                    </ToggleButton>
                    <ToggleButton className={classes.HeaderBtn} value="3" aria-label="centered">
                        <a className={classes.imgBtn} href="https://prmscan.org/token/0x79c4af7c43f500b9ccba9396d079cc03dfcafda1" target="_blank" rel="noreferrer"><img src={ bscscan } style={{height: '25px'}}/></a>
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
        </div >
    )
}
