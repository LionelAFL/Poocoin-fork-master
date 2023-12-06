import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import List from "./list";
import News from "./news";
import { getTotalSupply } from "../../PooCoin/index.js";
import { numberWithCommas } from '../../PooCoin/util';
import { useSelector } from 'react-redux'

// import { useState } from "react";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  tabTitle: {
    padding: 0,
    backgroundColor: "#1C1C1C !important",
  },
  tabTitlePan: {
    backgroundColor: "#565e64 !important",
    minWidth: "0px !important",
    textTransform: "inherit !important",
    minHeight: "0px",
    top: 10,
  },
  tabpanel: {
    backgroundColor: "#1C1C1C",
    color: "#fff",
    float: "left !important",
    width: "100% !important",
  },
  item: {
    marginTop: 20,
    fontSize: 15,
    broderTop: "1px solid #141414",
    textAlign: "left",
    paddingLeft: 10,
  },
  infoBtn: {
    backgroundColor: "#fff !important",
    float: "right",
    left: "20%",
    top: 10,
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

export default function CenteredTabs(props) {
  const { lpdata, currentTokenInfo, priceRateData } = props;
  const classes = useStyles();
  const [totalSupply, setTotal] = useState();
  const currentTokenAddress = useSelector((state) => state.tokenAddress)

  useEffect(() => {
    setTotalSupply()
  }, [currentTokenAddress]);

  const setTotalSupply = async () => {
    if (currentTokenAddress !== undefined) {
      let totalSupplyData = await getTotalSupply(currentTokenAddress)
      setTotal(parseInt(totalSupplyData));
    }
  }
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        className={classes.tabTitle}
      >
        <Tab label="Token" className={classes.tabTitlePan} />
        <Tab label="News" className={classes.tabTitlePan} />
      </Tabs>
      {/* <Divider className={'mb-3 mt-3'} /> */}
      <TabPanel value={value} index={0} className={classes.tabpanel}>
        <div className={classes.item}>
          Total Supply:
          <br />{numberWithCommas(totalSupply)}
        </div>
        <List lpdata={lpdata} totalSupply={totalSupply} currentTokenInfo={currentTokenInfo} priceRateData={priceRateData} />
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.tabpanel}>
        <div className={classes.item}>
          <News />
        </div>
      </TabPanel>
    </Paper>
  );
}
