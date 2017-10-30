import Component from "../reduxsense/Component";
import * as React from "react";

export class Counter extends Component {
    constructor(props) {
        super(props);

        this.incrementCounter = this.incrementCounter.bind(this);
        this.decrementCounter = this.decrementCounter.bind(this);
    }

    incrementCounter() {
        this.sense.actions.INCREMENT_COUNTER({});
    }

    decrementCounter() {
        this.sense.actions.DECREMENT_COUNTER({});
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
                            onClick={this.incrementCounter}>
                        +
                    </button>
                    <button className="counter-control-button"
                            onClick={this.decrementCounter}>
                        -
                    </button>
                </div>
            </div>
        )
    }


}