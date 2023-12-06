import React, { Component, useEffect, useState } from "react";
import "../../css/advertise.css";
import { Alert } from "@material-ui/lab";
import { Card, CardHeader, OutlinedInput } from "@material-ui/core";
import VettedTable from "./ActivityTable";
import { getTotalSupply } from "../../PooCoin/index.js";

export default function Activity(props) {

  const [totalSupplyData, setTotalSupplyData] = useState([]);

  const setTotalSupply = (data) => {
    setTotalSupplyData(data);
  };

  useEffect(() => {
    getTotalSupply(setTotalSupply);
  }, []);

  return (
    <div>
      <div style={{ marginLeft: "1.3%" }}>
        <div>
          <h1 style={{ marginTop: 0 }}> Dev Wallet Checker </h1>
        </div>
        <p>
          This is a log of activity related to the token from all wallets that
          have had ownership of the contract.
        </p>
        <p>
          It will show all instances of the dev creating and removing LP,
          buying/selling the token, transferreing tokens/LP tokens/BNB to other
          wallets, and transferring ownership of the contract.
        </p>
        <hr />
        <div>
          <form style={{ maxWidth: "500px" }}>
            <div className={"mb3"}>
              <p>Manual wallet address (if it didnt appear as an owner)</p>
              <OutlinedInput className={"CInput"} />
            </div>
            <div>
              <p className={"textYellow"}>Invalid address.</p>
              <p>Token total supply: {new Intl.NumberFormat().format(totalSupplyData.totalSupply)}</p>
            </div>
            <div>
              <p>
                Wallet activity for &nbsp;
                <a href={"https://prmscan.org/address/" + totalSupplyData.owner} style={{ color: "#f4e17a" }} target="_blank" rel="noreferrer"> 
                  {totalSupplyData.owner}
                </a>
              </p>
            </div>
          </form>
        </div>
        <div>
          <VettedTable />
        </div>
        <div>
          <div>
            <p>
              Wallet activity for
              <a href="/" style={{ color: "#f4e17a" }}>
                0x79c4Af7c43F500b9cCBa9396d079cC03DFcAFdA1
              </a>
            </p>
            <p>
              Ownership transferred to
              <a href="/" style={{ color: "#f4e17a" }}>
                0x79c4Af7c43F500b9cCBa9396d079cC03DFcAFdA1
              </a>
              on3/31/20201, 5:46:31PM
            </p>
          </div>
        </div>
        <div>
          <VettedTable />
        </div>
      </div>
    </div>
  );
}
