const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')

// initial state
const initialState = {
    loading: false,
    users: [],
    error: '',
}
// definizione tipi
const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCEDED = 'FETCH_USERS_SUCCEDED'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'

// azioni
const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUESTED,
    }
}

const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCEDED,
        payload: users,
    }
}

const fetchUsersFailed = error => {
    return {
        type: FETCH_USERS_FAILED,
        payload: error,
    }
}

// reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case FETCH_USERS_SUCCEDED:
            return {
                loading: false,
                users: action.payload,
                error: '',
            }
        case FETCH_USERS_FAILED:
            return {
                loading: false,
                users: [],
                error: action.payload,
            }
    }
}

// fetch

const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
            //resonse.data is the users
            const users = response.data.map((user) => user.id)
            dispatch(fetchUsersSuccess(users))
        }).catch(error => {
            //error.message is the error message
            dispatch(fetchUsersFailed(error.message))
        })
    }
}

// store

const store = createStore(reducer, applyMiddleware(thunkMiddleware))

store.subscribe(() => {
    console.log(store.getState());
})

store.dispatch(fetchUsers())