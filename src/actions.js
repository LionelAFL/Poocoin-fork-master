import axios from 'axios';

//Get all info about current token from lpaddress and token table
export const getLpinfo = (tokenId) => {
    return axios
        .get(`${process.env.REACT_APP_API}token/getLpinfo`, {
            params: { foo: tokenId },
        }).then((res) => { return res.data })
}

//Get Lpaddress from current token address and BNB token address
export const getLpaddress = async (currentTokenAddress, coinAddress) => {
    return await axios
        .get(`${process.env.REACT_APP_API}token/getLpaddress`, {
            params: { tokenAddress: currentTokenAddress, coinAddress: coinAddress },
        })
}

//Get tokenName from current token address 
export const getSymbolName = async (currentTokenAddress) => {
    return await axios
        .get(`${process.env.REACT_APP_API}token/getSymbol`, {
            params: { tokenAddress: currentTokenAddress },
        })
}
