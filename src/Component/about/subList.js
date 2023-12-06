import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#1C1C1C',
    maxHeight: '200px !important',
    overflow: 'auto',
  },
  value: {
    color: '#28a745',
  }
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function SimpleList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <List component="nav" aria-label="secondary mailbox folders"> */}
      
          <div>Pcv2|POOCOIN/BNB LP Holdings:</div>
          <div>4,383.71 BNB<span className={classes.value}>($1,544,527)</span> | <Link> Chart </Link>| <Link> Holders </Link></div>
        
      
          <div>Pcv2|POOCOIN/BNB LP Holdings:</div>
          <div>4,383.71 BNB<span className={classes.value}>($1,544,527)</span> | <Link> Chart </Link>| <Link> Holders </Link></div>
        
      
          <div>Pcv2|POOCOIN/BNB LP Holdings:</div>
          <div>4,383.71 BNB<span className={classes.value}>($1,544,527)</span> | <Link> Chart </Link>| <Link> Holders </Link></div>
        
      
          <div>Pcv2|POOCOIN/BNB LP Holdings:</div>
          <div>4,383.71 BNB<span className={classes.value}>($1,544,527)</span> | <Link> Chart </Link>| <Link> Holders </Link></div>
        
      
          <div>Pcv2|POOCOIN/BNB LP Holdings:</div>
          <div>4,383.71 BNB<span className={classes.value}>($1,544,527)</span> | <Link> Chart </Link>| <Link> Holders </Link></div>
        
      
          <div>Pcv2|POOCOIN/BNB LP Holdings:</div>
          <div>4,383.71 BNB<span className={classes.value}>($1,544,527)</span> | <Link> Chart </Link>| <Link> Holders </Link></div>
        
      {/* </List>       */}
    </div>
  );
}