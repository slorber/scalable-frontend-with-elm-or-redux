import React from "react";
//-- import fractal-component lib from src entry point
import { ActionForwarder } from "fractal-component";
import RandomGif, { actionTypes as randomGifActionTypes } from "./RandomGif";
import RandomGifPair from "./RandomGifPair";
import RandomGifPairPair from "./RandomGifPairPair";
import Counter, { actionTypes as counterActionTypes } from "./Counter";
import ToggleButton from "./ToggleButton";
import once from "lodash/once";
import jss from "jss";
import styles from "./App.style";

const createStyleSheet = once(() => {
    return jss.createStyleSheet(styles).attach();
});

export default function App() {
    const { classes } = createStyleSheet();
    return (
        <div>
            <div className={classes.table}>
                <div className={classes.cell}>
                    {/*
                        RandomGif / RandomGifPair / RandomGifPairPair support apiKey property as well
                        You can supply your giphy API key as component property
                    */}
                    <RandomGif namespacePrefix="exampleApp/RandomGif" />
                    {/*Forward `NEW_GIF` actions (and convert to `INCREASE_COUNT`) to ToggleButton for processing*/}
                    <ActionForwarder
                        namespacePrefix="exampleApp/RandomGif"
                        pattern={randomGifActionTypes.NEW_GIF}
                        relativeDispatchPath="../ToggleButton/*"
                        transformer={counterActionTypes.INCREASE_COUNT}
                    />
                </div>
                <div className={classes.cell}>
                    <Counter namespacePrefix="exampleApp/Counter" />
                </div>
            </div>
            <div className={classes.table}>
                <div className={classes.cell}>
                    <RandomGifPair namespacePrefix="exampleApp/RandomGifPair" />
                    {/*Forward `NEW_GIF` actions (and convert to `INCREASE_COUNT`) to ToggleButton for processing*/}
                    <ActionForwarder
                        namespacePrefix="exampleApp/RandomGifPair"
                        pattern={randomGifActionTypes.NEW_GIF}
                        relativeDispatchPath="../ToggleButton/*"
                        transformer={counterActionTypes.INCREASE_COUNT}
                    />
                </div>
                <div className={classes.cell}>
                    {/*
                        ToggleButton acts as a proxy --- depends on its status
                        add an `toggleButtonActive`= true / false field to all actions
                        and then forward actions to Counter
                    */}
                    <ToggleButton
                        namespacePrefix="exampleApp/ToggleButton"
                        pattern={randomGifActionTypes.INCREASE_COUNT}
                        relativeDispatchPath="../Counter/*"
                        transformer={counterActionTypes.INCREASE_COUNT}
                    />
                </div>
            </div>
            <div>
                <RandomGifPairPair namespacePrefix="exampleApp/RandomGifPairPair" />
                {/*Forward `NEW_GIF` actions (and convert to `INCREASE_COUNT`) to ToggleButton for processing*/}
                <ActionForwarder
                    namespacePrefix="exampleApp/RandomGifPairPair"
                    pattern={randomGifActionTypes.NEW_GIF}
                    relativeDispatchPath="../ToggleButton/*"
                    transformer={counterActionTypes.INCREASE_COUNT}
                />
            </div>
        </div>
    );
}
