/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, Grid, Hidden, NativeSelect, Modal, Fade } from '@material-ui/core';
import { EthereumProvider } from "@walletconnect/ethereum-provider";
import { useWallet } from 'use-wallet';
import PoocoinIcon from '../Images/hamster.png';
import PrmIcon from '../Images/prmcoin.jpeg';
import TelegramIcon from '../Images/telegram.svg';
import { poocoinBalance, getAmountsOut } from '../PooCoin/index.js';
import { connectType, networkValue } from '../constants';
import { connectWalletStatus } from '../constants';
import Web3 from 'web3';
import { switchNetwork } from '../PooCoin/util';
import DefaultTokens from '../config/default_tokens.json';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  appBarSolid: {
    backgroundColor: '#000000',
    boxShadow: 'none',
    padding: 9,
    textAlign: 'center',
    borderBottom: '3px solid #484e53',
    position: 'initial'
  },
  Toolbar: {
    padding: "0px 50px 0px 50px",
    [theme.breakpoints.down("xs")]: {
      padding: '10px 0px 10px 10px',
    },
  },
  linkGroup: {
    textAlign: 'center',
    display: 'content',
    [theme.breakpoints.down("xs")]: {
      display: 'contents',
    },
  },
  link: {
    fontSize: 15,
    margin: 12,
    textDecoration: 'blink',
    color: 'white',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  chainLinkGroup: {
    marginLeft: 15,
    display: 'grid',
    marginRight: 15
  },
  chainLinkInput: {
    color: '#f4e17a',
    '&:before': {
      display: 'none'
    },
    '&:after': {
      display: 'none'
    },
    '& svg': {
      display: 'none'
    }
  },
  chainLink: {
    fontSize: 15,
    backgroundColor: '#000000!important',
    color: 'white',
  },
  iconLink: {
    display: 'flex',
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    justifyContent: 'center',
    textDecoration: 'blink'
  },
  icon: {
    marginLeft: "5px",
    height: "40px",
    width: "40px",
    cursor: "pointer",
    marginRight: "10px"
  },
  connect: {
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    fontFamily: '"Kanit", sans-serif',
    color: '#000000',
    backgroundColor: '#f4e17a',
    [theme.breakpoints.down("xs")]: {
      textAlign: 'center',
    },
  },
  coinAmount: {
    color: '#adb5bd',
    textAlign: 'left',
    fontSize: 14,
    [theme.breakpoints.down("sm")]: {
      textAlign: 'center'
    },
    [theme.breakpoints.down("xs")]: {
      paddingBottom: '20px',
      textAlign: 'left',
    },
  },
  amountColor: {
    color: '#28a745'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: '#180923',
    border: 'none',
    boxShadow: theme.shadows[5],
    padding: '40px 30px 30px 30px',
    display: 'grid',
    borderRadius: '8px',
  },
  connectBtn: {
    borderRadius: '4px',
    color: 'white',
    backgroundColor: '#000000',
    marginBottom: '.5rem',
    padding: '5px',
  },
  connectBtnDisable: {
    borderRadius: '4px',
    color: 'white',
    backgroundColor: '#000000',
    marginBottom: '.5rem',
    padding: '5px',
    cursor: 'not-allowed!important'
  },
  rightLink: {
    fontSize: '14px',
    margin: '0px',
    padding: '0px',
  },
  acc: {
    backgroundColor: '#1C1C1C',
    borderRadius: '10px',
    margin: '2px'
  },
  headerIcon: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: '10px'
    },
  },
}));

