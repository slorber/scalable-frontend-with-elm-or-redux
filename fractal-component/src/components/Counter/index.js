import React from "react";
import { AppContainerUtils } from "fractal-component";
import * as actionTypes from "./actions/types";
import * as actions from "./actions/index";
import jss from "jss";
import styles from "./styles";

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
        this.componentManager = AppContainerUtils.registerComponent(this, {
            namespace: "io.github.t83714/Counter",
            reducer: function(state, action) {
                switch (action.type) {
                    case actionTypes.INCREASE_COUNT: {
                        const { toggleButtonActive } = action;
                        const incresement =
                            state.count >= 10 && toggleButtonActive ? 2 : 1;
                        return { ...state, count: state.count + incresement };
                    }
                    default:
                        return state;
                }
            },
            /**
             * Register actions for action serialisation / deserialisation.
             * It's much easier to use Symbol as action type to make sure no action type collision among different component.
             * ( Considering we now use actions as primary way for inter-component communication, it's quite important in a multicaset action environment)
             */
            actionTypes,
            // --- specify accepted types of external multicast actions
            // --- By default, component will not accept any incoming multicast action.
            // --- No limit to actions that are sent out
            allowedIncomingMulticastActionTypes: [actionTypes.INCREASE_COUNT],
            namespaceInitCallback: componentManager => {
                const styleSheet = jss
                    .createStyleSheet(styles, {
                        generateClassName: componentManager.createClassNameGenerator()
                    })
                    .attach();
                return { styleSheet };
            },
            namespaceDestroyCallback: ({ styleSheet }) => {
                styleSheet.detach();
            }
        });
    }

    render() {
        const { styleSheet } = this.componentManager.getNamespaceData();
        const { classes } = styleSheet;
        return (
            <div className={classes.table}>
                <div className={classes.cell}>Counter</div>
                <div
                    className={`${classes.cell} ${
                        classes["counter-container"]
                    }`}
                >
                    <span>{this.state.count}</span>
                </div>
            </div>
        );
    }
}

export default Counter;

export { actionTypes, actions };
