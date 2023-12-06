import React, { useState, useEffect } from 'react';
import { Button, Container, TextField, InputAdornment, Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ArrowDownwardTwoToneIcon from '@material-ui/icons/ArrowDownwardTwoTone';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames'
import InLineLink from '../Component/InLineLink';
import TokenModal from '../Component/TokenModal';
import DefaultTokens from '../config/default_tokens.json';
import { useStatePersist } from 'use-state-persist';
import { useWallet } from 'use-wallet';
import '../css/Trade.css';

import { tokenBalance, prxBalance, bnbBalance, getRate, tokenSwap, approveToken, getAllowance, getAmountsOut } from '../PooCoin';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#180923 !important'
  },
  container: {
    margin: '20px auto 40px auto',
    backgroundColor: '#303032',
    width: 400,
    height: 'auto',
    padding: '20px',
    paddingTop: '24px',
    textAlign: 'start',
    borderRadius: '8px',
    [theme.breakpoints.down("xs")]: {
      width: '100%',
    },
  },
  button: {
    color: 'white !important',
    minWidth: 'auto',
    textTransform: "initial",
    height: '30px !important',
    borderRadius: 'unset',
    paddingLeft: '8px',
    paddingRight: '8px',
    borderLeftWidth: '1px',
    borderColor: '#303032',
    borderStyle: 'solid'
  },
  tab: {
    backgroundColor: '#6c757d',
    borderColor: '#6c757d',
  },
  tabSelected: {
    backgroundColor: '#565e64',
    borderColor: '#51585e',
  },
  slippage: {
    backgroundColor: '#6c757d'
  },
  slippageSelected: {
    backgroundColor: '#53CA42'
  },
  options: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  label: {
    display: 'flex',
    justifyContent: 'space-between',
    color: 'white',
    marginTop: 15
  },
  tolabel: {
    display: 'flex',
    justifyContent: 'space-between',
    color: 'white',
  },
  updown: {
    borderWidth: 0,
    margin: 15,
    marginBottom: 0,
    backgroundColor: '#262626 !important',
    borderRadius: '999px',
    padding: 0,
    width: '30px',
    height: '30px'
  },
  swapBtn: {
    backgroundColor: '#53CA42',
    width: '100%',
    color: '#fff'
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  swapInfo: {
    marginTop: '10px',
    borderRadius: '10px',
    backgroundColor: '#262626 !important',
    padding: '10px'
  },
  swapInfoText: {
    fontSize: 13,
    color: 'white'
  }
}));


const CssTextField = withStyles({
  root: {
    width: '100%',
    '& .MuiInputBase-input': {
      color: 'white',
      backgroundColor: '#262626 !important',
      borderRadius: '5px',
      paddingLeft: '10px'
    },
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiInputLabel-root': {
      color: 'white',
      zIndex: '11'
    },
    '& .MuiInputBase-root': {
      borderRadius: '5px',
      backgroundColor: '#262626'
    },
    '& .MuiTypography-colorTextSecondary': {
      color: 'white',
    },
  },
})(TextField);

