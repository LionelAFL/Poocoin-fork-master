const initialState = {
    tokenAddress: '',
    tokenName: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SET_TOKENADDRESS':
            return {
                ...state,
                tokenAddress: action.payload
            };
        case 'SET_TOKENNAME':
            return {
                ...state,
                tokenName: action.payload
            };
        default:
            return state;
    }
}