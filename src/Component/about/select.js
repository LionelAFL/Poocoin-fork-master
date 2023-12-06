import React from "react";
import Select, { components } from "react-select";
// import { colourOptions } from '../data';

const Placeholder = (props) => {
  return <components.Placeholder {...props} />;
};

const options = [
  { label: "Pc v2 POOCOIN/BNB", value: "1" },
  { label: "Pc v1 POOCOIN/BNB", value: "2" },
  { label: "Pc v2 POOCOIN/BUSD", value: "3" },
  { label: "Pc v1 POOCOIN/BUSD", value: "4" },
  { label: "Pc v2 POOCOIN/Cake", value: "5" },
  { label: "Pc v2 POOCOIN/USDT", value: "6" },
  { label: "Babyswap POOCOIN/USDT", value: "7" },
  { label: "Babyswap POOCOIN/BNB", value: "8" },
];

export default () => (
  <Select
    closeMenuOnSelect={false}
    components={{ Placeholder }}
    placeholder={""}
    styles={{
      width: 230,
      placeholder: (base) => ({
        ...base,
        fontSize: "1em",
        // color: colourOptions[2].color,
        fontWeight: 400,
      }),
    }}
    options={options}
    value={options[0]}
  />
);
