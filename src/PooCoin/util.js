import networkInfo from '../constants/networkInfo.json';
import BigNumber from 'bignumber.js';

function dec2hexString(dec) {
    return '0x' + (parseInt(dec)).toString(16);
}

export function switchNetwork(chainId_) {
    let chainName;
    if (chainId_ == 321) {
        chainName = 'Kuchain'
    } else if (chainId_ == 39656) {
        chainName = 'PRM'
    }else if (chainId_ == 137) {
        chainName = 'Polygon'
    } else if (chainId_ == 56) {
        chainName = 'BSC'
    }
    let rpcUrl;
    networkInfo.forEach(network => {
        if (network.chainId == chainId_) {
            rpcUrl = network.rpc;
        }
    });
    let chainId = dec2hexString(chainId_);

    window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `${chainId}` }],
    })
        .catch((error) => {
            if (error.code === 4902) {
                // window.ethereum.request({
                //     method: 'wallet_addEthereumChain',
                //     params: [{ chainName: { chainName }, chainId: `${chainId}`, rpcUrl: `${rpcUrl}` }],
                // })
                //     .catch((error) => {
                //         console.log(error);
                //     })
                alert('Please add network')
            }
        })
}

export function numberWithCommas(x) {
    if (x != undefined) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}
export const toHuman = (num, decimals) => {
    const humanNum = new BigNumber(num).div(new BigNumber(10).pow(new BigNumber(decimals)));
    return humanNum.toNumber();
}

export const toBigNum = (num, decimals) => {
    return new BigNumber(num).times(new BigNumber(10).pow(new BigNumber(decimals)));
}

export const storeHistoryLocalTokenInfo = (linkAddress, name, symbol) => {
    const starredData = localStorage.getItem('history');
    let starredDataStorage = {};
    if (starredData == null) {
        const vettedDataItem = {};
        vettedDataItem['name'] = name;
        vettedDataItem['symbol'] = symbol;
        starredDataStorage[linkAddress] = vettedDataItem
    } else {
        starredDataStorage = JSON.parse(localStorage.getItem('history'));
        const vettedDataItem = {};
        vettedDataItem['name'] = name;
        vettedDataItem['symbol'] = symbol;
        starredDataStorage[linkAddress] = vettedDataItem;
    }
    localStorage.setItem('history', JSON.stringify(starredDataStorage))
}

export const storeLocalTokenInfo = (linkAddress, name, symbol, amount, rate, rateAmount) => {
    const starredData = localStorage.getItem('starred');
    let starredDataStorage = {};
    if (starredData == null) {
        const vettedDataItem = {};
        vettedDataItem['name'] = name;
        vettedDataItem['symbol'] = symbol;
        vettedDataItem['amount'] = amount;
        vettedDataItem['rate'] = rate;
        vettedDataItem['rateAmount'] = rateAmount;
        starredDataStorage[linkAddress] = vettedDataItem
    } else {
        starredDataStorage = JSON.parse(localStorage.getItem('starred'));
        const vettedDataItem = {};
        vettedDataItem['name'] = name;
        vettedDataItem['amount'] = amount;
        vettedDataItem['symbol'] = symbol;
        vettedDataItem['rate'] = rate;
        vettedDataItem['rateAmount'] = rateAmount;
        starredDataStorage[linkAddress] = vettedDataItem;
    }
    localStorage.setItem('starred', JSON.stringify(starredDataStorage))
}

export const checkLocalTokenInfo = (linkAddress) => {
    const starredData = localStorage.getItem('starred');
    if (starredData == null) {
        return false
    } else {
        const starredDataStorage = JSON.parse(localStorage.getItem('starred'));
        const ownStatus = starredDataStorage.hasOwnProperty(linkAddress);
        return ownStatus;
    }
}

export const removeLocalTokenInfo = (linkAddress) => {
    const starredDataStorage = JSON.parse(localStorage.getItem('starred'));
    delete starredDataStorage[linkAddress];
    localStorage.setItem('starred', JSON.stringify(starredDataStorage))
}

export const storeLocalMultichart = (tokenAddress) => {
    const localMultichartData = JSON.parse(localStorage.getItem('multichart'));
    if (localMultichartData == null) {
        const multichartData = {}
        const tem_data = new Array(9);
        for (let index = 0; index < 9; index++) {
            tem_data[index] = null;
        }
        tem_data[0] = tokenAddress;
        multichartData['address'] = tem_data;
        localStorage.setItem('multichart', JSON.stringify(multichartData));
    } else {
        for (let index = 0; index < 9; index++) {
            if (localMultichartData.address[index] == null) {
                localMultichartData.address[index] = tokenAddress
                break;
            }
        }
        localStorage.setItem('multichart', JSON.stringify(localMultichartData));
    }
}

export const initLocalMultichart = (index) => {
    const localMultichartData = JSON.parse(localStorage.getItem('multichart'));
    localMultichartData.address.fill(null, (index), (index + 1))
    localStorage.setItem('multichart', JSON.stringify(localMultichartData));
}
