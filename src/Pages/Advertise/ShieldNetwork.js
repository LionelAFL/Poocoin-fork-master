
import React, { Component } from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import InLineLink from '../../Component/InLineLink';
import '../../css/advertise.css';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, Grid, Hidden } from '@material-ui/core';
import shield_network_logo_horizontal from '../../Images/shield_network_logo_horizontal.png';
const useStyles = makeStyles((theme) => ({
    connect: {
        textTransform: 'none',
        fontSize: '1rem',
        fontWeight: '500',
        color: theme.palette.common.white,
        backgroundColor: '#53CA42',
    },
}));
export default function ShieldNetwork() {
    const classes = useStyles();

    return (
        <div className={'mt3'}>
            <Card className={'Card'}>
                <a href="https://www.shieldnetwork.io/">
                    <img src={shield_network_logo_horizontal} width="150" />
                </a>
                <hr />
                <p>
                    <InLineLink
                        url="https://www.shieldnetwork.io/"
                        text="Website "
                        fontSize="1rem"
                    />|
                    <InLineLink
                        url="https://t.me/shieldnetio/"
                        text=" Telegram "
                        fontSize="1rem"
                    />
                </p>
                <p>
                    Shield Network strives to become the principal pre-audited cryptocurrency token launchpad. Our central purpose is to expose scam projects, guarantee safety to investors, and instill confidence in the cryptocurrency market in its entirety.
                </p>
                <p>
                    Current Premium Smart Contract Pricing: 4500-6500 USD. This includes full independent smart contract review by (3) solidity developers, a full/detailed medium article writeup regarding the project and the audit outcomes, as well as a published video for project marketing purposes.
                </p>
                <p>
                    Our smart contract auditing protocol checks that all functions are present, all events are present, functions return the correct type, functions that must be viewed are viewed, event parameters correctly indexed, functions emit the events, and derived contracts do not break the conformance.
                </p>
                <p>
                    Our smart contract auditing protocol checks that all functions are present, all events are present, functions return the correct type, functions that must be viewed are viewed, event parameters correctly indexed, functions emit the events, and derived contracts do not break the conformance.
                </p>
                <div className={'mb3'} style={{ maxWidth: '600px' }}>
                    <div style={{ padding: '56.25% 0px 0px', position: 'relative' }}>
                        <iframe src="https://player.vimeo.com/video/559179414?title=0&byline=0&portrait=0" frameBorder="0" style={{ position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%' }}></iframe>
                    </div>
                    <script src="https://player.vimeo.com/api/player.js"></script>
                </div>
                <div className={'AuditsIframe'}>
                    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfjsH3FEDzLcmgMgkOW-JjwAujeUCs2iKQfaBW19Bo-pMUBXw/viewform?embedded=true" width="100%" height="1150" frameBorder="0"></iframe>
                </div>
            </Card>
        </div>
    )
}