const TxType = {
  None: 0,
  Approve: 1,
  Deposit: 2,
  Withdraw: 3,
}

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function Trade() {

  const classes = useStyles();

  // select swap version
  const [tabIndex, setTabIndex] = React.useState(0);

  // slippage
  const [slippage, setSlippage] = React.useState(0);
  const [isAutoSlippage, setIsAutoSlippage] = React.useState(true);

  // from(to) tokenaddress, symbol, swap amount, balance
  const [liq, setLiq] = React.useState(false);
  const [fromAmount, setFromAmount] = React.useState();
  const [fromToken, setFromToken] = React.useState(DefaultTokens.PRM.address);
  const [fromTokenSymbol, setFromTokenSymbol] = React.useState(DefaultTokens.PRM.symbol);
  const [fromTokenIcon, setFromTokenIcon] = React.useState(`https://primalswap.io/images/tokens/0xB758EAC6F533e26974366b32c2FeB277E5e82daB.png`);
  const [fromBalance, setFromBalance] = React.useState(0);
  const [toAmount, setToAmount] = React.useState();
  const [toToken, setToToken] = React.useState(DefaultTokens.PRX.address);
  const [toTokenSymbol, setToTokenSymbol] = React.useState(DefaultTokens.PRX.symbol);
  const [toTokenIcon, setToTokenIcon] = React.useState(`https://primalswap.io/images/tokens/0xc11C087Ab5Da5C10cCb1ACcd48E5383174765bed.png`);
  const [toBalance, setToBalance] = React.useState(0);

  // for metamask
  const { account, ethereum } = useWallet();

  // check approve or swap
  const [allowance, setAllowance] = useState(0);

  // swap infos
  const [minimumReceived, setMinimumReceived] = useState(0);
  const [priceImpact, setPriceImpact] = useState(0);
  const [price0, setPrice0] = useState(0);
  const [price1, setPrice1] = useState(0);


  const handleChange = (newValue) => {
    setTabIndex(newValue);
  };

  const toPancakeSwap = (tabIndex === 1 ? <InLineLink url="https://v1exchange.primalswap.io/#/swap" text="Pancake v1" fontSize="14" /> : <InLineLink url="https://primalswap.io/swap#/swap" text="Pancake v2" fontSize="14" />)

  const onAutoSlippage = () => {
    setSlippage(0.5);
    setIsAutoSlippage(!isAutoSlippage);
  }

  const onSlippageChange = (event) => {
    setSlippage(event.target.value);
  }

  const setFromTokenBalanceData = (data) => {
    setFromBalance(parseFloat(data).toFixed(8));
  }

  const setToTokenBalanceData = (data) => {
    setToBalance(parseFloat(data).toFixed(8));
  }

  const onclickMaxBtn = () => {
    setFromAmount(fromBalance)
  }

  // update allowance callback
  const updateAllowance = (allowance_) => {
    setAllowance(allowance_);
    console.log(allowance_);
  }

  // update amounts out callback
  const updateAmountsOut = (amount_out, liq) => {
    setLiq(liq);
    setToAmount(amount_out);
    const perc = amount_out * (100 - slippage) / 100;
    setPriceImpact((((perc - amount_out) / amount_out) * 100).toFixed(2))
    setMinimumReceived(amount_out * (100 - slippage) / 100);
    const from_price = amount_out / fromAmount;
    setPrice0(from_price);
    setPrice1(1 / from_price);
  }

  const updateTokenPrice = (price) => {

  }

  // update Infos
  const updateInfos = () => {
    if (
      fromToken === toToken ||
      (fromToken === DefaultTokens.PRM.address && toToken === DefaultTokens.WPRM.address) ||
      (fromToken === DefaultTokens.WPRM.address && toToken === DefaultTokens.PRM.address)
    )
    {
      return;
    }
    const from_token_address = (fromToken === DefaultTokens.PRM.address ? DefaultTokens.WPRM.address : fromToken);
    if (ethereum && account && from_token_address)
      getAllowance(ethereum, account, from_token_address, updateAllowance);

    updateAmountsOut(0);
    updateTokenPrice(0);
    if (fromAmount && fromAmount > 0 && from_token_address && toToken) {
      getAmountsOut(fromAmount, from_token_address, toToken, updateAmountsOut);
      getRate(from_token_address, toToken, updateTokenPrice);
    }
  }

  const onFromTokenChange = async (token, token_symbol, token_icon) => {

    setFromToken(token);
    setFromTokenSymbol(token_symbol);
    if(DefaultTokens.PRM.address === token){
      setFromTokenIcon(`https://primalswap.io/images/tokens/0xB758EAC6F533e26974366b32c2FeB277E5e82daB.png`);
    }else{
      setFromTokenIcon(token_icon);
    }

    if (token === DefaultTokens.PRM.address)
      bnbBalance(account, setFromTokenBalanceData);
    else
      tokenBalance(account, token, setFromTokenBalanceData);
  }

  const onToTokenChange = async (token, token_symbol, token_icon) => {
    setToToken(token);
    setToTokenSymbol(token_symbol);
    if(DefaultTokens.PRM.address === token){
      setToTokenIcon(`https://primalswap.io/images/tokens/0xB758EAC6F533e26974366b32c2FeB277E5e82daB.png`);
    }else{
      setToTokenIcon(token_icon);
    }

    if (token === DefaultTokens.PRM.address)
      bnbBalance(account, setToTokenBalanceData);
    else
      tokenBalance(account, token, setToTokenBalanceData);
  }

  const onclickFromToChange = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
    setFromBalance(toBalance);
    setToBalance(fromBalance);
    setFromTokenSymbol(toTokenSymbol)
    setToTokenSymbol(fromTokenSymbol)
    setFromTokenIcon(toTokenIcon)
    setToTokenIcon(fromTokenIcon)
  }

  const handleKeyPress = (event) => {
    // Block certain characters
    const blockedCharacters = ["-", "#", "*"];
    if (blockedCharacters.includes(event.key)) {
      event.preventDefault();
    }
  };
  
  const onChangeFromAmount = async (event) => {
    const val = event.target.value;
    if (val < 0) {
      setFromAmount(0); // Set directly to 0 if negative
    } else {
      setFromAmount(val); // Set to the valid value
      if (
        fromToken === toToken ||
        (fromToken === DefaultTokens.PRM.address && toToken === DefaultTokens.WPRM.address) ||
        (fromToken === DefaultTokens.WPRM.address && toToken === DefaultTokens.PRM.address)
      ) {
        setToAmount(val);
      }
    } 
  }

  const onChangeToAmount = async (event) => {
    const val = event.target.value;
    if (val < 0) {
      setToAmount(0); // Set directly to 0 if negative
    } else {
      setToAmount(val);
      if (
        fromToken === toToken ||
        (fromToken === DefaultTokens.PRM.address && toToken === DefaultTokens.WPRM.address) ||
        (fromToken === DefaultTokens.WPRM.address && toToken === DefaultTokens.PRM.address)
      ){
        setFromAmount(val);
      }
    } 
  }

  // swap callback
  const swapcallback = (tx) => {
    if(tx.status === true){
      console.log(tx)
      window.alert(`Successful txhash: https://prmscan.org/tx/${tx.blockHash}`)
      if (fromToken === DefaultTokens.PRM.address){
      bnbBalance(account, setFromTokenBalanceData);
        }else{
      tokenBalance(account, fromToken, setFromTokenBalanceData);
      }
      if (toToken === DefaultTokens.PRM.address){
        bnbBalance(account, setToTokenBalanceData);
          }else{
        tokenBalance(account, toToken, setToTokenBalanceData);
        }
    }else{
      window.alert(`Error Occurred`)
    }
  }

  // approve token
  const onApprove = async() => {
    const data = await approveToken(ethereum, fromToken, fromAmount, account);
    if (data.status === true){
      getAllowance(ethereum, account, fromToken, updateAllowance);
      window.alert(`Approved txhash: https://prmscan.org/tx/${data.hash}`)
    }else{
      window.alert(`Error Occurred`)
    }
  }

  // swap tokens
  const onSwap = () => {
    tokenSwap(ethereum, fromAmount, fromToken, toToken, account, minimumReceived, swapcallback);
  }

  const requireApprove = () => {
    if (fromToken === DefaultTokens.PRM.address) {
      return false
    }
    if (account) {
      return fromAmount > allowance || allowance === 0;
    }
    return false;
  }

  useEffect(() => {

    setFromBalance(bnbBalance(account, setFromTokenBalanceData));
    setFromAmount(0);
    setToBalance(prxBalance(account, DefaultTokens.PRM.address, setToTokenBalanceData));
    setToAmount(0);
    setSlippage(0.5);

  }, [account]);

  useEffect(() => {
    updateInfos();
  }, [fromToken, fromAmount, toToken, slippage]);

  const autoSlippage = (isAutoSlippage ? classNames(classes.button, classes.slippageSelected) : classNames(classes.button, classes.slippage));
  const [modalOpen, setModalOpen] = React.useState(false);

  const [modalStyle] = React.useState(getModalStyle);

  const wrap = toToken === DefaultTokens.PRM.address && fromToken === DefaultTokens.WPRM.address ? false : true;
  const swapInfoEnable = minimumReceived > 0 && fromAmount && fromAmount > 0 && fromToken && toToken && wrap ? true : false;
  const swapButtonDisable = (fromAmount > fromBalance) ? true : false;

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className="d-flex flex-column">
        <div className="text-end unpad-2">
          <i style={{color: "white", background: "black"}} className="fas fa-times btn btn-link"></i>
        </div>
        <p style={{color: "black"}}>Select your token in the "To" field to embed the trade interface with your token pre-selected.</p>
        <p style={{color: "black"}}>Then copy the code below:</p>
        <textarea readOnly="" className="flex-grow-1" style={{ fontsize: '14px' }}>
          &lt;iframe
          src="https://hamsterchart.site/embed-swap"
          width="420"
          height="630"
          &gt;&lt;/iframe&gt;
        </textarea>
      </div>
    </div>
  );
  return (
    <div className={classes.root}>
      <Container fixed className={classes.container}>
        <span style={{ color: "white", fontWeight: "bold", marginBottom: "30px"}}>Hamsterchart Swap</span>
        <div className={classes.options}>
          <div>
            <Button onClick={() => handleChange(0)} variant="contained" className={tabIndex === 0 ? classNames(classes.tabSelected, classes.button) : classNames(classes.tab, classes.button)}>Auto</Button>
          </div>
          <div>
            <Button variant="contained" className={classNames(classes.tab, classes.button)} onClick={handleOpen}><Icon>code</Icon></Button>
            <Modal
              open={modalOpen}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              {body}
            </Modal>
            <Button variant="contained" className={classNames(classes.tab, classes.button)} ><Icon>link</Icon></Button>
          </div>
        </div>
        <div>
          <div className={classes.label}>
            <span>Slippage</span>
          </div>
          <CssTextField
            id="standard-start-adornment"
            InputProps={{
              disableUnderline: true,
              value: slippage,
              placeholder: '0.5',
              onChange: onSlippageChange,
              disabled: isAutoSlippage,
              endAdornment:
                <InputAdornment position="end">
                  <span style={{ color: 'white',padding: "5px" }}>%</span>
                  <Button variant="contained" onClick={onAutoSlippage} className={autoSlippage}>Auto Slippage</Button>
                </InputAdornment>,
            }}
          />
          <div className={classes.label}>
            <span>From ({fromTokenSymbol})</span>
            <span>Balance: {fromBalance}</span>
          </div>
          <CssTextField
            InputProps={{
              disableUnderline: true,
              value: fromAmount,
              placeholder: '0.0',
              onChange: onChangeFromAmount,
              onKeyPress: handleKeyPress,
              type: "number",
              step: "0.01",
              inputMode: "decimal",
              pattern: "[0-9]*",
              endAdornment:
                <InputAdornment position="end">
                  <Button className={classes.button} onClick={() => onclickMaxBtn()}>MAX</Button>
                  {/* <Button className={classes.button}><img src={BTCB} width="23px"/>&nbsp;{fromToken}</Button> */}
                  <TokenModal css={classes.button} tokenChange={onFromTokenChange} /><img src={fromTokenIcon} width="23px"/>&nbsp;<span style={{color: 'white'}}>{fromTokenSymbol}</span>
                </InputAdornment>
            }}
          />
          <div style={{ textAlign: 'center' }}>
            <Button variant="contained" className={classNames(classes.updown, classes.button)} onClick={() => onclickFromToChange()}><ArrowDownwardTwoToneIcon /></Button>
          </div>
          <div className={classes.tolabel}>
            <span>To ({toTokenSymbol})</span>
            <span>Balance: {toBalance}</span>
          </div>
          <CssTextField
            id="standard-start-adornment"
            InputProps={{
              disableUnderline: true,
              value: toAmount,
              placeholder: '0.0',
              onChange: onChangeToAmount,
              type: 'number',
              endAdornment:
                <InputAdornment position="end">
                  <TokenModal css={classes.button} tokenChange={onToTokenChange} /><img src={toTokenIcon} width="23px"/>&nbsp;<span style={{color: 'white'}}>{toTokenSymbol}</span>
                </InputAdornment>,
            }}
          />
          {
            swapInfoEnable ?
              <Container className={classes.swapInfo}>
                <Typography className={classes.swapInfoText}>Minimum Received: {minimumReceived.toFixed(8)}</Typography>
                <Typography className={classes.swapInfoText}>Price Impact: {priceImpact.replace(/-/g, "")}%</Typography>
                <Typography className={classes.swapInfoText}>Price: {parseFloat(price0).toFixed(8)} {toTokenSymbol}/{fromTokenSymbol}</Typography>
                <Typography className={classes.swapInfoText}>Price: {parseFloat(price1).toFixed(8)} {fromTokenSymbol}/{toTokenSymbol}</Typography>
              </Container>
              : ""
          }
          <div className={classes.label}>
          {
            !account ? (
              <span>Connect your wallet</span>
            ) : fromToken === DefaultTokens.PRM.address && toToken === DefaultTokens.WPRM.address ? (
              <Button
                variant="contained"
                className={classes.swapBtn}
                onClick={onApprove}
              >
                Wrap
              </Button>
            ) : toToken === DefaultTokens.PRM.address && fromToken === DefaultTokens.WPRM.address ? (
              <Button
                variant="contained"
                className={classes.swapBtn}
                onClick={onApprove}
              >
                UnWrap
              </Button>
            ) : !liq ? (
              <Button
                variant="contained"
                className={classes.swapBtn}
                disabled={!liq}
              >
                Insufficient Liquidity
              </Button>
            ): account && fromToken && requireApprove() ? (
              <Button
                variant="contained"
                className={classes.swapBtn}
                onClick={onApprove}
              >
                Approve
              </Button>
            ) : account && !requireApprove() ? (
              <Button
                variant="contained"
                disabled={swapButtonDisable}
                className={classes.swapBtn}
                onClick={onSwap}
              >
                Swap
              </Button>
            ) : null
          }

          </div>
        </div>
      </Container>
    </div>
  )
}