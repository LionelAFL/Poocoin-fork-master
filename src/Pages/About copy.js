/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import Grid from '@material-ui/core/Grid';
import Chart from '../Component/basic/chart';
import Abouttab from '../Component/about/tab';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PoocoinIcon from '../Images/poocoin512.png';
import Link from '@material-ui/core/Link';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import SearchInput from '../Component/TokenSelect';
import TelegramIcon from '@material-ui/icons/Telegram';
import Switch from '../Component/multichart/switch';
import BSC from '../Images/prmscan.png';
import '../css/about.css';
import TableTab from '../Component/about/tabletab';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import FormControl from '@material-ui/core/FormControl';
import SelectBox from '../Component/about/select';
import LanguageIcon from '@material-ui/icons/Language';
import { tokenBalance, bnbBalance, getRate, tokenSwap, poocoinBalance } from '../PooCoin';


const useStyles = makeStyles((theme) => ({
  container: {
    margin: '20px 0px 0px',
    color: '#fff !important',
    width: 'auto !important',
    marginLeft: '10%',
    marginRight: '10%',
  },
  title: {
    color: '#fff',
    fontSize: '2.5rem',
    fontWeight: 700,
    fontFamily: '"Robonto",sans-serif',
    marginTop: '20px'
  },
  desc: {
    color: '#f8f9fa',
    fontSize: '2rem',
    lineHeight: 1.2,
    fontWeight: 500,
    fontFamily: '"Kanit",sans-serif',
    marginBottom: '8px'
  },
  buyBtn: {
    marginLeft: '48px',
    backgroundColor: '#28a745',
    fontSize: '20px'
  },
  subDesc: {
    color: '#f8f9fa',
    fontSize: '1.5rem',
    marginBottom: '8px',
    textAlign: '-webkit-center'
  },
  link: {
    fontSize: '20px !important',
    marginBottom: '8px !important',
    fontWeight: 500,
    fontFamily: 'Lato, Sans-serif',
    '& a': {
      color: '#f4e17a !important'
    }
  },
  value: {
    fontSize: '2rem',
    marginLeft: '1rem',
    marginRight: '1.5rem',
    padding: '35px 0',
  },
  border: {
    border: '2px solid #f8f9fa',
    borderRadius: '999px',
    // boxShadow: '0.5rem 1rem rgba(0,0,0,.15)!important',
    marginBottom: '10px',
    width: '30%',
    minWidth: 310,
    textAlign: '-webkit-center',
    fontFamily: '"Kanit",sans-serif'
  },
  inputCss: {
    width: '350px !important',
    paddingTop: '0px !important',
    marginLeft: '0px !important',
    height: '30px'
  },
  subContainer: {
    flexWrap: 'nowrap',
  },
  tabContainer: {
    maxWidth: '100%'
  },
  rightContainer: {
    marginLeft: '20px !important',
  },
  bscLink: {
    float: 'right',
  },
  poocoinToBNB: {
    float: 'left',
    alignItems: 'center',
    minWidth: 300
  },
  website: {
    float: 'right !important'
  },
  reloadBtn: {
    textTransform: 'none !important',
    backgroundColor: '#1C1C1C',
    color: '#fff',
    boxShadow: 'inset 0 1px 0 hsl(0deg 0% 100% / 15%), 0 1px 1px rgb(0 0 0 / 8%)',
    height: 38,
    marginRight: 10
  },
  linkName: {
    fontSize: 20
  },
  poocoinImg: {
    padding: 5
  },
  infoBtn: {
    backgroundColor: '#fff !important',
    height: 35,
    top: 10,
    float: 'left',
    marginRight: 10,
    left: '-80%'
  },
  infoBtnRight: {
    backgroundColor: '#fff !important',
    top: '46px',
    left: '40%',
    zIndex: 99
  },
  btnchange: {
    backgroundColor: '#fff !important',
    top: '5px',
    // left: '40%',
    zIndex: 99
  },
  bscBtn: {
    color: '#fff',
    backgroundColor: '#303032',
    borderColor: '#303032',
    boxShadow: 'inset 0 1px 0 hsl(0deg 0% 100% / 15%), 0 1px 1px rgb(0 0 0 / 8%)',
    width: 20,
    height: 40
  },
  priceValue: {
    color: '#28a745',
  },
  telegram: {
    color: '#000',
    backgroundColor: '#fff',
    borderRadius: '999px',
  },
  selectBox: {
    color: 'rgb(51,51,51)',
    fontSize: 14
  },
  rows: {
    marginBottom: 15
  },
  position: {
    textAlign: 'right'
  },
  btn: {
    color: 'white',
    width: 100
  },
  rightSide: {
    [theme.breakpoints.down("sm")]: {
      display: 'none',
    },
  },
  rightSideOther: {
    [theme.breakpoints.down("xs")]: {
      '& .MuiGrid-grid-xs-4': {
        flexBasis: '100%',
        maxWidth: '100%'
      }
    },
  },
  iconPadding: {
    paddingTop: 20,
    float: 'left',
  },
  iconPaddingRight: {
    paddingTop: 10,
    display: 'none',
    [theme.breakpoints.down("sm")]: {
      display: 'flex',
    },
  },
  leftSide: {
    backgroundColor: '#1C1C1C',
    marginTop: 20,
    padding: 0,
    position: 'relative',
    maxWidth: '330px',
    [theme.breakpoints.down("xs")]: {
      minWidth: '330px',
      maxWidth: '330px',
      // position: 'absolute',
      left: '30px',
      // marginTop: '30px'
    },
  }
}));

