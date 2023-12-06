import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { vettedValues } from "../../PooCoin/index.js";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#000000',
    color: theme.palette.common.white,
    padding: 0,
    paddingLeft: 10,
    textAlignLast: 'left',
    borderColor: '#000000',
  },
  body: {
    fontSize: '0.875rem',
    padding: 0,
    paddingLeft: 10,
    backgroundColor: '#1C1C1C',
    color: '#fff',
    borderColor: '#000000',
    borderBottom: '#000000',
    textAlignLast: 'left',
    borderRadius: 0
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
  },
  upper: {
    textTransform: 'uppercase !important'
  },
  walletContainer: {
    paddingTop: "10px",
    color: "#fff",
  },
  otherName: {
    color: '#ADB5BD',
    fontSize: 12
  },
  CircularProgress: {
    color: "#b2b5be",
    marginTop: '20px'
  },
  linkToken: {
    '&:hover': {
      color: 'white',
    }
  }
});

export default function CustomizedTables() {
  const classes = useStyles();
  const [vettedData, setVettedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const rows = JSON.parse(localStorage.getItem('history'))

  const reloadComponent = () => {
    loading === 1 ? setLoading(0) : setLoading(1)
  }

  return (
    <div>
      <TableContainer>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Tokens</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows != null &&
            Object.keys(rows).map((key) => (
              <StyledTableRow key={rows[key].name}>
                <StyledTableCell component="th" scope="row">
                <Link
                    to={`/tokens/${key}`}
                    onClick={() => dispatch({ type: 'SET_TOKENADDRESS', payload: key })}
                    className={classes.linkToken}
                  >
                    <span className={classes.uppper}>{rows[key].symbol}</span>
                    <div className={classes.otherName}>{rows[key].name}</div>
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {rows == null && (
         <div className={classes.walletContainer}>
         No history.
        </div>
      )}
    </div>
  );
}