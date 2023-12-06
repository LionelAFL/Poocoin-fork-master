
import React, { Component } from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import InLineLink from '../../Component/InLineLink';
import '../../css/advertise.css';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, Grid, Hidden } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    connect: {
        textTransform: 'none',
        fontSize: '1rem',
        fontWeight: '500',
        color: theme.palette.common.white,
        backgroundColor: '#53CA42',
    },
}));
export default function Ctdsec() {
    const classes = useStyles();

    return (
        <div className={'mt3'}>
            <Card className={'Card'}>
                <CardHeader className={'mb3'} title="CTDSEC" />
                <hr />
                <p>
                    We will do a deep security audit of the project with a delivery in pdf format that include all the errors/bugs that we found and also providing support to fix them.
                </p>
                <div className={'AuditsIframe'}>
                    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSclRGE9bz9mGdItl35XPe8fOkGdhC7lgxHGHysuQqqcWf6mXw/viewform?embedded=true" width="100%" height="1150" frameBorder="0"></iframe>
                </div>
            </Card>
        </div>
    )
}
