import Component from "../reduxsense/Component";
import * as React from "react";

export class Counter extends Component {
    constructor(props) {
        super(props);
    }

    data() {
        return {
            counter: 0
        }
    }

    actions() {
        return {
            INCREMENT_COUNTER(state) {
                return Object.assign({}, state, {counter: state.counter + 1});
            },
            DECREMENT_COUNTER(state) {
                return Object.assign({}, state, {counter: state.counter - 1});
            }
        }
    }

    render() {
        return (
            <div className='counter'>
                <div className="counter-value">
                    {this.sense.state.counter}
                </div>
                <div className="counter-control">
                    <button className="counter-control-button"
                            onClick={this.sense.actions.INCREMENT_COUNTER}>
                        +
                    </button>
                    <button className="counter-control-button"
                            onClick={this.sense.actions.DECREMENT_COUNTER}>
                        -
                    </button>
                </div>
            </div>
        )
    }


}