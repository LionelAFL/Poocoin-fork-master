/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  appBarSolid: {
    backgroundColor: '#000000',
    boxShadow: 'none',
    padding: 15,
    textAlign: 'center',
    borderBottom: '3px solid #484e53',
    position: 'initial'
  },
  Toolbar: {
    padding: "0px 50px 0px 50px",
    [theme.breakpoints.down("xs")]: {
      padding: '10px 0px 10px 10px',
    },
  },
  linkGroup: {
    textAlign: 'center',
    display: 'content',
    [theme.breakpoints.down("xs")]: {
      display: 'contents',
    },
  },
  link: {
    fontSize: 15,
    margin: 12,
    textDecoration: 'blink',
    color: 'white',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  chainLinkGroup: {
    marginLeft: 15,
    display: 'grid',
    marginRight: 15
  },
  chainLinkInput: {
    color: '#f4e17a',
    '&:before': {
      display: 'none'
    },
    '&:after': {
      display: 'none'
    },
    '& svg': {
      display: 'none'
    }
  },
  chainLink: {
    fontSize: 15,
    backgroundColor: '#000000!important',
    color: 'white',
  },
  iconLink: {
    display: 'flex',
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    justifyContent: 'center',
    textDecoration: 'blink'
  },
  icon: {
    marginLeft: "5px",
    height: "40px",
    width: "40px",
    cursor: "pointer",
    marginRight: "10px"
  },
  connect: {
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    fontFamily: '"Kanit", sans-serif',
    color: '#000000',
    backgroundColor: '#f4e17a',
    [theme.breakpoints.down("xs")]: {
      textAlign: 'center',
    },
  },
  coinAmount: {
    color: '#adb5bd',
    textAlign: 'left',
    fontSize: 14,
    [theme.breakpoints.down("sm")]: {
      textAlign: 'center'
    },
    [theme.breakpoints.down("xs")]: {
      paddingBottom: '20px',
      textAlign: 'left',
    },
  },
  amountColor: {
    color: '#28a745'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: '#180923',
    border: 'none',
    boxShadow: theme.shadows[5],
    padding: '40px 30px 30px 30px',
    display: 'grid',
    borderRadius: '8px',
  },
  connectBtn: {
    borderRadius: '4px',
    color: 'white',
    backgroundColor: '#000000',
    marginBottom: '.5rem',
    padding: '5px',
  },
  connectBtnDisable: {
    borderRadius: '4px',
    color: 'white',
    backgroundColor: '#000000',
    marginBottom: '.5rem',
    padding: '5px',
    cursor: 'not-allowed!important'
  },
  rightLink: {
    fontSize: '14px',
    margin: '0px',
    padding: '0px',
  },
  acc: {
    backgroundColor: '#1C1C1C',
    borderRadius: '10px',
    margin: '2px'
  },
  headerIcon: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: '10px'
    },
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBarSolid}>
      <Toolbar className={classes.Toolbar}>
        
      </Toolbar>
    </AppBar >
  );
}
