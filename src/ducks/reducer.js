import axios from 'axios'
let initialState = {
    user: undefined,
    inventory: []
}

const FULFILLED = '_FULFILLED';
const PENDING = '_PENDING';
const UPDATE_USER = 'UPDATE_USER';
const CHECK_USER = 'CHECK_USER';
const DESTROY_SESSION = 'DESTROY_SESSION';
const GET_INV = 'GET_INV'

export default function reducer(state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
        case UPDATE_USER:
            return Object.assign({}, state, { user: payload });
        case CHECK_USER + FULFILLED:
            return Object.assign({}, state, { user: payload })
        case DESTROY_SESSION + FULFILLED:
            return Object.assign({}, state, { user: payload })
        case GET_INV + FULFILLED:
            return Object.assign({}, state, { inventory: payload });
        default:
            return state;
    }
}
export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payload: user,
    }
}
export function checkUser() {
    let currUser = axios.get('/checkuser')
        .then(res => res.data)
    console.log(currUser)
    return {
        type: CHECK_USER,
        payload: currUser
    }
}
export function logOut() {
    let logout = axios.post('/logout').then(e => { })
    return {
        type: DESTROY_SESSION,
        payload: logout
    }
}
export function getInv() {
    let inv = axios.get('/inventory').then(res => res.data)
    console.log(initialState.inventory)
    return {
        type: GET_INV,
        payload: inv
    }
}
