import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import TableTab from '../multichart/tabletab';
import HistoryTable from '../multichart/history';
import StarredTable from '../multichart/starred';
import Wallet from '../multichart/wallet';
import { useWallet } from "use-wallet";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: 0,
    boxShadow: 'inherit',
  },
  tabTilteLength: {
    minWidth: '0px !important',
    textTransform: 'none !important',
    padding: 8,
    Borders: '1px solid #fff',
    borderRadius: 2,
    // border: '1px solid #fff',
    color: '#fff',
    // backgroundColor: '#141414'
  },
  tabs: {
    backgroundColor: '#1C1C1C',
    color: '#fff',
    // border: '0px solid #1C1C1C',
    BorderBottom: '1px solid #0c0c0c'
  },
  tabpanel: {
    backgroundColor: '#1C1C1C',
    border: '0px solid #1C1C1C',
    padding: '0 !important'
  },
  tabletab: {
    padding: 0
  },
  walletContainer: {
    color: '#fff'
  },
  walletLink: {
    textAlign: 'right',
    cursor: 'pointer'
  },
  promotedLink: {
    color: '#f4e17a'
  }
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>{children}</div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function CenteredTabs({ symbol, onSymbol }) {
  const { account } = useWallet()

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        className={classes.tabs}
      >
        <Tab label="Promoted" className={classes.tabTilteLength} />
        <Tab label="Wallet" className={classes.tabTilteLength} />
        <Tab label="Starred" className={classes.tabTilteLength} />
        <Tab label="History" className={classes.tabTilteLength} />
      </Tabs>
      <TabPanel value={value} index={0} className={classes.tabpanel}>
        <Link to="/advertise" className={classes.promotedLink}>Promoted your token</Link>
        <TableTab className={classes.tableTab} onSymbol={onSymbol} />
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.tabpanel}>
        <div>
          <div className={classes.walletLink}>
            <Link to="">Restore Hidden</Link>
          </div>
          {account == null ?
            <div className={classes.walletContainer}>
              Connect your wallet to see your tokens.
            </div>
            :
            <Wallet onSymbol={onSymbol} />
          }
        </div>
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.tabpanel}>
        <StarredTable onSymbol={onSymbol} />
      </TabPanel>
      <TabPanel value={value} index={3} className={classes.tabpanel}>
        <HistoryTable onSymbol={onSymbol} />
      </TabPanel>
    </div>
  );
}