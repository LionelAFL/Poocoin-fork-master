import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import StarIcon from '@material-ui/icons/Star';
import { useDispatch } from 'react-redux'
import { removeLocalTokenInfo } from '../../PooCoin/util';

const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: theme.palette.common.black,
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
  starredFillIcon: {
    color: '#f7b500!important',
    cursor: 'pointer'
  },
  walletContainer: {
    paddingTop: "10px",
    color: "#fff",
  },
  linkToken: {
    '&:hover': {
      color: 'white',
    }
  }
});

export default function CustomizedTables() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [reload, setReloading] = useState(1);

  const rows = JSON.parse(localStorage.getItem('starred'))

  const reloadComponent = () => {
    reload === 1 ? setReloading(0) : setReloading(1)
  }

  const removeStarredData = starredData => () => {
    removeLocalTokenInfo(starredData)
    reloadComponent()
  }
  return (
    <TableContainer>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Tokens</StyledTableCell>
            <StyledTableCell>Balance</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows != null &&
            Object.keys(rows).map((key) => (
              <StyledTableRow key={key}>
                <StyledTableCell component="th" scope="row">
                  <Link
                    to={`/tokens/${key}`}
                    onClick={() => dispatch({ type: 'SET_TOKENADDRESS', payload: key })}
                    className={classes.linkToken}
                  >
                    {rows[key].symbol}&nbsp;
                    <span className={'textSuccess'}>${rows[key].rate}</span>
                    <br />
                    <span className={'textMuted'}>{rows[key].name}</span>
                  </Link>
                </StyledTableCell>
                <StyledTableCell>
                  <span>{rows[key].amount}</span>
                  <br />
                  <span className={'textSuccess'}>${rows[key].rateAmount}</span>
                </StyledTableCell>
                <StyledTableCell>
                  <StarIcon className={classes.starredFillIcon} onClick={removeStarredData(key)} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      {rows ==null && (
      <div className={classes.walletContainer}>
      No Favourites.
     </div>
      )}
    </TableContainer>
    
  );
}