import * as ReactDOM from "react-dom";
import * as React from "react";
import {createStore} from "redux";
import TodoApp from "./comps/TodoApp";

const store = createStore(() => {
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render((
        <div>
            <TodoApp ns="todo_app" store={store}></TodoApp>
        </div>
    )
    , document.querySelector('#app'));