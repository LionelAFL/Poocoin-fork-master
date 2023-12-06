import React from 'react';

import InLineLink from '../Component/InLineLink';

import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent } from '@material-ui/core';
import { useTheme } from "@material-ui/styles";

import Gemit from '../Images/gemit.png'
import Slothi from '../Images/slothi.png'
import Notsafemoon from '../Images/notsafemoon.png'
import Waterfall from '../Images/waterfall.png'
import GemProtocol from '../Images/gem-protocol.png'
import Ach from '../Images/ach.jpg'
import Moonlight from '../Images/moonlight.png'
import Pogged from '../Images/pogged.png'
import Moonarcht from '../Images/moonarch.png'

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: '-webkit-center',
    color: 'white'
  },
  card: {
    maxWidth: '1116px',
    backgroundColor: '#303032',
    padding: '0 10px',

    color: 'white',
    [theme.breakpoints.down("lg")]: {
      maxWidth: '936px'
    },
    [theme.breakpoints.down("md")]: {
      maxWidth: '696px'
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: '516px'
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: '476px'
    },
  },
  childCard: {
    maxWidth: '95%',
    backgroundColor: '#000000',
    padding: '0 10px',
    marginBottom: '10px',
    color: 'white',
    [theme.breakpoints.down("lg")]: {
      maxWidth: '95%'
    },
    [theme.breakpoints.down("md")]: {
      maxWidth: '95%'
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: '95%'
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: '85%'
    },
  },
}));

const bscToolImageList = [Gemit, Slothi, Notsafemoon, Waterfall, GemProtocol, Ach, Moonlight, Pogged, Moonarcht];
const bscToolTitleList = ['Gemit', 'Slothi', 'Notsafemoon', 'Waterfall', 'GemProtocol', 'Ach', 'Moonlight', 'Pogged', 'Moonarcht'];
const bscToolLinkList = ['https://waterfallbot.info/', 'https://waterfallbot.info/', 'https://waterfallbot.info/', 'https://waterfallbot.info/', 'https://waterfallbot.info/', 'https://waterfallbot.info/', 'https://waterfallbot.info/', 'https://waterfallbot.info/', 'https://waterfallbot.info/'];
const bscToolDescList = [
  'Telegram bot for multi-chain Ethereum, BSC, Polygon, Solana, Fantom, Avalanche, TomoChain. Provides realtime trades, price, circulating, marketcap and much more ...',
  'Telegram bot for multi-chain Ethereum, BSC, Polygon, Solana, Fantom, Avalanche, TomoChain. Provides realtime trades, price, circulating, marketcap and much more ...',
  'Telegram bot for multi-chain Ethereum, BSC, Polygon, Solana, Fantom, Avalanche, TomoChain. Provides realtime trades, price, circulating, marketcap and much more ...',
  'Telegram bot for multi-chain Ethereum, BSC, Polygon, Solana, Fantom, Avalanche, TomoChain. Provides realtime trades, price, circulating, marketcap and much more ...',
  'Telegram bot for multi-chain Ethereum, BSC, Polygon, Solana, Fantom, Avalanche, TomoChain. Provides realtime trades, price, circulating, marketcap and much more ...',
  'Telegram bot for multi-chain Ethereum, BSC, Polygon, Solana, Fantom, Avalanche, TomoChain. Provides realtime trades, price, circulating, marketcap and much more ...',
  'Telegram bot for multi-chain Ethereum, BSC, Polygon, Solana, Fantom, Avalanche, TomoChain. Provides realtime trades, price, circulating, marketcap and much more ...',
  'Telegram bot for multi-chain Ethereum, BSC, Polygon, Solana, Fantom, Avalanche, TomoChain. Provides realtime trades, price, circulating, marketcap and much more ...',
  'Telegram bot for multi-chain Ethereum, BSC, Polygon, Solana, Fantom, Avalanche, TomoChain. Provides realtime trades, price, circulating, marketcap and much more ...',
];
const IndexList = [...Array(bscToolTitleList.length).keys()];

export default function ExternalTools() {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className={classes.root} >
      <h1>External Tools</h1>
      <Card className={classes.card}>
        <CardContent>
          <h1>Other websites with useful BSC Tools</h1>
          <p style={{ textAlign: '-webkit-left', marginLeft: '30px' }}>
            Apply to list your website. Send an email to
            <InLineLink
              url="mailto://promotions@poocoin.app"
              text="promotions@poocoin.app"
            ></InLineLink>
          </p>
          {
            IndexList.map((Index, ind) => (
              <Card className={classes.childCard}>
                <CardContent>
                  <Container style={{ padding: '10px' }}>
                    <Grid container>
                      <Grid item sm={3} xs={3}>
                        <img src={bscToolImageList[Index]} style={{ width: '90%' }}></img>
                      </Grid>
                      <Grid item sm={9} xs={12}>
                        <div style={{ textAlign: '-webkit-left' }}>
                          <h3 style={{ display: 'inline-block' }}>{bscToolTitleList[Index]} </h3>&nbsp;
                          <InLineLink text={bscToolLinkList[Index]} url='https://www.gemit.app/'></InLineLink><br></br>
                          <p>{bscToolDescList[Index]}</p>
                        </div>
                      </Grid>
                    </Grid>
                  </Container>
                </CardContent>
              </Card>
            ))}
        </CardContent>
      </Card>
    </div>
  )
}