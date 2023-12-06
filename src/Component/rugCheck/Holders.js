import React from "react";
import "../../css/advertise.css";
import { Alert } from "@material-ui/lab";
import { Card, CardHeader, OutlinedInput } from "@material-ui/core";
import HoldersTable from "./HoldersTable";

export default function Holders(props) {
  return (
    <div>
      <div>
        <div>
          <h1 style={{ marginTop: 0 }}> Basic checks </h1>
        </div>
        <p>If the token has just launched, do these basic checks.</p>
        <p>
          Check the % of supply the top{" "}
          <a href="/" style={{ color: "#f4e17a" }}>
            holders
          </a>{" "}
          have. If the top holder has a very high percentage and are a wallet,
          it could be a rug.
        </p>
        <p>
          Did they burn 50% of the supply instantly after the initial supply was
          minted? If so, all of the other wallets % holdings are actually double
          what they say in prmscan. Burning a large amount of the initial supply
          before launch is usually a trick to mislead people into thinking a 20%
          holder is a 10% holder. Some projects even shill the burn as if it was
          some sort of sacrifice on their part. Check the project website to see
          if they are transparent about why they did this initial burn.
        </p>
        <p>
          Check that they have locked the LP. For example, this the{" "}
          <a href="/" style={{ color: "#f4e17a" }}>
            BNB LP
          </a>{" "}
          of the selected token (some tokens may use BUSD or something else as
          their main LP). If the top holder has almost 100% of the supply and is
          a wallet address, the LP has not been locked/burned.
        </p>
        <p>
          If the top holder of LP has the burn address (any address starting
          with 0x0000...), the LP is burned.
        </p>
        <p>
          If the top holder of LP is a contract address (one that has this icon
          ), the LP has likely been locked. Ensure that the lock timer is longer
          than at least 2 months for it to be safe. You need the project owners
          to publish the url of the LP lock timer to know how long it is locked
          for (usually dxsale or unicrypt).
        </p>
        <p>
          If the token has pools/farms, the top holder will usually be the
          pool/farm contract.
        </p>
        <div>
          <h1 style={{ marginTop: 0 }}> Top receivers </h1>
        </div>
        <p>Token total supply: 1,000,000,000,000,000.0000</p>
        <p>
          Often, the dev will distribute their initial supply across multiple
          wallets to hide the amount that they own. This table shows the top 10
          receivers of the token (even if they have sent it to other wallets).
        </p>
        <p>
          Check if the the supply was transferred to them by the dev wallet, or
          purchased instantly after creating the LP and the sum of money spent
          purchasing. If a large amount was spent in the first few minutes of
          creating the LP, it is probably one of the dev wallets. However, if it
          was only a small amount of money spent, it is probably just a snipe
          bot.
        </p>
        <HoldersTable />
        <p>
          Below is a chart of when the selected wallet purchased all their
          tokens.
        </p>
        <h1>Chart</h1>
      </div>
    </div>
  );
}
