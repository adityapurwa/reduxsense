import {Component} from "../reduxsense/Component";
import * as React from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export default class TodoApp extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="todo-app">
                <TodoForm ns="todo_app_form" store={this.props.store}></TodoForm>
                <TodoList ns="todo_app_list" store={this.props.store}/>
            </div>
        )
    }
}