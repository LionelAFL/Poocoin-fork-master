import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import TableTab from "../home/tabletab";
import HistoryTable from "../home/history";
import StarredTable from "../home/starred";
import Wallet from "../home/wallet"
import { useWallet } from "use-wallet";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: 0,
    boxShadow: "inherit",
    width: "98%",
    marginLeft: "1%",
  },
  tabTilteLength: {
    minWidth: "0px !important",
    textTransform: "none !important",
    padding: 8,
    Borders: "1px solid #fff",
    borderRadius: 2,
    // border: '1px solid #fff',
    color: "#fff",
    // backgroundColor: '#141414'
  },
  tabs: {
    backgroundColor: "#1C1C1C",
    color: "#fff",
    // border: '0px solid #1C1C1C',
    borderBottom: "1px solid #0c0c0c",
  },
  tabpanel: {
    backgroundColor: "#1C1C1C",
    border: "0px solid #1C1C1C",
    padding: "0 !important",
  },
  tabletab: {
    padding: 0,
  },
  walletContainer: {
    color: "#fff",
  },
  walletLink: {
    textAlign: 'right',
    cursor: 'pointer',
    // float: 'right'
  },
  promotedLink: {
    color: "#f4e17a",
  },
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

export default function CenteredTabs() {
  const classes = useStyles();
  const { account } = useWallet()
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
        <Tab label="Wallet" className={classes.tabTilteLength} />
        <Tab label="Promoted" className={classes.tabTilteLength} />
        <Tab label="Starred" className={classes.tabTilteLength} />
        <Tab label="History" className={classes.tabTilteLength} />
      </Tabs>
      <TabPanel value={value} index={0} className={classes.tabpanel}>
        <div>
          {account == null ?
            <div className={classes.walletContainer}>
              Connect your wallet to see your tokens.
            </div>
            :
            <Wallet />
          }
        </div>
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.tabpanel}>
        <Link to="/advertise/banners" className={classes.promotedLink}>
          Promote your token
        </Link>
        <TableTab className={classes.tableTab} />
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.tabpanel}>
        <StarredTable />
      </TabPanel>
      <TabPanel value={value} index={3} className={classes.tabpanel}>
        <HistoryTable />
      </TabPanel>
    </div>
  );
}
