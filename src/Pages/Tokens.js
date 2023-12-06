/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Tab from "../Component/basic/hometab";
import Lefttab from "../Component/about/tab";
import Input from "../Component/basic/input";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
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
import { storeHistoryLocalTokenInfo } from '../PooCoin/util';
import Trade from "./Trade";
import AccountBalanceWallet from "@material-ui/icons/AccountBalanceWallet";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: "1px",
    },
    backgroundColor: '#000000!important',
    color: "black",
  },
  input: {
    display: "none",
  },
  rightTitle: {
    color: "#ffffff",
    paddingBottom: 10,
  },
  inputField: {
    width: "100%",
    marginTop: '20px',
  },
  tabContainer: {
    minHeight: "700px !important",
  },
  centerContainer: {
    padding: '10px',
    [theme.breakpoints.down("xs")]: {
      width: '440px',
    }
  },
  leftSide: {
    padding: '10px',
    [theme.breakpoints.down("xs")]: {
      width: '100%'
    }
  },
  rightSide: {
    minHeight: '500px',
    backgroundColor: "#1C1C1C",
    marginTop: 5,
    padding: 10,
  },
  tokenImg: {
    width: 32,
    height: 32,
    marginTop: '4px',
    '& img[alt=img]': {
      color: '#000000',
    }
  },
  imgIcon: {
    width: '100%',
    height: '100%',
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
  TokenSelect: {
    backgroundColor: "white",
    marginLeft: 10,
  },
  headerContainer: {
    height: "auto",
  },
  chartPan: {
    display: 'inline-block',
    width: '100%',
  },
  contentHeader: {
    [theme.breakpoints.down("xs")]: {
      marginBottom: '10px'
    }
  }
}));

