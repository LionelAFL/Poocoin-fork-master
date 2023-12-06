import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal, Grid, Paper } from '@material-ui/core';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import { Link } from 'react-router-dom';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#000000',
    color: theme.palette.common.white,
    padding: 0,
    paddingLeft: 10,
    textAlignLast: 'center',
    borderColor: '#000000'
  },
  body: {
    fontSize: '0.875rem',
    padding: 0,
    paddingLeft: 10,
    maxWidth: 100,
    backgroundColor: '#1C1C1C',
    color: '#fff',
    textAlignLast: 'center',
    borderColor: '#000000'
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const rows = Array.from(Array(1).keys()).map(item => {
  return {
  }
})
const useStyles = makeStyles({

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
});

export default function CustomizedTables() {
  const classes = useStyles();
  const [open, setModalOpen] = React.useState(false);

  const modalClose = () => {
    setModalOpen(false);
  };

  const modalOpen = () => {
    setModalOpen(true);
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
      <TableContainer >
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Tokens</StyledTableCell>
              <StyledTableCell>Balance</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
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
    </div>
  );
}