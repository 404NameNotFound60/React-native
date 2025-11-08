import { createSlice } from "@reduxjs/toolkit";

const fileSlice = createSlice({
    name: 'file',
    initialState: null,
    reducers: {
        selectFile: (state,action)=>{
            state = action.payload
            return state
        },
        resetFile: (state)=>{
            state = null
            return state
        }
    }
})

export const {selectFile, resetFile} = fileSlice.actions
export default fileSlice.reducer