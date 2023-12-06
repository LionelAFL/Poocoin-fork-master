import React from 'react';

import Link from '@material-ui/core/Link';
import InLineLink from '../Component/InLineLink';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import clsx from 'clsx';
import useMediaQuery from "@material-ui/core/useMediaQuery";


import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from "@material-ui/styles";
import WalletTrack1 from '../Images/wallettrack1.png';
import WalletTrack2 from '../Images/wallettrack2.png';
import WalletTrack3 from '../Images/wallettrack3.png';
import BuySell from '../Images/buysell.png';
import TradingPreview from '../Images/trending-preview.png';


const useStyles = makeStyles(theme => ({
  root: {
    textAlign: '-webkit-center',
  },
  manual: {
    padding: '20px',
    backgroundColor: '#ffc107',
    color: '#000000',
    fontWeight: 600,
    // [theme.breakpoints.down("lg")]: {
    //   maxWidth: '1116px'
    // },
    // [theme.breakpoints.down("md")]: {
    //   maxWidth: '936px'
    // },
    // [theme.breakpoints.down("sm")]: {
    //   maxWidth: '696px'
    // },
    // [theme.breakpoints.down("xs")]: {
    //   maxWidth: '516px'
    // },
  },
  link: {
    color: 'blue',
    fontWeight: 500,
  },
  title: {
    color: 'white',
  },
  yellowText: {
    color: '#E8AB03'
  },
  yellowText: {
    color: 'blue'
  },
  normalText: {
    color: 'white',
  },
  greenText: {
    color: '#28843D',
  },
  whiteText: {
    color: 'white',
  },
  card1: {
    marginTop: '10px',
    maxWidth: '1116px',
    backgroundColor: '#303032',
    padding: '20px',
    [theme.breakpoints.down("lg")]: {
      maxWidth: '1116px'
    },
    [theme.breakpoints.down("md")]: {
      maxWidth: '936px'
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: '696px'
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: '516px'
    },
  },
  card2: {
    maxWidth: '1116px',
    backgroundColor: '#303032',
    padding: '20px',
    marginTop: '10px',
    [theme.breakpoints.down("lg")]: {
      maxWidth: '1116px'
    },
    [theme.breakpoints.down("md")]: {
      maxWidth: '936px'
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: '696px'
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: '516px'
    },
  },
  //checkbox css

  icon: {
    borderRadius: 3,
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  disabledLabel: {
    color: '#8E8F90'
  },
}));

// Inspired by blueprintjs
function StyledCheckbox(props) {
  const classes = useStyles();

  return (
    <Checkbox
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

export default function Tools() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root} >
      <div className={classes.manual}>
        <h1>Premium</h1>
        <p>
          The 8% transaction fee will apply to the POOCOIN used to create LP and again on removal of LP.
        </p>
        <p>
          Unlock premium tier 1 by holding <span className={classes.blueText}>$100</span> worth of &nbsp;
          <a target="_blank" href="https://exchange.primalswap.io/#/add/BNB/0xB27ADAfFB9fEa1801459a1a81B17218288c097cc" className={classes.link}>
            POOCOIN/BNB LP
          </a>
          <br></br>
          (approximately <strong>0.000010 POOCOIN/BNB LP</strong> created from 22.6297 &nbsp;
          <a target="_blank" href="https://poocoin.app/swap?outputCurrency=0xB27ADAfFB9fEa1801459a1a81B17218288c097cc" className={classes.link}>
            POOCOIN &nbsp;
          </a>
          and 0.1652 BNB)<br></br>
          tokens in your wallet.
        </p>
        <p>
          Unlock premium tier 2 by holding <span className={classes.greenText}>$300</span> worth of &nbsp;
          <a target="_blank" href="https://exchange.primalswap.io/#/add/BNB/0xB27ADAfFB9fEa1801459a1a81B17218288c097cc" className={classes.link}>
            POOCOIN/BNB LP
          </a>
          <br></br>
          (approximately <strong>0.000031 POOCOIN/BNB LP</strong> created from 66.9802
          <a target="_blank" href="https://poocoin.app/swap?outputCurrency=0xB27ADAfFB9fEa1801459a1a81B17218288c097cc" className={classes.link}>
            &nbsp;POOCOIN&nbsp;
          </a>
          and 0.4879 BNB)<br></br>
          tokens in your wallet.
        </p>
        <p>
          Unlock premium tier 3 by holding <span className={classes.greenText}>$2000</span> worth of &nbsp;
          <a target="_blank" href="https://exchange.primalswap.io/#/add/BNB/0xB27ADAfFB9fEa1801459a1a81B17218288c097cc" className={classes.link}>
            POOCOIN/BNB LP
          </a>
          <br></br>
          (approximately <strong>0.000204 POOCOIN/BNB LP</strong> created from 447.3085
          <a target="_blank" href="https://poocoin.app/swap?outputCurrency=0xB27ADAfFB9fEa1801459a1a81B17218288c097cc" className={classes.link}>
            &nbsp;POOCOIN&nbsp;
          </a>
          and 3.2544 BNB)<br></br>
          tokens in your wallet.
        </p>

        <h2>Premium features</h2>
        <p>The current premium features are:</p>
      </div>


      <Card className={classes.card1}>
        <CardContent>
          <h3 className={classes.whiteText}>Tier 1: Track other wallets</h3>
          <p className={classes.whiteText}>Click "Track" on a transaction to track the trader's wallet.</p>
          <img src={WalletTrack1}></img>

          <p className={classes.whiteText}>This will change the wallet token list to show their wallet instead of your own.</p>
          <img src={WalletTrack2}></img>

          <p className={classes.whiteText}>Click the "Clear" button to go back to your own wallet.</p>
          <p className={classes.whiteText}>You can also track a wallet by entering the wallet address into the input field and clicking "Go"</p>
          <img src={WalletTrack3}></img>

        </CardContent>
      </Card>
      <Card className={classes.card2}>
        <CardContent>
          <h3 className={classes.whiteText}>Tier 1: Disable ads</h3>
          <p className={classes.whiteText}>Disable ads by checking the box.</p>

          <StyledCheckbox disabled /> <span className={classes.disabledLabel}>Disable ads (premium feature)</span>

        </CardContent>
      </Card>
      <Card className={classes.card2}>
        <CardContent>
          <h3 className={classes.whiteText}>Tier 2: Show trades of tracked wallets</h3>
          <p className={classes.whiteText}>Show the trades of tracked wallets plotted on the chart, and enable the "Wallet tx" tab for them.</p>
          <img src={BuySell} style={{ width: '146px' }}></img>
        </CardContent>
      </Card>
      <Card className={classes.card2}>
        <CardContent>
          <h3 className={classes.whiteText}>Tier 3: View more trending websites/tokens.</h3>
          <p className={classes.whiteText}>Unlock the ability to view trending websites/tokens in more timescales, as well as listing the top 100 instead of 10.</p>
          <img src={TradingPreview} style={{ maxWidth: '90%' }}></img>
        </CardContent>
      </Card>
    </div>
  )
}