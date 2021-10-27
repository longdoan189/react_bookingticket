const stateDefault = {
    tintuc: []
}

export const NewsReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case "LAY_TIN_TUC": {
            state.tintuc = action.tintuc;
            return {...state}
        }
        case "testing": {
            return {...state}
        }
        default: return {...state}
    }
}