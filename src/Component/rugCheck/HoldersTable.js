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
import { vettedValues } from "../../PooCoin/index.js";

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
});

function VettedTable(props) {
  const values = props.values;
  return values.map((item, index) => (
    <StyledTableRow key={index}>
      <StyledTableCell component="th" scope="row">
        <Link to={`/tokens/${item.linkAddress}`} className={"fs2"}>
          {item.name}&nbsp;
          <span className={"textSuccess"}>${item.amount.toFixed(4)}</span>
          <br />
          <span className={"textMuted"}>{item.name}</span>
        </Link>
      </StyledTableCell>
      <StyledTableCell>
        <span>0.00</span>
        <br />
        <span className={"textSuccess"}>$0.00</span>
      </StyledTableCell>
      <StyledTableCell>
        <StarOutlineIcon />
      </StyledTableCell>
    </StyledTableRow>
  ));
}

export default function CustomizedTables() {
  const [vettedData, setVettedData] = useState([]);

  const setVettedValues = (data) => {
    setVettedData(data);
  };

  useEffect(() => {
    vettedValues(setVettedValues);
  }, []);

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell className={classes.tableTh}>
              Address
            </StyledTableCell>
            <StyledTableCell className={classes.tableTh}>
              TrackWallet
            </StyledTableCell>
            <StyledTableCell className={classes.tableTh}>Type</StyledTableCell>
            <StyledTableCell className={classes.tableTh}>
              Amount
            </StyledTableCell>
            <StyledTableCell className={classes.tableTh}>
              Transfer Count
            </StyledTableCell>
            <StyledTableCell className={classes.tableTh}>
              Current Balance
            </StyledTableCell>
            <StyledTableCell className={classes.tableTh}></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <VettedTable values={vettedData} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
