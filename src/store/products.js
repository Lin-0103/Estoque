// ---  ACTIONS TYPE
const actionsType = {
    add: 'ProductAdd',
    Exit: 'ProductExit',
    Enter: 'ProductEnter',
    getAllProducts: 'getAllProducts',
    postAdd: 'postAdd'
}

// ---  ACTIONS
const Actions = {
    add: (product) => ({
        payload: product,
        type: actionsType.add
    }),
    Enter: (product) => ({
        payload: product,
        type: actionsType.Enter
    }),
    Exit: (product) => ({
        payload: product,
        type: actionsType.Exit
    }),
    getAllProducts: (product) => ({
        payload: product,
        type: actionsType.getAllProducts
    }),
    postAdd: (product) => ({
        payload: product,
        type: actionsType.postAdd
    })
}

//---   INTIAL STATE
const initial_state = [
]

//---   REDUCER
function ProductReducer(state = initial_state, action) {

    const { type, payload } = action

    switch (type) {
        case actionsType.add:
            return [...state, payload]
        case actionsType.getAllProducts:
            return [...payload]
        case actionsType.postAdd:
            break
        case actionsType.Enter:
        case actionsType.Exit:
        default:
            return state
    }
}

export { ProductReducer, Actions, actionsType }