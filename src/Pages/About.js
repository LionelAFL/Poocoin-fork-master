/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Tab from "../Component/basic/hometab";
import Lefttab from "../Component/about/tab";
import Input from "../Component/basic/input";
import { makeStyles } from "@material-ui/core/styles";
import rightPoster from "../Images/moonstar3.gif";
import Button from "@material-ui/core/Button";
import logo from "../Images/TokenIcons/logo2.png";
import Buttonicon from "../Images/prmscan.png";
import LanguageIcon from "@material-ui/icons/Language";
import TelegramIcon from "@material-ui/icons/Telegram";
import Switch from "../Component/multichart/switch";
import Chart2 from "../Component/basic/chart";
import TableTab from "../Component/home/centercontain/tabletab";
import TokenSelect from "../Component/TokenSelect";
import Select from "react-select";
import { getAmountsOut } from "../PooCoin";
import { useHistory, useParams } from "react-router";
import { getLpinfo } from "../actions";
import { useSelector, useDispatch } from 'react-redux';
import DefaultTokens from '../config/default_tokens.json';
import PoocoinIcon from '../Images/prmcoin.jpeg';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: "1px",
      padding: "0px 30px 0px 0px",
      color: "black",
    },
    backgroundColor: '#000000!important',
    textAlign: '-webkit-center',
    [theme.breakpoints.down("xs")]: {
      "& > *": {
        padding: "0px 00px 0px 0px",
      },
    },
  },
  headerContent: {
    backgroundColor: '#ffc107',
    color: '#000000',
    padding: '20px',
  },
  input: {
    display: "none",
  },
  inputField: {
    width: "100%",
    marginTop: '20px',
  },
  tabContainer: {
    minHeight: "700px !important",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  buttongrid: {
    textAlign: "-webkit-right",
  },
  button: {
    backgroundColor: "#303032",
    border: "1px solid #303032",
    color: "#f8f9fa !important",
    height: 35,
    marginLeft: 3,
    fontSize: ".875rem",
    fontWeight: 400,
    boxShadow:
      "inset 0 1px 0 hsl(0deg 0% 100% / 15%), 0 1px 1px rgb(0 0 0 / 8%)",
  },
  selectBox: {
    color: "rgb(51,51,51)",
    fontSize: 14,
    width: 230,
    marginLeft: 7,
    zIndex: 999,
    [theme.breakpoints.down("xs")]: {
      width: '50%'
    }
  },
  selecttool: {
    marginTop: 15,
    flexFlow: "row",
    [theme.breakpoints.down("xs")]: {
      flexFlow: 'wrap'
    }
  },
  tokenSelect: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: 10,
    },
  },
  headerContainer: {
    height: "auto",
  },
  chartPan: {
    display: 'inline-block',
    width: '100%',
  },
  centerContainer: {
    paddingTop: '20px',
    maxWidth: '1140px'
  },
  title: {
    // color: '#fff',
    fontSize: '2.5rem',
    fontWeight: 700,
    fontFamily: '"Kanit",sans-serif',
    // marginTop: '20px'
  },
  buyBtn: {
    marginLeft: '48px',
    borderRadius: '10px',
    backgroundColor: '#28a745',
    fontSize: '20px'
  },
  subDesc: {
    // color: '#f8f9fa',
    fontSize: '1.5rem',
    marginBottom: '8px',
    textAlign: '-webkit-center'
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
  poocoinImg: {
    padding: 5
  },
  value: {
    fontSize: '2rem',
    marginLeft: '1rem',
    marginRight: '1.5rem',
    padding: '35px 0',
  },
  link: {
    marginTop: '10px',
    '& a': {
      color: 'blue !important',
      fontSize: '20px !important',
      marginBottom: '8px !important',
      fontWeight: 500,
      fontFamily: 'Lato, Sans-serif',
    }
  },
  desc: {
    // color: '#f8f9fa',
    fontSize: '1.5rem',
    lineHeight: 1.2,
    fontWeight: 500,
    fontFamily: '"Kanit",sans-serif',
    marginBottom: '8px'
  },
  leftSide: {
    padding: '10px',
    [theme.breakpoints.down("xs")]: {
      width: '100%'
    }
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

export default function About(props) {
  const classes = useStyles();
  const { tokenAddress } = props;
  const [showMode, setShowMode] = useState(1);
  const [priceRateData, setPriceRateData] = useState(0);
  const history = useHistory();
  const [lpDatas, setLpDatas] = useState([]);
  const [currentTokenInfo, setCurrentTokenInfo] = useState({});
  const [selectData, setSelectData] = useState([]);
  const [coinAddress, setCoinAddress] = useState(DefaultTokens.WPRM.address);
  const [priceData, setPriceData] = useState([]);

  // const tokenAddress = useSelector((state) => state.tokenAddress)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'SET_TOKENADDRESS', payload: props.tokenAddress })
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=primal&vs_currencies=usd')
      .then(res => res.json())
      .then(data => {
        setPriceData(data.primal.usd.toFixed(6));
      })
      .catch(err => {
        console.log(err)
      })
    //Get all info about current token from lpaddress and token table
    getLpinfo(tokenAddress)
      .then(data => {
        const tokens = [];
        const selectOptionData = [];
        for (var idx in data.lpInfos) {
          if (data.lpInfos[idx].token0 === tokenAddress) {
            let combined_json = {};
            combined_json["label"] = data.lpInfos[idx].tokenName1;
            //0: other token address, 1: other token symbolName 2: lp address 3: token order 
            let addrLpInfo = [data.lpInfos[idx].token1, data.lpInfos[idx].tokenSymbol1, data.lpInfos[idx].lp_address, 0];
            combined_json["value"] = addrLpInfo;
            tokens.push(combined_json);

            let selectdata_json = {};
            selectdata_json["label"] = "Pc v2 " + data.lpInfos[idx].tokenSymbol0 + "/" + data.lpInfos[idx].tokenSymbol1;
            selectdata_json["value"] = data.lpInfos[idx].token1;
            selectOptionData.push(selectdata_json)
          } else {
            let combined_json = {};
            combined_json["label"] = data.lpInfos[idx].tokenName0;
            let addrLpInfo = [data.lpInfos[idx].token0, data.lpInfos[idx].tokenSymbol0, data.lpInfos[idx].lp_address, 1];
            combined_json["value"] = addrLpInfo;
            tokens.push(combined_json);

            let selectdata_json = {};
            selectdata_json["label"] = "Pc v2 " + data.lpInfos[idx].tokenSymbol1 + "/" + data.lpInfos[idx].tokenSymbol0;
            selectdata_json["value"] = data.lpInfos[idx].token0;
            selectOptionData.push(selectdata_json)
          }
        }
        setLpDatas(tokens);
        setSelectData(selectOptionData)
        setCurrentTokenInfo(data.tokenInfos)
      })
    //Get Lpaddress from current token address and BUSD token address
    getAmountsOut(1, tokenAddress, DefaultTokens.USDT.address, setPriceRateData);
  }, [tokenAddress])

  const handleTokenPropsChange = (tokenInfo) => {
    const tokenAddress = tokenInfo.address;
    history.push(`/tokens/${tokenAddress}`);
    dispatch({ type: 'SET_TOKENADDRESS', payload: tokenAddress })
  };

  const inputHandle = (tokenAddress) => {
    history.push(`/tokens/${tokenAddress}`);
    dispatch({ type: 'SET_TOKENADDRESS', payload: tokenAddress })
  };

  const tokenSelect = (event) => {
    setCoinAddress(event.value)
  };
  let centerContainer = (
    <div>
      <div className={classes.headerContainer}>
      <iframe data-aa='2245859' src='//ad.a-ads.com/2245859?size=728x90' style={{ border:'0px', padding:'0', overflow:'hidden', backgroundColor: 'transparent'}}></iframe>
        <Grid container spacing={2}>
          <Grid xs={12} sm={6} md={6} xl={6} item>
            <p
              style={{
                display: "flex",
                color: "white",
                textAlign: "left",
                margin: 0,
                float: "left",
              }}
            >
              <img className={classes.img} src={`https://primalswap.io/images/tokens/${tokenAddress}.png`} width="32" height="32" />
              <span>
                {currentTokenInfo.name} ({currentTokenInfo.name}/PRM)
                <br /><span className={'textSuccess'}>${parseFloat(priceRateData).toFixed(14)}</span>
              </span>
            </p>
          </Grid>
          <Grid xs={12} sm={6} md={6} xl={6} item className={classes.buttongrid}>
            <div>
              <Button className={classes.button} target="_blank" href={`https://prmscan.org/token/${tokenAddress}`}>
                <img src={Buttonicon} width="18" height="18" />
              </Button>
            </div>
            <div>
              <Button style={{ color: "white" }}>
                <LanguageIcon style={{ color: "white" }} />
                Website
              </Button>
              <Button style={{ color: "white" }}>
                <TelegramIcon style={{ color: "white" }} />
                Telegram
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
      <Grid xs={12} style={{ marginTop: 5, padding: 5 }} item>
        <div className={classes.chartPan} >
          <Chart2 tokenAddress={tokenAddress} coinAddress={coinAddress} height="500px" />
        </div>
      </Grid>
    </div>
  );

  return (
    <div className={classes.root}>
      <div className={classes.iframeContainer}>
                <iframe data-aa='2245859' src='//ad.a-ads.com/2245859?size=728x90' className={classes.responsiveIframe}></iframe>
            </div>
      <div className={classes.headerContent}>
        <div className={classes.title}>
          Primal Coin
          <Button variant="contained" className={classes.buyBtn} href="/swap?outputCurrency=0xB27ADAfFB9fEa1801459a1a81B17218288c097cc">Buy</Button>
        </div>
        <div className={classes.subDesc}>

          <div className={classes.border} container>
            <Grid container>
              <span style={{ borderRadius: '999px', margin: '20px 10px 20px 10px' }}>
                <img src={PoocoinIcon} height="70" style={{ borderRadius: '10px'}} className={classes.poocoinImg} />
              </span>
              <span className={classes.value}> ${priceData}</span>
            </Grid>
          </div>

        </div>
        <div className={classes.desc}>Reflect token on the Primal Chain.</div>
      </div>
      <div className={classes.centerContainer}>
        <Grid container item xs={12}>
          <Grid item xs={12} md={4} sm={4} xl={4} className={classes.leftSide}>
            <Lefttab lpdata={lpDatas} currentTokenInfo={currentTokenInfo} priceRateData={priceRateData} />
          </Grid>
          <Grid item xs={12} md={8} sm={8} xl={8}>
            {centerContainer}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
