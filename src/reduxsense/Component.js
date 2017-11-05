import * as React from "react";
import { combineReducers } from "redux";
import PropTypes from "prop-types"

export class Sense {

    constructor(component) {
        this.component = component;

        if (this.component.data) {
            this.setupInitialState();
        }
        if (this.component.actions) {
            this.setupActions();
        }
        if (this.component.exports) {
            if (this.component.exports()) {
                Sense.Exports[this.component.props.ns] = this.component;
            }
        }
        this.setupSubscriptions();
    }

    setupInitialState() {
        this.state = this.component.data();
    }

    setupActions() {
        const actions = this.component.actions();

        this.actions = {};
        this.actionsBridge = {};
        for (const name in actions) {
            if (actions.hasOwnProperty(name)) {
                this.actions[name] = (payload) => {
                    Sense._store.dispatch({
                        type: name + "_" + this.component.props.ns,
                        payload: payload
                    });
                };
                this.actionsBridge[name + "_" + this.component.props.ns] = actions[name].bind(this.component);
            }
        }
        Sense.GlobalReducers[this.component.props.ns] = (state = this.state, action) => {
            if (this.actionsBridge.hasOwnProperty(action.type)) {
                return this.actionsBridge[action.type](state, action.payload);
            }
            return state;
        };
        Sense._store.replaceReducer(combineReducers(Sense.GlobalReducers));
    }

    setupSubscriptions() {
        Sense._store.subscribe(() => {
            this.state = Sense._store.getState()[this.component.props.ns];
            this.component.forceUpdate();
        });
    }
}

Sense.GlobalReducers = {};
Sense.Exports = {};
Sense.from = function (exportNamespace) {
    return Sense.Exports[exportNamespace];
};
Sense.registerStore = function(store){
    Sense._store = store;
}

export class Component extends React.Component {
    constructor(props, context) {
        super(props);

        this.sense = new Sense(this);        
    }    
}