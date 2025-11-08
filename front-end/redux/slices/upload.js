import { createSlice } from "@reduxjs/toolkit";

const uploadSlice = createSlice({
    name: 'upload',
    initialState: 0,
    reducers: {
        setUpload: (state,action)=>{
            state = action.payload
            return state
        },
        getUpload: (state)=>{
            return state
        }
    }
})

export const {setUpload, getUpload} = uploadSlice.actions
export default uploadSlice.reducer