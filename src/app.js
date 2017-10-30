import * as ReactDOM from "react-dom";
import * as React from "react";
import {Counter} from "./comps/Counter";
import {createStore} from "redux";

const store = createStore(() => {
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render((
        <div>
            <Counter store={store} ns='counter_a'/>
            <Counter store={store} ns='counter_b'/>
        </div>
    )
    , document.querySelector('#app'));