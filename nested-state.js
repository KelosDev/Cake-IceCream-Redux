// USING IMMER LIBRARY TO CHANGE STATE

/*  -----------------------------------------------------------------------------------------------
Immer è una libreria JavaScript che fornisce un modo semplice e intuitivo per gestire la mutabilità delle immutabili strutture dati in JavaScript.

Immer utilizza una tecnica chiamata "immerzione immutabile", che permette di modificare le strutture dati immutabili in modo trasparente,
rendendo più semplice l'elaborazione di queste strutture. Invece di dover creare una nuova copia di un oggetto o di un array per ogni modifica, 
Immer consente di lavorare con la struttura dati originale e gestisce automaticamente la creazione
di una nuova versione immutabile ogni volta che si verifica una modifica.
--------------------------------------------------------------------------------------------------- */

const redux = require('redux')
const produce = require('immer').produce

const initialState = {
    name: 'Vishwas',
    address: {
        street: '123 Main St',
        city: 'Boston',
        state: 'MA',
    },
}

const STREET_UPDATED = 'STREET_UPDATED'
const updateStreet = (street) => {
    return {
        type: STREET_UPDATED,
        payload: street,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case STREET_UPDATED:
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload,
            //     },
            // }

            return produce(state, (draft) => { //immer allows us to update this draft state as if state is mutable
                draft.address.street = action.payload //we are updating the property directly but under the hood immer translates the code to something like we have above commented
            })
        default: {
            return state
        }
    }
}

const store = redux.createStore(reducer)
console.log('Initial State', store.getState())

const unsubscribe = store.subscribe(() => {
    console.log('Updated State', store.getState());
})
store.dispatch(updateStreet('456 Main St'))
unsubscribe()
