import React from "react";
import PropTypes from "prop-types";
import { AppContainerUtils, ActionForwarder, utils } from "fractal-component";
import * as actionTypes from "./actions/types";
import * as actions from "./actions/index";
import jss from "jss";
import styles from "./styles";

const { is } = utils;

class ToggleButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false
        };
        this.componentManager = AppContainerUtils.registerComponent(this, {
            namespace: "io.github.t83714/ToggleButton",
            reducer: function(state, action) {
                switch (action.type) {
                    case actionTypes.CLICK:
                        return { ...state, isActive: !state.isActive };
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
            // --- Commented out the following line as Toggle button doesn't need to process any actions (ActionForwarder below will do the job).
            // --- allowedIncomingMulticastActionTypes: "*",
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
                <div className={classes.cell}>ToggleButton</div>
                <div
                    className={`${classes.cell} ${classes["button-container"]}`}
                >
                    <button
                        className={
                            this.state.isActive
                                ? classes["active"]
                                : classes["inactive"]
                        }
                        onClick={() => {
                            this.componentManager.dispatch(actions.click());
                        }}
                    >
                        {this.state.isActive ? "ACTIVE" : "INACTIVE"}
                    </button>
                </div>
                {/*
                    Set namespacePrefix to same as this component `namespacePrefix`
                    so this ActionForwarder will get all incoming actions
                    We use `this.props.namespacePrefix` & `this.props.pattern` 
                    so that `ToggleButton` can be used as generic `action transformer` later
                    We don't need to worry if the namespace field of transformed action will match its original namespace
                    ActionForwarder will do the query and adjust accordingly
                */}
                <ActionForwarder
                    namespacePrefix={this.props.namespacePrefix}
                    pattern={this.props.pattern}
                    relativeDispatchPath={this.props.relativeDispatchPath}
                    transformer={action => {
                        let newAction;
                        if (is.func(this.props.transformer)) {
                            newAction = this.props.transformer(action);
                        } else if (is.symbol(this.props.transformer)) {
                            newAction = {
                                ...action,
                                type: this.props.transformer
                            };
                        } else {
                            throw new Error("Invalid transformer type.");
                        }
                        return {
                            ...newAction,
                            toggleButtonActive: this.state.isActive
                        };
                    }}
                />
            </div>
        );
    }
}

ToggleButton.propTypes = {
    namespacePrefix: PropTypes.string.isRequired,
    pattern: PropTypes.oneOfType([
        PropTypes.symbol,
        PropTypes.func,
        PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.string, PropTypes.func])
        )
    ]),
    relativeDispatchPath: PropTypes.string,
    transformer: PropTypes.oneOfType([PropTypes.symbol, PropTypes.func])
};

export default ToggleButton;

export { actionTypes, actions };
