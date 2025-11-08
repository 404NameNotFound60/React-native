import { configureStore } from "@reduxjs/toolkit";
import upload from './slices/upload'
import file from './slices/file'

const store = configureStore({
    devTools: true,
    reducer: {
        upload,
        file
    }
})

export default store