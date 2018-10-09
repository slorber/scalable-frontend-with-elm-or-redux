import * as actions from "../actions";
import * as actionTypes from "../actions/types";
import {
    actions as RandomGifActions,
    actionTypes as RandomGifActionTypes
} from "../../RandomGif";

function* mainSaga(effects) {
    yield effects.takeEvery(
        RandomGifActionTypes.LOADING_START,
        function*() {
            if (!this.isLoadingStartActionDispatched) {
                yield effects.put(
                    actions.loadingStart(),
                    "../../../*"
                );
            }
        }.bind(this)
    );
    yield effects.takeEvery(
        RandomGifActionTypes.LOADING_COMPLETE,
        function*() {
            /**
             * throw exposed action out of box
             * It's guaranteed all reducers are run before saga.
             * Therefore, if you get state in a saga via `select` effect,
             * it'll always be applied state.
             */
            const { isLoading, error } = yield effects.select();
            if (!isLoading) {
                yield effects.put(
                    actions.loadingComplete(error),
                    "../../../*"
                );
                this.isLoadingStartActionDispatched = false;
            }
        }.bind(this)
    );
    // --- monitor `REQUEST_NEW_PAIR` and send multicast actions to RandomGifs
    yield effects.takeEvery(
        actionTypes.REQUEST_NEW_PAIR,
        function*() {
            yield effects.put(
                RandomGifActions.requestNewGif(),
                "./Gifs/*"
            );
        }
    );
}

export default mainSaga;