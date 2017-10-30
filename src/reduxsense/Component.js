import * as React from "react";
import {combineReducers} from "redux";

export class Sense {

    constructor(component) {
        this.component = component;

        this.setupInitialState();
        this.setupActions();
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
                    this.component.props.store.dispatch({
                        type: name + "_" + this.component.props.ns,
                        payload: payload
                    });
                };
                this.actionsBridge[name + "_" + this.component.props.ns] = actions[name].bind(this.component);
            }
        }
        Sense.GlobalReducers[this.component.props.ns] = (state = this.state, action) => {
            if (this.actionsBridge.hasOwnProperty(action.type)) {
                return Object.assign({}, this.actionsBridge[action.type].call({}, state, action.payload));
            }
            return state;
        };
        this.component.props.store.replaceReducer(combineReducers(Sense.GlobalReducers));
    }

    setupSubscriptions() {
        this.component.props.store.subscribe(() => {
            this.state = this.component.props.store.getState()[this.component.props.ns];
            this.component.forceUpdate();
        });
    }
}

Sense.GlobalReducers = {};

export default class Component extends React.Component {
    constructor(props) {
        super(props);

        this.sense = new Sense(this);
    }
}