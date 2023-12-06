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
import { storeLocalMultichart } from '../../PooCoin/util.js';

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

const rows = Array.from(Array(1).keys()).map(item => {
  return {
    name: "THOREUM",
  }
})

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
  otherName: {
    color: '#ADB5BD',
    fontSize: 12
  },
  CircularProgress: {
    color: "#b2b5be",
    marginTop: '20px'
  },
  tokenList: {
    cursor: 'pointer',
  }
});

export default function CustomizedTables(props) {
  const classes = useStyles();
  const [vettedData, setVettedData] = useState([]);
  const [loading, setLoading] = useState(true);

  const setVettedValues = (data) => {
    if (data.length == 0) {
      setLoading(true)
    } else {
      setLoading(false)
      setVettedData(data);
    }
  };

  const addMultichartInfo = tokenAddress => () => {
    storeLocalMultichart(tokenAddress);
    props.onSymbol()
  }

  useEffect(() => {
    vettedValues(setVettedValues);
  }, []);

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
            {vettedData.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell className={classes.tokenList} component="th" scope="row" onClick={addMultichartInfo(row.linkAddress)}>
                  <span className={classes.uppper}>{row.name}</span>
                  <div className={classes.otherName}>{row.name}</div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {loading && (
        <CircularProgress size={20} className={classes.CircularProgress} />
      )}
    </div>
  );
}