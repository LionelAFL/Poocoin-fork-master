import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal, Grid, Paper } from '@material-ui/core';
import { getOwnToken_wallet } from '../../PooCoin'
import { useWallet } from 'use-wallet'
import { CircularProgress } from "@material-ui/core";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import StarIcon from '@material-ui/icons/Star';
import { storeLocalTokenInfo, checkLocalTokenInfo, removeLocalTokenInfo, storeLocalMultichart } from '../../PooCoin/util';
import { useDispatch } from 'react-redux'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    borderColor: "#000000",
    textAlignLast: "center",
  },
  body: {
    padding: 0,
    paddingLeft: 10,
    color: "#fff",
    backgroundColor: "#1C1C1C",
    borderColor: "#000000",
    textAlignLast: "center",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 100,
    fontSize: "0.875rem",
    padding: "10px !important",
    color: "#fff",
  },
  tableTh: {
    padding: 0,
    fontSize: "0.8125rem",
    paddingLeft: 10,
    backgroundColor: "#000000",
  },
  modalLeft: {
    textAlign: 'left',
    color: '#f4e17a !important',
    cursor: 'pointer',
  },
  modalRight: {
    textAlign: 'right',
    cursor: 'pointer',
    color: '#f4e17a !important'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000000',
  },
  paper: {
    backgroundColor: 'white',
    border: 'none',
    padding: '40px 30px 30px 30px',
    display: 'grid',
    borderRadius: '8px',
    textAlign: 'center',
  },
  CircularProgress: {
    color: "#b2b5be",
    marginTop: '20px'
  },
  starredIcon: {
    cursor: 'pointer'
  },
  starredFillIcon: {
    color: '#f7b500!important',
    cursor: 'pointer'
  },
  tokenList: {
    cursor: 'pointer',
  }
});

export default function CustomizedTables(props) {
  const classes = useStyles();
  const [open, setModalOpen] = useState(false);
  const { account } = useWallet()
  const [walletOwnTokens, setWalletOwnToken] = useState();
  const [loading, setLoading] = useState(true);
  const [reload, setReloading] = useState(1);
  const dispatch = useDispatch();

  const dispatchTokenInfo = (tokenAddress) => () => {
    dispatch({ type: 'SET_TOKENADDRESS', payload: tokenAddress });
  }
  const modalClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    getOwnToken_wallet(account, setWalletOwnTokenData);
  })

  const setWalletOwnTokenData = (data) => {
    if (data.length == 0) {
      setLoading(true)
    } else {
      setLoading(false)
      setWalletOwnToken(data);
    }
  }

  const modalOpen = () => {
    setModalOpen(true);
  }
  const addMultichartInfo = tokenAddress => () => {
    storeLocalMultichart(tokenAddress);
    props.onSymbol()
  }

  const reloadComponent = () => {
    reload == 1 ? setReloading(0) : setReloading(1)
  }

  const addWalletTokenData = walletTokenData => () => {
    checkLocalTokenInfo(walletTokenData.currency.address)
      ?
      removeLocalTokenInfo(walletTokenData.currency.address)
      :
      storeLocalTokenInfo(walletTokenData.currency.address, walletTokenData.currency.symbol, walletTokenData.value)
    reloadComponent()
  }

  return (
    <div>
      <Grid container className={classes.tableHead}>
        <Grid item xs={6}>
          <div onClick={modalOpen} className={classes.modalLeft}>
            Track another wallet
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.modalRight}>
            Load new tokens
          </div>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell className={classes.tableTh}>Tokens</StyledTableCell>
              <StyledTableCell className={classes.tableTh}>Balance</StyledTableCell>
              <StyledTableCell className={classes.tableTh}></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {walletOwnTokens != undefined &&
              walletOwnTokens.map((walletOwnToken, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell className={classes.tokenList} component="th" scope="row" onClick={addMultichartInfo(walletOwnToken.currency.address)}>
                    {walletOwnToken.currency.symbol}&nbsp;
                    <span className={"textSuccess"}>${walletOwnToken.value}</span>
                    <br />
                    <span className={"textMuted"}>{walletOwnToken.currency.symbol}</span>
                  </StyledTableCell>
                  <StyledTableCell>
                    <span>{walletOwnToken.value}</span>
                    <br />
                    <span className={'textSuccess'}>${walletOwnToken.rateAmount}</span>
                  </StyledTableCell>
                  <StyledTableCell>
                    {
                      checkLocalTokenInfo(walletOwnToken.currency.address) == true ?
                        <StarIcon className={classes.starredFillIcon} onClick={addWalletTokenData(walletOwnToken)} />
                        :
                        <StarOutlineIcon className={classes.starredIcon} onClick={addWalletTokenData(walletOwnToken)} />
                    }
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        className={classes.modal}
        open={open}
        onClose={modalClose}
      >
        <div className={classes.paper}>
          <h1>Premium required</h1>
          <p>This features requires premium tier 1.</p>
          <p>Unlock this premium tier by holding $100 worth of <a className={'textBlue fs3'} target="_blank" href="https://primalswap.io/swap#/add/ETH/0x7ceb23fd6bc0add59e62ac25578270cff1b9f619">POOCOIN/BNB LP</a></p>
          <p>(approximately Infinity POOCOIN/BNB LP created from Infinity <a className={'textBlue fs3'} target="_blank" href="polygon/swap?outputCurrency=0xB27ADAfFB9fEa1801459a1a81B17218288c097cc">POOCOIN</a> and Infinity BNB)
            tokens in your wallet.</p>
        </div>
      </Modal>
      {loading && (
        <CircularProgress size={20} className={classes.CircularProgress} />
      )}
    </div>
  );
}