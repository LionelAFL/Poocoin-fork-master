import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import AdvertiseHeader from '../Component/AdvertiseHeader';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Banners from './Advertise/Banners';
import UnVetted from './Advertise/UnVetted';
import Vetted from './Advertise/Vetted';
import Telegram from './Advertise/Telegram';
import Promotes from './Advertise/Promote';
import Audits from './Advertise/Audits';
const useStyles = makeStyles((theme) => ({
    title: {
        color: 'white',
        fontSize: '2.5rem',
        fontWeight: '700',
        marginBottom: '1rem'
    },
    iframeContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    responsiveIframe: {
        maxWidth: '100%',
        height: 'auto',
        border: '0px',
        padding: '0',
        paddingTop: '10px',
        overflow: 'hidden',
        backgroundColor: 'transparent'
    }
}));

export default function Advertise() {
    const classes = useStyles();

    return (
        <div className={'AdvertiseBody'}>
            <div className={classes.iframeContainer}>
                <iframe data-aa='2245859' src='//ad.a-ads.com/2245859?size=728x90' className={classes.responsiveIframe}></iframe>
            </div>
            <h1 className={classes.title}>
                Promote your token
            </h1>

            <Router>
                <AdvertiseHeader />
                <Switch>
                    <Route path="/advertise" exact>
                        <Redirect to="/advertise/banners" />
                    </Route>
                    <Route path="/advertise/banners" exact component={Banners} />
                    <Route path="/advertise/pricebot" component={Telegram} />
                    <Route path="/advertise/promotes" component={Promotes} />
                    {/*<Route path="/advertise/un-vetted" exact component={UnVetted} />
                    <Route path="/advertise/vetted" exact component={Vetted} />
                    <Route path="/advertise/audits" component={Audits} />*/}
                </Switch>
            </Router>
        </div>
    )
}