export default function Tokens(props) {
  const classes = useStyles();
  const [showMode, setShowMode] = useState(1);
  const [priceRateData, setPriceRateData] = useState(0);
  const [coinpriceRateData, setCoinpriceRateData] = useState(0);
  const [coinprice, setCoinprice] = useState(0);
  const history = useHistory();
  const [lpDatas, setLpDatas] = useState([]);
  const [currentTokenInfo, setCurrentTokenInfo] = useState({});
  const [showTrade, setShowTrade] = useState(false);
  const [selectData, setSelectData] = useState([]);
  const [coinAddress, setCoinAddress] = useState();
  const [firstCoinName, setFirstCoinName] = useState();

  const tokenAddress = useSelector((state) => state.tokenAddress)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'SET_TOKENADDRESS', payload: props.match.params.id })
    //Get all info about current token from lpaddress and token table
    if (tokenAddress !== undefined) {
      getLpinfo(tokenAddress)
        .then(data => {
          if (data.lpInfos == null || data.tokenInfos == null || data.lpInfos.length === 0 || data.tokenInfos.length === 0) {
            setFirstCoinName(null)
            setCoinAddress(null)
            setLpDatas(null);
            setSelectData(null)
            setCurrentTokenInfo(null)
            return;
          }
          const tokens = [];
          const selectOptionData = [];
          for (var idx in data.lpInfos) {
            if (data.lpInfos[idx].token0 == data.tokenInfos.address) {
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
          if (tokens[0].value[1] == DefaultTokens.WPRM.symbol) {
            setFirstCoinName(DefaultTokens.PRM.symbol)
          } else {
            setFirstCoinName(tokens[0].value[1])
          }
          setCoinAddress(tokens[0].value[0])
          setLpDatas(tokens);
          setSelectData(selectOptionData)
          setCurrentTokenInfo(data.tokenInfos)
          fetch(`https://api.primalswap.io/api/tokens/${data.tokenInfos.address}`)
          .then(res => res.json())
          .then(data => {
            const price = parseFloat(data.data.price);
            setCoinprice(price);
          })
          .catch(err => {
            console.log(err)
          })
          //Get Lpaddress from current token address and BUSD token address
          getAmountsOut(1, tokenAddress, tokens[0].value[0], setPriceRateData);
          getAmountsOut(1, tokens[0].value[0], DefaultTokens.USDT.address, setCoinpriceRateData);
        })
    }
    storeHistoryLocalTokenInfo(currentTokenInfo.address, currentTokenInfo.name, currentTokenInfo.symbol)
  }, [tokenAddress])
  const handleChange = () => {
    setShowMode(!showMode);
  };
  const handleChangeLeft = () => {
    setShowMode(!showMode);
  };

  const handleTokenPropsChange = (tokenInfo) => {
    const tokenAddress = tokenInfo.address;
    history.push(`/tokens/${tokenAddress}`);
    dispatch({ type: 'SET_TOKENADDRESS', payload: tokenAddress })
  };

  const inputHandle = (tokenAddress) => {
    history.push(`/tokens/${tokenAddress}`);
    dispatch({ type: 'SET_TOKENADDRESS', payload: tokenAddress })
  };

  const [tradeContent, setTradeContent] = useState();
  const handleTrade = () => {
    if (showTrade) {
      setTradeContent()
      setShowTrade(false)
    } else {
      setTradeContent(<Trade />)
      setShowTrade(true)
    }
  }
  const tokenSelect = (event) => {
    setCoinAddress(event.value)
  };
  let centerContainer = (
    <div>
      <div className={classes.headerContainer}>
        <Grid container>
          <Grid xs={6} md={6} sm={6} item className={classes.contentHeader}>
            <Grid container>
              <Grid item xl={12}>
                <p
                  style={{
                    display: "flex",
                    color: "white",
                    textAlign: "left",
                    margin: 0,
                    float: "left",
                  }}
                >
                  <span className={classes.tokenImg}>
                    {currentTokenInfo != null &&
                      <img className={classes.imgIcon} src={`https://r.poocoin.app/smartchain/assets/${currentTokenInfo.address}/logo.png`} alt="img" />
                    }
                  </span>
                  <span>
                    {currentTokenInfo == null ? null : currentTokenInfo.name} ({currentTokenInfo == null ? null : currentTokenInfo.name}/{firstCoinName})
                    <br /><span className={'textSuccess'}>{parseFloat(priceRateData).toFixed(14)}</span>
                  </span>
                </p>
              </Grid>
              <Grid xl={12} style={{ float: "left" }}>
                <TokenSelect inputHandle={inputHandle} tokenProps={handleTokenPropsChange} />
              </Grid>
            </Grid>
          </Grid>
          <Grid md={6} sm={6} item className={classes.buttongrid}>
            <div>
              <Button className={classes.button} target="_blank" href={`https://prmscan.org/token/${tokenAddress}`}>
                <img src={Buttonicon} width="18" height="18" />
              </Button>
              <Button className={classes.button} onClick={handleTrade}>Trade</Button>
              <Button className={classes.button} onClick={handleChange}>
                <AccountBalanceWallet />
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
        <Grid
          item
          container
          xs={12}
          className={classes.selecttool}
        >
          <Button className={classes.button}>Reload</Button>
          <div className={classes.selectBox}>
            <Select
              options={selectData}
              // input={false}
              onChange={tokenSelect}
            // onInputChange={tokenInputChange}
            ></Select>
          </div>
          <Switch />
        </Grid>
      </div>
      <Grid xs={12} style={{ marginTop: 20 }} item>
        <div>{tradeContent}</div>
        <div className={classes.chartPan} >
          {
            coinAddress != undefined &&
            <Chart2 tokenAddress={tokenAddress} coinAddress={coinAddress} height="500px" />
          }
        </div>
        <br />
        {
          lpDatas != null &&
          <TableTab tokenPrice={coinprice} />
        }
      </Grid>
    </div>
  );

  let container;

  if (showMode) {
    container = (
      <Grid container>
        <Grid item xs={12} sm={3} md={3} className={classes.leftSide}>
          {
            currentTokenInfo != null &&
            <Lefttab lpdata={lpDatas} currentTokenInfo={currentTokenInfo} priceRateData={coinprice} />
          }
        </Grid>
        <Grid item xs={12} sm={9} md={6} className={classes.centerContainer}>
          {centerContainer}
        </Grid>
        <Grid item xs={12} sm={12} md={3} className={classes.rightSide}>
          <div className={classes.rightTitle}>PRM Project</div>
          <Tab className={classes.tabContainer} />
        </Grid>
      </Grid>
    );
  } else {
    container = (
      <Grid container item xs={12} md={12} sm={12} xl={12}>
        <Grid item xs={12} md={3} sm={3} xl={3} className={classes.leftSide}>
          {
            currentTokenInfo != null &&
            <Lefttab lpdata={lpDatas} currentTokenInfo={currentTokenInfo} priceRateData={priceRateData * coinpriceRateData} />
          }
        </Grid>
        <Grid item xs={12} md={9} sm={9} xl={9} className={classes.centerContainer}>
          {centerContainer}
        </Grid>
      </Grid>
    );
  }

  return <Grid className={classes.root}>{container}</Grid>;
}