export default function Header(props) {
  const web3 = new Web3(window.ethereum);
  const classes = useStyles();
  const { connectControl, changeNetwork, networkChainId } = props;
  const history = useHistory();

  let connectStatus = localStorage.getItem('PoocoinConnectStatus'); //status connect to metamask
  if (connectStatus == null) {
    connectStatus = connectWalletStatus.disconnect;
    localStorage.setItem('PoocoinConnectStatus', connectWalletStatus.disconnect);
  }

  let [userDisconnected, setUserDisconnected] = useState(connectStatus);

  const { account, connect, reset, balance } = useWallet();
  const [providerClient, setProviderClient] = useState(undefined);
  const [poocoinBalanceData, setPoocoinBalanceData] = useState([]);
  const [priceData, setPriceData] = useState([]);
  const [network, setNetwork] = useState(localStorage.getItem('PoocoinChainId'));
  const dispatch = useDispatch();

  const handleNetworkChange = (event) => {                         //select network chain
    if (event.target.value == networkValue.PRM_Mainnet) {
      history.push('/')
    } else if (event.target.value == networkValue.Polygon) {
      history.push('/polygon')
    } else if (event.target.value == networkValue.Kuchain) {
      history.push('/kuchain')
    }
    setNetwork(event.target.value);
    changeNetwork(event.target.value);
    reset()
    setUserDisconnected(connectWalletStatus.disconnect);
    localStorage.setItem('PoocoinConnectStatus', connectWalletStatus.disconnect);
  }

  const connectOrDisconnect = () => {                               //connect and disconnect button event
    if (userDisconnected == connectWalletStatus.connect) {
      setUserDisconnected(connectWalletStatus.disconnect);
      localStorage.setItem('PoocoinConnectStatus', connectWalletStatus.disconnect);
      reset();
      poocoinBalance(account, poocoinBalanceValues);
    } else {                              //success connect
      setModalOpen(true)
    }
  }

  const poocoinBalanceValues = (data) => {
    setPoocoinBalanceData(data);
  }

  const connectMethod = value => async () => {
    await connectControl(value);
    try {
      let currentChainId = parseInt(localStorage.getItem("PoocoinChainId"));
      let metamaskChainId = parseInt(web3.currentProvider.chainId, 16);
      if (currentChainId != metamaskChainId) {
        await switchNetwork(currentChainId);                       //switch network in metamask
      } else {
        try {
          connect('injected');
        } catch (err) {
          console.log(err);
        }
        setUserDisconnected(connectWalletStatus.connect);          //connect btn
        localStorage.setItem('PoocoinConnectStatus', 1);
      }
    } catch (error) {
      alert('Check if metamask/trustwallet is installed')
    }                            //metamask, walletconnect, binance-chain
    setModalOpen(false);
  }
  const handleConnectWalletConnect =  async () => {    
    setModalOpen(false);
    // 2. Initialize sign client
      const client = await EthereumProvider.init({
        projectId: '3109647bd3f9acb19eeb7c187b513e47',
        showQrModal: true,
        qrModalOptions: { themeMode: "light" },
        chains: [1],
        optionalChains: [39656],
        rpcMap: {
          39656: "https://mainnet-rpc.prmscan.org/",
        },
        methods: ["eth_sendTransaction", "personal_sign"],
        events: ["chainChanged", "accountsChanged"],
        metadata: {
          name: "Hamster",
          description: "View charts of tokens on primal blochchain",
          url: "https://hamsterchart.site",
          icons: ["https://hamsterchart.site/static/media/hamster.efd28515.png"],
        },
      });

      await client.connect();
      setUserDisconnected(connectWalletStatus.connect);          //connect btn
      localStorage.setItem('PoocoinConnectStatus', 1);
  }

  useEffect(() => {
    if (!account && userDisconnected == connectWalletStatus.connect) {
      try {
        connect();
        poocoinBalance(account, poocoinBalanceValues);
      } catch (err) {
        console.log(err);
      }
    }
    getAmountsOut(1, "0xB758EAC6F533e26974366b32c2FeB277E5e82daB", DefaultTokens.USDT.address, setPriceData);
  }, [account, userDisconnected])

  let coinAmount = '';
  let connectLabel = 'Connect';
  if (account && userDisconnected == connectWalletStatus.connect) {
    coinAmount = (
      <div className={classes.acc}>
        <Link to={`/swap?outputCurrency=${DefaultTokens.POOCOIN.address}`} className={classes.rightLink}>
          <div>Your <img src={PoocoinIcon} height="18" /> : {poocoinBalanceData} </div>
        </Link>
      </div>
    );
    connectLabel = (
      <span>Logout</span>
    );
  }

  const [open, setModalOpen] = React.useState(false);

  const modalClose = () => {
    setModalOpen(false);
  };

  return (
    <AppBar position="fixed" className={classes.appBarSolid}>
      <Toolbar className={classes.Toolbar}>
        <Grid container direction="row" alignItems="center">
          <Grid item md={4} sm={12} xl={4}>
            <Grid container alignItems="center">
              <Grid item>
                <a href="/" className={classes.iconLink}>
                  <img src={PoocoinIcon} className={classes.icon}></img>
                  <span>
                    Hamster <br />Charts
                  </span>
                </a>
              </Grid>
              {
                networkChainId == networkValue.PRM_Mainnet
                  ?
                  <Grid item className={classes.headerIcon}>
                    <Link
                      to={`/tokens/${DefaultTokens.POOCOIN.address}`}
                      onClick={() => dispatch({ type: 'SET_TOKENADDRESS', payload: DefaultTokens.POOCOIN.address })}
                    >
                      <span style={{ padding: '5px' }}>
                        <img src={PrmIcon} style={{ borderRadius: '10px' }} height="18" />
                      </span>
                      <span className={classes.amountColor}> ${priceData} </span>
                    </Link>
                    <a href="https://t.me/OfficialPRM" target="_blank">
                      <img src={TelegramIcon} height='25' />
                    </a>
                  </Grid>
                  :
                  <Grid item>
                    <a href="https://t.me/OfficialPRM" target="_blank">
                      <img src={TelegramIcon} height='25' />
                    </a>
                  </Grid>
              }
            </Grid>
          </Grid>
          {
            networkChainId == networkValue.PRM_Mainnet &&
            <Grid item md={5} sm={12} xl={5} container justifyContent={'center'} >
              <div className={classes.linkGroup}>
                <Link className={classes.link} to="/">Charts</Link>
                <Link className={classes.link} to="/swap">Trade</Link>
                {/*<Link className={classes.link} to="/multichart">Multi&nbsp;Chart</Link>*/}
                <a className={classes.link} href="https://t.me/Hamster_Pricebot" target="_blank">Free&nbsp;Price&nbsp;Bot</a>
                <Link className={classes.link} to="/about">About</Link>
                <Link className={classes.link} to="/advertise">Advertise</Link>
              </div>
            </Grid>
          }
          {
            networkChainId == networkValue.Polygon &&
            <Grid item md={5} sm={5} xl={5} container justifyContent={'center'} >
              <div className={classes.linkGroup}>
                <Link className={classes.link} to="/polygon">Charts</Link>
                <Link className={classes.link} to="/polygonpromote">Advertise</Link>
              </div>
            </Grid>
          }
          {
            networkChainId == networkValue.Kuchain &&
            <Grid item md={5} sm={5} xl={5} container justifyContent={'center'} >
              <div className={classes.linkGroup}>
                <Link className={classes.link} to="/kuchain">Charts</Link>
                <Link className={classes.link} to="/kuchainpromote">Advertise</Link>
              </div>
            </Grid>
          }
          <Grid item md={2} sm={12} xl={2} className={classes.coinAmount} container justifyContent={'center'}>
            {coinAmount}
          </Grid>
          <Grid item md={1} sm={12} xl={1} container justifyContent={'center'} >
            <Button variant="contained" className={classes.connect} onClick={connectOrDisconnect}>{connectLabel}
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
      <Modal
        className={classes.modal}
        open={open}
        onClose={modalClose}
      >
        <div className={classes.paper}>
          <button className={classes.connectBtn} onClick={connectMethod((connectType.metamask))}>Metamask/TrustWallet</button>
          <button className={classes.connectBtn} onClick={handleConnectWalletConnect}>WalletConnect</button>
          <button className={classes.connectBtn} onClick={modalClose}>Close</button>
        </div>
      </Modal>
    </AppBar >
  );
}
