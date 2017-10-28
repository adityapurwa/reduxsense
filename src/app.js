import * as ReactDOM from "react-dom";
import * as React from "react";
import {Counter} from "./comps/Counter";
import {createStore} from "redux";

const store = createStore(() => {
});

ReactDOM.render((
        <div>
            <Counter store={store} ns='counter_a'/>
            <Counter store={store} ns='counter_b'/>
        </div>
    )
    , document.querySelector('#app'));