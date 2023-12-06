import React, { Component, useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import StarIcon from '@material-ui/icons/Star';
import { Link } from 'react-router-dom';
import { unvettedValues } from '../../PooCoin/index.js';
import { useDispatch } from 'react-redux'
import { storeLocalTokenInfo, checkLocalTokenInfo, removeLocalTokenInfo } from '../../PooCoin/util';
import { CircularProgress } from "@material-ui/core";
import { storeLocalMultichart } from '../../PooCoin/util';

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

function UnvettedTable(props) {
  const values = props.values;
  const classes = props.className;
  const dispatch = useDispatch();
  const addUnvettedData = unvettedData => () => {
    checkLocalTokenInfo(unvettedData[0])
      ?
      removeLocalTokenInfo(unvettedData[0])
      :
      storeLocalTokenInfo(unvettedData[0], unvettedData[1].split('/')[3], 0)
    props.reloadData()
  }
  const addMultichartInfo = tokenAddress => () => {
    storeLocalMultichart(tokenAddress);
    props.onSymbol()
  }
  return (
    values.map((item, index) =>
      <StyledTableRow key={index}>
        <StyledTableCell className={classes.tokenList} component="th" scope="row" onClick={addMultichartInfo(item[0])}>
          <span>{item[1].split('/')[3]} </span>
          <span className={"textSuccess"}>$0.0000</span>
          <br />
          <span className={"textMuted"}>{item[1].split('/')[3]}</span>
        </StyledTableCell>
        <StyledTableCell>
          <span>0.00</span>
          <br />
          <span className={'textSuccess'}>$0.00</span>
        </StyledTableCell>
        <StyledTableCell>
          {
            checkLocalTokenInfo(item[0]) == true ?
              <StarIcon className={classes.starredFillIcon} onClick={addUnvettedData(item)} />
              :
              <StarOutlineIcon className={classes.starredIcon} onClick={addUnvettedData(item)} />
          }
        </StyledTableCell>
      </StyledTableRow>
    )
  );
}

export default function CustomizedTables(props) {
  const [unvettedData, setUnvettedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReloading] = useState(1);
  const classes = useStyles();
  const setUnvettedValues = (data) => {
    if (data.length == 0) {
      setLoading(true)
    } else {
      setLoading(false)
      setUnvettedData(data);
    }
  };

  useEffect(() => {
    unvettedValues(setUnvettedValues);
  }, []);

  const reloadComponent = () => {
    reload == 1 ? setReloading(0) : setReloading(1)
  }
  return (
    <div>
      <TableContainer>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell className={classes.tableTh}>Tokens</StyledTableCell>
              <StyledTableCell className={classes.tableTh}>Balance</StyledTableCell>
              <StyledTableCell className={classes.tableTh}></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <UnvettedTable className={classes} reloadData={reloadComponent} onSymbol={props.onSymbol} values={unvettedData} />
          </TableBody>
        </Table>
      </TableContainer>
      {loading && (
        <CircularProgress size={20} className={classes.CircularProgress} />
      )}
    </div>
  );
}