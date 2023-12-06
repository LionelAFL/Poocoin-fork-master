import React, { Component, useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import { Link } from "react-router-dom";
import { devActivity } from "../../PooCoin/index.js";
import axios from 'axios';

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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const rows = Array.from(Array(10).keys()).map((item) => {
  return {
    name: "THOREUM",
    othername: "Thoreum",
    id: "0x580de58c1bd593a43dadcf0a739d504621817c05",
    tokenMoney: "0.0000",
    balanceMoney: "0.00",
    calories: "0.00",
  };
});

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
  txStyle: {
    maxWidth: '30px',
    overflow: 'hidden',
    cursor: 'pointer'
  },
  txColor: {
    color: '#f4e17a'
  },
  addressStyle: {
    color: '#f4e17a',
    cursor: 'pointer'
  }
});

async function getTokenName(values) {

  const data = JSON.stringify({ values: values });
  return await axios.get(`${process.env.REACT_APP_API}token/getTokenDevActivity/` + data);
}

function DevActivityTable(props) {
  const values = props.values;
  const classes = props.classes;

  return values.map((item, index) => (
    <StyledTableRow key={index}>
      <StyledTableCell component="th" scope="row">
        {new Date().getMonth() + 1 + "/" + new Date().getDate() + "/" + new Date().getFullYear('Y')}<br />
        {new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()}
      </StyledTableCell>
      <StyledTableCell>
        {item.symbol}
      </StyledTableCell>
      <StyledTableCell>
        {item.amount / 1000000000}
      </StyledTableCell>
      <StyledTableCell >
        <a href={"https://prmscan.org/address/" + item.from_address} target="_blank" rel="noreferrer" className={classes.addressStyle}>
          {item.from_address}
        </a>
      </StyledTableCell>
      <StyledTableCell>

      </StyledTableCell>
      <StyledTableCell className={classes.txStyle}>
        <a href={"https://prmscan.org/tx/" + item.tx} target="_blank" rel="noreferrer" className={classes.txColor}>
          {item.tx}
        </a>
      </StyledTableCell>
    </StyledTableRow>
  ));
}

export default function CustomizedTables() {
  const [devActivityData, setDevActivityData] = useState([]);

  const setDevAcitivity = (data) => {
    // getTokenName(data).then(res => {
    //   setDevActivityData(res.data);
    // });
    setDevActivityData(data);
  };

  useEffect(() => {
    devActivity(setDevAcitivity);
  }, []);

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell className={classes.tableTh}>Date</StyledTableCell>
            <StyledTableCell className={classes.tableTh}>Token</StyledTableCell>
            <StyledTableCell className={classes.tableTh}>
              Amount
            </StyledTableCell>
            <StyledTableCell className={classes.tableTh}>
              Receiver
            </StyledTableCell>
            <StyledTableCell className={classes.tableTh}>
              Action
            </StyledTableCell>
            <StyledTableCell className={classes.tableTh}>Tx</StyledTableCell>
            <StyledTableCell className={classes.tableTh}></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <DevActivityTable values={devActivityData} classes={classes} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
