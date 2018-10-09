import * as actionTypes from "../actions/types";

const reducer = function(state, action) {
    switch (action.type) {
        case actionTypes.REQUEST_NEW_GIF:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case actionTypes.RECEIVE_NEW_GIF:
            const imageUrl = action.payload;
            return {
                ...state,
                isLoading: false,
                error: null,
                imageUrl
            };
        case actionTypes.REQUEST_NEW_GIF_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default: return state;
    }
};
export default reducer;
