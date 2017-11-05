import * as ReactDOM from "react-dom";
import * as React from "react";
import {createStore} from "redux";
import TodoApp from "./comps/TodoApp";
import {Sense} from "./reduxsense/Component"

const store = createStore(() => {
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

Sense.registerStore(store);

ReactDOM.render((
        <div>
            <TodoApp ns="todo_app"></TodoApp>
        </div>
    )
    , document.querySelector('#app'));