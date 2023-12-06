import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import StarIcon from '@material-ui/icons/Star';
import { Link } from "react-router-dom";
import { vettedValues } from "../../PooCoin/index.js";
import { useWallet } from 'use-wallet'
import { CircularProgress } from "@material-ui/core";
import { useDispatch } from 'react-redux'
import { storeLocalTokenInfo, checkLocalTokenInfo, removeLocalTokenInfo } from '../../PooCoin/util';

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
  linkToken: {
    '&:hover': {
      color: 'white',
    }
  }
});

function VettedTable(props) {
  const values = props.values;
  const classes = props.className;
  const dispatch = useDispatch();

  const addVettedData = vettedData => () => {
    checkLocalTokenInfo(vettedData.address)
      ?
      removeLocalTokenInfo(vettedData.address)
      :
      storeLocalTokenInfo(vettedData.address, vettedData.name, vettedData.symbol, vettedData.value, vettedData.rate, vettedData.rateAmount)
    props.reloadData()
  }

  const dispatchTokenInfo = (tokenAddress) => () => {
    dispatch({ type: 'SET_TOKENADDRESS', payload: tokenAddress });
  }
  return values.map((item, index) => (
    <StyledTableRow key={index}>
      <StyledTableCell component="th" scope="row">
        <Link
          to={{
            pathname: `/tokens/${item.address}`,
            state: item.address,
          }}
          onClick={dispatchTokenInfo(item.address)}
          className={classes.linkToken}
        >
          {item.symbol}&nbsp;
          <span className={"textSuccess"}>${item.rate}</span>
          <br />
          <span className={"textMuted"}>{item.name}</span>
        </Link>
      </StyledTableCell>
      <StyledTableCell>
        <span>{item.value}</span>
        <br />
        <span className={"textSuccess"}>${item.rateAmount}</span>
      </StyledTableCell>
      <StyledTableCell>
        {
          checkLocalTokenInfo(item.address) === true ?
            <StarIcon className={classes.starredFillIcon} onClick={addVettedData(item)} />
            :
            <StarOutlineIcon className={classes.starredIcon} onClick={addVettedData(item)} />
        }
      </StyledTableCell>
    </StyledTableRow>
  ));
}

export default function CustomizedTables() {
  const [vettedData, setVettedData] = useState([]);
  const { account } = useWallet();
  const [loading, setLoading] = useState(true);
  const [reload, setReloading] = useState(1);
  const classes = useStyles();

  const setVettedValues = (data) => {
    if (data.length === 0) {
      setLoading(true)
    } else {
      setLoading(false)
      setVettedData(data);
    }
  };

  useEffect(() => {
    vettedValues(account, setVettedValues);
  }, []);

  const reloadComponent = () => {
    reload === 1 ? setReloading(0) : setReloading(1)
  }
  return (
    <div>
      <TableContainer>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell className={classes.tableTh}>
                Tokens
              </StyledTableCell>
              <StyledTableCell className={classes.tableTh}>
                Balance
              </StyledTableCell>
              <StyledTableCell className={classes.tableTh}></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <VettedTable className={classes} values={vettedData} reloadData={reloadComponent} />
          </TableBody>
        </Table>
      </TableContainer>
      {loading && (
        <CircularProgress size={20} className={classes.CircularProgress} />
      )}
    </div>
  );
}
