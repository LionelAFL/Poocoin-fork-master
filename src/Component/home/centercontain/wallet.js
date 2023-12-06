import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { getWalletData } from "../../../PooCoin";
import { useSelector } from 'react-redux';
import { CircularProgress } from "@material-ui/core";
import { useWallet } from 'use-wallet'

const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor: "#000000",
    color: theme.palette.common.white,
    // padding: '0 0 0 10px',
    borderColor: "#000000",
    padding: 0,
  },
  body: {
    fontSize: 12,
    lineHeight: 1.43,
    // padding: 0,
    // paddingLeft: 10,
    color: "#fff",
    borderColor: "#000000",
    maxHeight: 300,
    overflow: "auto",
    padding: 0,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#141414",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#141722",
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 100,
    maxHeight: 200,
    overflow: "auto",
    float: "right",
    fontSize: "14px !important",
    fontFamily: '"Kanit",sans-serif',
    paddingTop: "0px",
  },
  row: {
    color: "#28a745 !important",
    textAlign: 'right',
    '& a': {
      color: '#f4e17a',
    }
  },
  tableBody: {
    maxHeight: 300,
    overflow: "auto",
  },
  th1: {
    textAlign: "right",
    paddingRight: '10px',
    fontSize: '15px',
  },
  th2: {
    textAlign: "right",
    paddingRight: '10px',
    fontSize: '15px',
  },
  CircularProgress: {
    color: "#b2b5be",
    marginTop: '20px',
  },
  title: {
    color: 'white',
    textAlign: 'left',
    marginLeft: '20px',
  },
});

export default function CustomizedTables() {
  const classes = useStyles();
  const { account } = useWallet()
  const [walletData, setWalletData] = useState([]);
  const [loading, setLoading] = useState(true);
  const tokenAddress = useSelector((state) => state.tokenAddress)

  const setWalletValues = (data) => {
    if (data.length === 0) {
      setWalletData(null);
    } else {
      setLoading(false)
      setWalletData(data);
    }
  };

  useEffect(() => {
    if (account == null) {
      setLoading(true)
      setWalletData(null)
    } else {
      getWalletData(tokenAddress, account, setWalletValues);
    }
  }, [account]);

  return (
    <div>
      <TableContainer>
        {
          account != null &&
          <div className={classes.title}>
            <a target="_blank" className={'textBlue'} href={`https://prmscan.org/token/${tokenAddress}?a=${account}`}>PRMScan wallet tx</a>
          </div>
        }
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell className={classes.th1}>Tokens</StyledTableCell>
              <StyledTableCell className={classes.th2}>Price</StyledTableCell>
              <StyledTableCell className={classes.th2}>Current value</StyledTableCell>
              <StyledTableCell className={classes.th2}>Date/Time</StyledTableCell>
              <StyledTableCell className={classes.th2}>Tx</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
            {walletData != null &&
              walletData.map((row, index) => (
                <StyledTableRow key={index} className={classes.row}>
                  <StyledTableCell className={classes.th1}
                    component="th"
                    scope="row"
                  >
                    {(row.amount).toFixed(2)}
                  </StyledTableCell>
                  <StyledTableCell className={classes.th1}>
                    ${(row.usdAmount).toFixed(2)}
                  </StyledTableCell>
                  <StyledTableCell className={classes.th1}>
                    {row.fromAmount}
                  </StyledTableCell>
                  <StyledTableCell className={classes.th1}>
                    {row.timestamp}
                  </StyledTableCell>
                  <StyledTableCell className={classes.th1}>
                    {(row.transaction).substring(0, 6)}
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
