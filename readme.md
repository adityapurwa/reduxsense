# Reduxsense

> Set of interfaces and standards for using react and redux to make them
feels natural.

## Example

Reduxsense allows you to do this:

```jsx harmony
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
    // NOT YET IMPLEMENTED
    // Allows you to reuse other components actions.
    // Used as this.imports.nav.SET_PAGE()
    imports(){
        return {
            nav: NavComponent.sense,
            other: OtherComponent.sense
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

// Then in app bootstrapper
const store = createStore(() => {});
ReactDOM.render((
        <div>
            <Counter store={store} ns='counter_a'/>
            <Counter store={store} ns='counter_b'/>
        </div>
    ), document.querySelector('#app'));
```

Allowing you to write your store definition
inside your react component directly, so it is easier to find any actions
between your react component and your redux store.

## Important

**Namespacing does not work yet, so if you press the counter A, the counter B will 
have its state changed.**

*If you have any idea on how to make namespace properly work, please
submit a pull request*

## Contributing

The most important issue to solve now is the namespace issue, and if you 
want to contribute on other parts of this project, we would gladly accept it
too.
