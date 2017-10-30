import {Component, Sense} from "../reduxsense/Component";
import * as React from "react";
import TodoList from "./TodoList";

export default class TodoForm extends Component {
    constructor(props) {
        super(props);

        this.onSaveClick = this.onSaveClick.bind(this);
        this.onTodoInputKeyUp = this.onTodoInputKeyUp.bind(this);
    }

    data() {
        return {
            todoInput: ''
        }
    }

    actions() {
        return {
            SET_TODO_INPUT_TEST(state, payload) {
                return Object.assign({}, state, {todoInput: payload});
            }
        }
    }

    onSaveClick() {
        Sense.from('todo_app_list').sense.actions.ADD_ITEM(this.sense.state.todoInput);
    }

    onTodoInputKeyUp(event) {
        this.sense.actions.SET_TODO_INPUT_TEST(event.target.value);
    }

    render() {
        return (
            <div className="todo-app--form">
                <form>
                    <input type="text" className="todo-app--form-input" onKeyUp={this.onTodoInputKeyUp}/>
                    <button type="button" className="todo-app-form-button" onClick={this.onSaveClick}>Save</button>
                </form>
            </div>
        )
    }
}