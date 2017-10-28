import * as React from "react";
import {combineReducers} from "redux";

class Sense {

    constructor(component) {
        this.component = component;

        this.setupState();
        this.setupActions();
        this.setupSubscription();
    }

    setupState() {
        // Initial state is taken from the component data().
        this.state = this.component.data();
    }

    setupActions() {
        // This is sense actions, not reducer.
        let actions = this.component.actions();
        Sense.GlobalReducers[this.component.props.ns] = (state = this.component.props.store.getState(), act) => {
            if (actions.hasOwnProperty(act.type)) {
                return Object.assign({}, actions[act.type](state, act.payload));
            }
            return this.component.data();
        };
        // This makes Reduxsense doesn't work with other reducers.
        this.component.props.store.replaceReducer(combineReducers(Sense.GlobalReducers));
        // This is for user to call from component e.g. this.sense.actions.ACTION_NAME
        this.actions = {};
        for (let prop in actions) {
            if (actions.hasOwnProperty(prop)) {
                // Copy all action definitions from the component, and bind sense as context, replace the state with
                // the value taken from the namespace
                this.actions[prop] = ((payload) => {
                    this.component.props.store.dispatch({
                        type: prop,
                        payload: payload
                    })
                }).bind(this, this.component.props.store.getState()[this.component.props.ns]);
            }
        }
    }

    setupSubscription() {
        this.component.props.store.subscribe(() => {
            // Allow user to use this.sense.state.state_name
            this.state = this.component.props.store.getState()[this.component.props.ns];
            this.component.forceUpdate();
        });
    }
}

// Global reducers is a combination of reducers created by Reduxsense
Sense.GlobalReducers = {};

export default class Component extends React.Component {
    constructor(props) {
        super(props);

        this.sense = new Sense(this);
        this.state = this.sense.state;
    }
}