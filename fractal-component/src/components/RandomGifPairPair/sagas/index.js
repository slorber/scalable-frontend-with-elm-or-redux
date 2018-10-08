import * as actions from "../actions";
import * as actionTypes from "../actions/types";
import {
    actions as RandomGifPairActions,
    actionTypes as RandomGifPairActionTypes
} from "../../RandomGifPair";

function* mainSaga(effects) {
    yield effects.takeEvery(
        RandomGifPairActionTypes.LOADING_START,
        function*() {
            if (!this.isLoadingStartActionDispatched) {
                yield effects.put(actions.loadingStart(), "../../../*");
            }
        }.bind(this)
    );
    yield effects.takeEvery(
        RandomGifPairActionTypes.LOADING_COMPLETE,
        function*() {
            /**
             * throw exposed action out of box
             * It's guaranteed all reducers are run before saga.
             * Therefore, if you get state in a saga via `select` effect,
             * it'll always be applied state.
             */
            const { isLoading, error } = yield effects.select();
            if(!isLoading){
                yield effects.put(
                    actions.loadingComplete(error),
                    "../../../*"
                );
                this.isLoadingStartActionDispatched = false;
            }
        }.bind(this)
    );
    // --- monitor `REQUEST_NEW_PAIR_PAIR` and send multicast actions to RandomGifPairs
    yield effects.takeEvery(
        actionTypes.REQUEST_NEW_PAIR_PAIR,
        function*() {
            yield effects.put(
                RandomGifPairActions.requestNewPair(),
                "./GifPairs/*"
            );
        }
    );
}

export default mainSaga;