import * as actionTypes from "./types";

export function requestNewPair() {
    return {
        type: actionTypes.REQUEST_NEW_PAIR
    };
}

export function loadingStart() {
    return {
        type: actionTypes.LOADING_START
    };
}

export function loadingComplete(error = null) {
    return {
        type: actionTypes.LOADING_COMPLETE,
        payload: {
            isSuccess: error ? false : true,
            error
        }
    };
}
