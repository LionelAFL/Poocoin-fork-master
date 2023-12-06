import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TokenInput from "./TokenInput";
import Select from "react-select";
// import { Field } from 'react-final-form'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: 300,
    [theme.breakpoints.down("xs")]: {
      width: 250,
    },
  },
  formControl: {
    minWidth: 120,
    backgroundColor: "white",
    fontSize: "10px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  tokenSelectParent: {
    flexBasis: "450px",
  },
  tokenSelect: {
    width: "100%",
    "& .MuiInputBase-input": {
      padding: ".75rem 3rem .75rem .75rem",
      fontSize: "1rem",
      fontWeight: 400,
      color: "rgb(128 128 128)",
      zIndex: 9999,
    },
    "& .MuiSelect-select": {
      fontSize: "13px",
    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #9fdcff!important",
      outline: 0,
      boxShadow: "0 0 0 .25rem rgba(62,184,255,.25)",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      backgroundColor: "white",
    },
  },
  option: {
    marginTop: "2rem",
  },
  button: {
    marginLeft: 5,
    backgroundColor: "white",
    minWidth: "25px!important",
    border: "1px solid #c4c4c4",
  },
}));

export default function SimpleSelect({ tokenProps, inputHandle }) {
  const [inputText, setInputText] = useState("");
  let tokens = [];
  const [tokensArray, setTokenArray] = useState([]);

  useEffect(() => {
    if (inputText.length > 1) {
      axios
        .get(`${process.env.REACT_APP_API}token/getTokenName`, {
          params: { foo: inputText },
        })
        .then((res) => {
          console.log(process.env.REACT_APP_API)
          for (var idx in res.data) {
            console.log(res.data)
            let combined_json = {};
            combined_json["label"] = `${res.data[idx]["name"]} (${res.data[idx]["symbol"]}) ${res.data[idx]["token"]}`;
            combined_json["value"] = res.data[idx]["token"];
            combined_json["symbol"] = res.data[idx]["symbol"];
            combined_json["name"] = res.data[idx]["name"];
            combined_json["address"] = res.data[idx]["token"];
            tokens.push(combined_json);
          }
          setTokenArray(tokens);
        });
      // setTokenArray(getSearchTokenName(inputText));
    }
  }, [inputText]);

  const classes = useStyles();
  const [isToken, setIsToken] = React.useState(1);

  const onOnlyToken = () => {
    setIsToken(!isToken);
  };

  const tokenSelect = (e) => {
    tokenProps(e);
  };

  const tokenInputChange = (inputValue) => {
    if (inputValue.length > 1) {
      setInputText(inputValue);
    }
  };

  let search;
  if (isToken)
    search = (
      <FormControl variant="outlined" className={classes.tokenSelect}>
        <Select
          options={tokensArray}
          onChange={tokenSelect}
          onInputChange={tokenInputChange}
          placeholder="Enter token name / address..."
        ></Select>
      </FormControl>
    );
  else search = <TokenInput inputHandle={inputHandle}></TokenInput>;

  return (
    <div className={classes.root}>
      {search}
      {/* <Button className={classes.button} onClick={onOnlyToken}>
        <Search />
      </Button> */}
    </div>
  );
}
