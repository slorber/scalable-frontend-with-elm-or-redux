import { actionTypes as RandomGifPairActionTypes } from "../../RandomGifPair";

const reducer = function(state, action) {
    switch (action.type) {
        case RandomGifPairActionTypes.LOADING_START:
            return {
                ...state,
                isLoading: true,
                itemsLoading: {
                    ...state.itemsLoading,
                    [action.componentId]: true
                }
            };
        case RandomGifPairActionTypes.LOADING_COMPLETE:
            const { isSuccess, payloadError } = action.payload;
            let { itemsLoading, error } = state;
            itemsLoading = {
                ...itemsLoading,
                [action.componentId]: false
            };
            let isLoading = false;
            Object.keys(itemsLoading).forEach(componentId => {
                if (itemsLoading[componentId]) isLoading = true;
            });
            return {
                ...state,
                isLoading,
                error: error
                    ? error
                    : isSuccess
                        ? null
                        : payloadError,
                itemsLoading
            };
        default:
            return state;
    }
};
export default reducer;
