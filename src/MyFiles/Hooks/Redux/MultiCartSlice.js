import {createSlice} from '@reduxjs/toolkit'

const initialState = [];

export const MultiCartSlice = createSlice({  
    name: 'multicart',
    initialState,
    reducers: {
        incrementAdd(state, action){
            state.push(action.payload)
        },
        inremove(state, action){
            return state.filter((myData) => myData.id !== action.payload)
        }
    },
    }

)

export const { incrementAdd, inremove } = MultiCartSlice.actions;

export default MultiCartSlice.reducer;