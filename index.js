const redux = require('redux') //da mettere all'inizio della pagina
const createStore = redux.createStore //a inizio pagina
const bindActionCreators = redux.bindActionCreators //a inizio pagina
const applyMiddleware = redux.applyMiddleware

const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'

const combineReducers = redux.combineReducers

//AZIONI

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

// STATO INIZIALE

const initialCakeState = {
    numOfCakes: 10,
}

const initialIceCreamState = {
    numOfIceCreams: 20,
}

// REDUCERS  ->    (previousState, action) => newState

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



// STORE

const store = createStore(rootReducer, applyMiddleware(logger))
console.log('initial state', store.getState());

// allow the app to subscribe/to changes in the store -> use the subscribe method
const unsubscribe = store.subscribe(() => { })

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

