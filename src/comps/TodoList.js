import {Component} from "../reduxsense/Component";
import * as React from "react";

export default class TodoList extends Component {
    constructor(props) {
        super(props);
    }

    data() {
        return {
            items: [
                'Everything is awesome'
            ]
        }
    }
    exports(){
        return true;
    }

    actions() {
        return {
            ADD_ITEM(state, payload) {
                return Object.assign({}, state, {items: state.items.concat(payload)})
            },
            REMOVE_ITEM(state, payload) {
                return Object.assign({}, state, {items: state.items.filter((item, i) => i !== payload)});
            }
        }
    }

    render() {
        return (
            <ul>
                {this.renderItems()}
            </ul>
        )
    }

    onRemoveItemClick(index) {
        this.sense.actions.REMOVE_ITEM(index);
    }

    renderItems() {
        return this.sense.state.items.map((item, i) => {
            return <li key={i}>{item} <a href="#" onClick={this.onRemoveItemClick.bind(this, i)}>Delete</a></li>
        })
    }
}