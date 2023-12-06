import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import AdvertiseHeader from '../../Component/kuchain/AdvertiseHeader';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Banners from './Banners';

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: '2.5rem',
        fontWeight: '700',
        marginBottom: '1rem'
    },
    pageHeader: {
        backgroundColor: "#ffc107",
        height: "auto",
        padding: '10px',
        color: 'black',
        marginBottom: '20px',
    }
}));

export default function KuchainAdvertise() {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.pageHeader}>
                <h1 className={classes.title}>
                    Promote your token
                </h1>
            </div>
            <div className={'AdvertiseBody'}>
                <Router>
                    <AdvertiseHeader />
                    <Switch>
                        <Route path="/kuchainpromote" exact>
                            <Redirect to="/kuchainpromote/banners" />
                        </Route>
                        <Route path="/kuchainpromote/banners" exact component={Banners} />
                    </Switch>
                </Router>
            </div>
        </div>
    )
}
