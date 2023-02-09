const redux = require('redux') //da mettere all'inizio della pagina
const createStore = redux.createStore //a inizio pagina
const bindActionCreators = redux.bindActionCreators //a inizio pagina

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'

const combineReducers = redux.combineReducers

// definizione di un'AZIONE

const orderCake = () => { // funzione che crea un'azione e ritorna un oggetto
    return { // azione -> oggetto che ha una proprietà 'type'
        type: CAKE_ORDERED,
        payload: 1, // rinomino 'quantity' in 'payload'. -> in redux è una convenzione usare una proprietà chiamata 'payload' per ogni informazione aggiuntiva che vogliamo inviare
    }
}

const restockCake = (qty = 1) => {
    return {
        type: CAKE_RESTOCKED,
        payload: qty,
    }
}

const orderIceCream = (qty = 1) => {
    return {
        type: ICECREAM_ORDERED,
        payload: qty
    }
}

const restockIceCream = (qty = 1) => {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty
    }
}

// definizione di uno stato iniziale

const initialCakeState = {
    numOfCakes: 10,
}

const initialIceCreamState = {
    numOfIceCreams: 20,
}

// definizione di un REDUCER   ->    (previousState, action) => newState

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state, // copio prima tutto lo state, poi modifico solo lo stato del numOfCakes lasciando inalterate eventuali altre proprietà di initialState
                numOfCakes: state.numOfCakes - 1  //state.numOfCakes è lo stato precedente
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload,
            }
        default:
            return state
    }
}
const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case ICECREAM_ORDERED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1
            }
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams + action.payload
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})



// definizione dello STORE

const store = createStore(rootReducer)
console.log('initial state', store.getState());

// allow the app to subscribe/to changes in the store -> use the subscribe method
const unsubscribe = store.subscribe(() => console.log('updated state', store.getState()))

// now the store has to provide a dispatch method to update the state
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(3))

// oppure anzichè store.dispatch posso usare bindActionCreators (non molto usato comunque)

const actions = bindActionCreators({ orderCake, restockCake, orderIceCream, restockIceCream }, store.dispatch)
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)
actions.orderIceCream()
actions.orderIceCream()
actions.orderIceCream()
actions.restockIceCream(3)

// now we have to unsubscribe the store by calling the function returned by the subscribe method

unsubscribe()

