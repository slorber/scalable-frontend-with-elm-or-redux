import * as actionTypes from "../actions/types";
import * as actions from "../actions";

function fetchGif(apiKey) {
    return fetch(
        `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`
    ).then(response => response.json()).catch(error=>{
        throw new Error("Giphy API key is invalid or exceeded its daily / hourly limit.");
    });
}

/**
 * All user defined saga will be passed with `effects` object with the following:
 * @param {Object} effects
 * @param {function} effects.take - e.g. yield effects.take(actionPattern)
 * @param {function} effects.put - e.g. yield effects.put(action,optionalRelativeDispatchPath)
 * @param {function} effects.select - e.g. yield effects.take(actionPattern)
 * @param {function} effects.takeEvery
 * @param {function} effects.takeLatest
 * @param {function} effects.takeLeading
 * @param {function} effects.throttle
 * @param {function} effects.actionChannel
 * 
 * Those effects are provide the same functionality as the `effects` provided by `redux-saga` (https://redux-saga.js.org/docs/api/)
 * except any action related effects are namespaced. i.e. You only see actions are sent to your namespace.
 * You can, however, opt to receive at global level (i.e. receive all actions) by using `effects` import from `redux-saga`.
 * e.g. 
 *  import { take } from "redux-saga/effects"; 
 *  const action = yield take("*"); //--- take an `any` action from global level
 */
const mainSaga = function*(effects, apiKey) {
    yield effects.takeLeading(actionTypes.REQUEST_NEW_GIF, function*() {
        try {
            /**
             * Dedicated LOADING_START action to notify interested components outside
             * This component will not use it in any way
             */
            yield effects.put(actions.loadingStart(), "../../../*");

            const response = yield effects.call(fetchGif, apiKey);
            const imgUrl = response.data.fixed_width_small_url;
            yield effects.put(actions.receiveNewGif(imgUrl));
            /**
             * The optional second `relativeDispatchPath` parameter defines
             * the relative (from current component full namespace path) namespace dispatch path.
             * i.e. suppose the current component full namespace path is:
             *  namespacePrefix        namespace                  random component ID
             *    `xxxxxx`   /  `io.github.t83714/RandomGif`  /        `cx`
             * e.g. `exampleApp/Gifs/io.github.t83714/RandomGif/c0`
             * If `relativeDispatchPath` is `../../../*`, the effective dispatch path is `exampleApp/Gifs/*`.
             * Although, theoretically, you could use `relativeDispatchPath` & ".." to dispatch the action
             * into any namespace, you should throw the action just out of the your component 
             * as you are supposed to know nothing about outside world as a component author.
             */
            //--- optional second `relativeDispatchPath` parameter
            //--- specify the action dispatch path
            yield effects.put(actions.newGif(), "../../../*");
            /**
             * Dedicated LOADING_COMPLETE action to notify interested components outside
             */
            yield effects.put(actions.loadingComplete(), "../../../*");
        } catch (e) {
            yield effects.put(actions.requestNewGifError(e));
            /**
             * Dedicated LOADING_COMPLETE action to notify interested components outside
             * This component will not use it in any way
             */
            yield effects.put(actions.loadingComplete(e), "../../../*");
        }
    });
};
export default mainSaga;
