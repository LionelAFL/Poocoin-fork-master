import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { Fade, Button, TextField } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import ArrowDownwardTwoToneIcon from '@material-ui/icons/ArrowDownwardTwoTone';
import BNB from '../Images/BNB.png';
import PRM from '../Images/PRM.png';
import TokenSelect from './TokenSelect';
import DefaultTokens from '../config/default_tokens.json';
import { ListSubheader, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  close: {
    color: 'white',
    textAlign: 'right',
    '&:hover': {
      cursor: 'pointer',
      color: 'skyblue'
    }
  },
  paper: {
    backgroundColor: 'rgb(34, 34, 34)',
    // border: '2px solid #000',
    padding: '20px',
    width: '350px',
    border: '1px solid rgb(51, 51, 51)'
  },
  label: {
    marginBottom: '10px'
  },
  list: {
    backgroundColor: '#000000',
    color: 'white',
    zIndex: 0
  },
  listBody: {
    backgroundColor: '#303032'
  }
}));

export default function TokenModal(props) {
  const classes = useStyles();
  const [token, setToken] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const buttonClass = props.css;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onTokenSelect = (tokenInfo) => {

    const token_symbol = tokenInfo.symbol;
    const token_address = tokenInfo.address;
    const icon = `https://primalswap.io/images/tokens/${tokenInfo.address}.png`;
    setToken(<Fragment><ArrowDownwardTwoToneIcon /></Fragment>);
    props.tokenChange(token_address, token_symbol, icon);
    setOpen(false);
  }

  if (token == "") setToken(<Fragment><ArrowDownwardTwoToneIcon /></Fragment>);

  return (
    <div>
      <Button onClick={handleOpen} className={buttonClass}>{token}</Button> 
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className={classes.close} onClick={handleClose}>
              <Icon>close</Icon>
            </div>
            <div className={classes.label}>
              <span style={{color: 'white'}}>Select a token</span>
            </div>
            <TokenSelect tokenProps={onTokenSelect}></TokenSelect>
            <List
              component="nav"
              subheader={
                <ListSubheader component="div" style={{color: 'white'}}>
                  Token
                </ListSubheader>
              }
              className={classes.list}
            >
              <ListItem button className={classes.listBody} onClick={() => onTokenSelect({address: DefaultTokens.PRM.address, symbol: DefaultTokens.PRM.symbol, name: DefaultTokens.PRM.name, icon: PRM})}>
                <ListItemIcon>
                  <img src={PRM} style={{width: '20px'}}/>
                </ListItemIcon>
                <ListItemText primary="PRM" />
              </ListItem>
              <ListItem button className={classes.listBody} onClick={() => onTokenSelect({address: DefaultTokens.USDT.address, symbol: DefaultTokens.USDT.symbol, name: DefaultTokens.USDT.name, icon: `https://primalswap.io/images/tokens/${DefaultTokens.USDT.address}.png`})}>
                <ListItemIcon>
                  <img src={`https://primalswap.io/images/tokens/${DefaultTokens.USDT.address}.png`} style={{width: '20px'}}/>
                </ListItemIcon>
                <ListItemText primary="USDT" />
              </ListItem>
              <ListItem button className={classes.listBody} onClick={() => onTokenSelect({address: DefaultTokens.PRX.address, symbol: DefaultTokens.PRX.symbol, name: DefaultTokens.PRX.name, icon: `https://primalswap.io/images/tokens/${DefaultTokens.PRX.address}.png`})}>
                <ListItemIcon>
                  <img src={`https://primalswap.io/images/tokens/${DefaultTokens.PRX.address}.png`} style={{width: '20px'}}/>
                </ListItemIcon>
                <ListItemText primary="PRX" />
              </ListItem>
              <ListItem button className={classes.listBody} onClick={() => onTokenSelect({address: DefaultTokens.WPRM.address, symbol: DefaultTokens.WPRM.symbol, name: DefaultTokens.WPRM.name, icon: `https://primalswap.io/images/tokens/${DefaultTokens.WPRM.address}.png`})}>
                <ListItemIcon>
                  <img src={`https://primalswap.io/images/tokens/${DefaultTokens.WPRM.address}.png`} style={{width: '20px'}}/>
                </ListItemIcon>
                <ListItemText primary="WPRM" />
              </ListItem>
            </List>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