export default function About() {


  const classes = useStyles();

  const [showMode, setShowMode] = React.useState(1);
  const [pairRate, setPairRate] = React.useState();

  const handleChange = () => {
    setShowMode(!showMode);
  };


  const setTokenRate = async (data) => {
    await setPairRate(data);
  };

  const tokenIn = "0xb27adaffb9fea1801459a1a81b17218288c097cc";
  const tokenOut = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
  try {
    getRate(tokenIn, tokenOut, setTokenRate);
  } catch (e) {

  }
  const handleChangeLeft = () => {
    setShowMode(!showMode);
  };





  let rightContainer = (
    <Grid className={showMode ? classes.rightSide : classes.rightSideOther}>
      <Grid item container xs={12}>
        <Grid xs={12} container className={classes.rows}>
          <Grid xs={8} className={classes.poocoinToBNB} container>
            <img src={PoocoinIcon} height="30" />
            <Grid>
              PooCoin (POOCOIN/BNB)
              <div className={classes.priceValue}>
                $2.4498
              </div>
            </Grid>
            <StarOutlineIcon />
          </Grid>
          <Grid xs={4} className={classes.position}>
            <Button className={classes.bscBtn}>
              <img src={BSC} height="20" className={classes.bscLink} />
            </Button>
            <Grid>
              <Button className={classes.btn} href="http://localhost/about"><LanguageIcon />Website</Button>
              <Button className={classes.btn} href="https://t.me/hamsterchart"><TelegramIcon className={classes.telegram} />Telegram</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={12} container className={classes.rows}>
        <Grid xs={6} style={{ flexBasis: 'auto' }}>
          <SearchInput className={classes.inputCss} />
        </Grid>
      </Grid>
      <Grid container xs={12} className={classes.rows}>
        <Button variant="contained" className={classes.reloadBtn}>
          Reload
        </Button>
        {/* <SearchInput className={classes.inputCss}/> */}
        <SelectBox className={classes.selectBox} />
        <Switch />
      </Grid>
      <Chart />
      <TableTab />
    </Grid>
  );

  let container;

  if (showMode) {
    container = (
      <Grid container item spacing={3} xs={12}>
        <Grid item xs={4} lg={4} md={4} sm={12} className={classes.leftSide}>
          {/* <div className={classes.iconPaddingRight}> */}
          <Button className={classes.infoBtnRight} onClick={handleChange}>
            <DoubleArrowIcon /> Info
          </Button>
          {/* </div> */}
          <Abouttab className={classes.tabContainer} />
        </Grid>
        <Grid item xs={8} lg={8} md={8} sm={12}>
          {rightContainer}
        </Grid>
      </Grid>
    );
  } else {
    container = (
      <Grid xs={12}>
        <Grid item container xs={12}>
          <Grid xs={12} container className={classes.rows}>
            <Grid xs={8} className={classes.poocoinToBNB} container>
              <Button className={classes.btnchange} onClick={handleChange}>
                <DoubleArrowIcon /> Info
              </Button>
              <img src={PoocoinIcon} style={{ marginLeft: 10 }} height="30" />
              <Grid>
                PooCoin (POOCOIN/BNB)
                <div className={classes.priceValue}>
                  $2.4498
                </div>
              </Grid>
              <StarOutlineIcon />
            </Grid>
            <Grid xs={4} className={classes.position}>
              <Button className={classes.bscBtn}>
                <img src={BSC} height="20" className={classes.bscLink} />
              </Button>
              <Grid>
                <Button className={classes.btn}><LanguageIcon />Website</Button>
                <Button className={classes.btn}><TelegramIcon className={classes.telegram} />Telegram</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12} container className={classes.rows}>
          <Grid xs={6} style={{ flexBasis: 'auto' }}>
            <SearchInput className={classes.inputCss} />
          </Grid>
        </Grid>
        <Grid container xs={12} className={classes.rows}>
          <Button variant="contained" className={classes.reloadBtn}>
            Reload
          </Button>
          {/* <SearchInput className={classes.inputCss}/> */}
          <SelectBox className={classes.selectBox} />
          <Switch />
        </Grid>
        <Chart />
        <TableTab />
      </Grid>
    );
  }

  return (
    <div>
      <Grid container item className={classes.container}>
        <Grid item xs={12}>
          <div className={classes.title}>
            PooCoin
            <Button variant="contained" className={classes.buyBtn} href="/swap?outputCurrency=0xB27ADAfFB9fEa1801459a1a81B17218288c097cc">Buy</Button>
          </div>
          <div className={classes.subDesc}>Set slippage to 9% on pancakeswap.</div>
          <div className={classes.subDesc}>

            <div className={classes.border} container>
              <Grid container>
                <span style={{ borderRadius: '999px', backgroundColor: 'white', margin: '15px 10px 15px 10px' }}>
                  <img src={PoocoinIcon} height="70" className={classes.poocoinImg} />
                </span>
                <span className={classes.value}> $3.2345235</span>
              </Grid>
            </div>

          </div>
          <div className={classes.desc}>Reflect token on the Binance Smart Chain.</div>
          <div className={classes.desc}>A 8% fee is charged on each transaction. 4% is distributed to other token holders and 4% is burned.</div>
          <div className={classes.desc}>Initial supply: 10,000,000. No more than 100,000 can be traded in 1 transaction.</div>
          <div className={classes.link}><Link href="https://poocoin.medium.com/" className={classes.linkName}>Medium</Link></div>
          <div className={classes.link}><Link href="https://twitter.com/Hamster_token" className={classes.linkName}>Twitter</Link></div>
          <div className={classes.link}><Link href="https://t.me/hamsterchart" className={classes.linkName}>Telegram</Link></div>
          <div className={classes.link}><Link href="https://www.reddit.com/r/PooCoin/" className={classes.linkName}>Reddit</Link></div>
          <div className={classes.link}><Link href="https://discord.gg/8NhHZNWhVf" className={classes.linkName}>Discord</Link></div>
        </Grid>
        {container}
      </Grid>
    </div>
  );
}