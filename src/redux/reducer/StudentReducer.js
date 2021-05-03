import { ACTION_TYPES, create } from './../actions/Student';

const initialState = {
    Info: []
}

export const Student = (state = initialState, action) =>{
    switch(action.type){
        case ACTION_TYPES.FETCH_ALL: 
            return {
                ...state,
                Info: action.payload
            }

        case ACTION_TYPES.CREATE: 
            return {
                ...state,
                Info: [...state, action.payload]
            }

        case ACTION_TYPES.UPDATE: 
            return {
                ...state,
                Info: state.Info.map(x=> x.id === action.payload.id ? action.payload : x)
            }
        
        case ACTION_TYPES.DELETE: 
            return {
                ...state,
                Info: state.Info.filter(x => x.id !== action.payload)
            }
        default:
            return state;
    }
}
