# Reduxsense

> Set of interfaces and standards for using react and redux to make them
feels natural.

## Example

Reduxsense allows you to define stores states and mutations
inside the component directly:

```jsx harmony
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
        // Call actions from other component
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
```

### Running The Example

There is an example that shows Reduxsense works, it is located inside [example/index.html](example/index.html),
it is by default use the [dist/app.js](dist/app.js) file, but you can configure it to fit your needs.

Simply run the [example/index.html](example/index.html) file, and you should see Reduxsense in action.

## Important

Reduxsense replaces your store reducers, so it might not work with your existing reducers.
This is an experimental project and not optimized, use with caution.

## Documentation

### How It Works

Reduxsense wraps your component and add **senses** to it. The component senses
will then be exposed to Redux store and reducers.

### Store Passing

For now, you have to pass the `store` object from `createStore` as props to every children that might
need to use that store.

### Defining States

To define initial states, you have to define `data()` method inside your component.

```jsx harmony
data(){
    return {
        myState: 'Foo'
    }
}
```

You have to return an object inside the `data()` method. To access the state, you have to use
`this.sense.state`.

### Defining Mutations

To define mutations/actions, you have to define `actions()` method inside your component.

```jsx harmony
actions(){
    return {
        MY_MUTATION_NAME(state, payload){
            return Object.assign({}, state);
        },
        OTHER_MUTATION(state,payload){
            return Object.assign({}, state);
        }
    }
}
```

Reduxsense will create reducers for your mutations, allowing you to simply call
`this.sense.actions.MY_MUTATION_NAME(payload)` from your component and Reduxsense will route it
to the proper reducers.

### Namespacing

Reduxsense requires you to properly namespace your component, especially if it extends from the `Reduxsense.Component`
class. You can specify your component namespace via the `ns` property.

```jsx harmony
<MyComponent ns="my_component"/>
```

The best practice for naming your namespace is using underscore as word separator. Namespace allows Reduxsense
to properly map the reducers to the correct component and vice versa.

**Without proper namespacing, you might experience unexpected behaviour when using Reduxsense, always namespace
your component.**

### Accessing Other Component

Reduxsense allows you to export component that will be used by other component by defining the `exports()` method
inside the shared component.

```jsx harmony
exports(){
    return true;
}
```

Simply return true inside the method and Reduxsense will expose that component that you can access via the namespace.

```jsx harmony
Sense.from('exported_component_namespace').sense.actions.EXPORTED_COMPONENT_MUTATION(payload);
```

## Contributing

Contribute by writing unit tests, optimization, and documentation.
