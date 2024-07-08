import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducer'

const initialState = {}

const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    initialState: initialState,
})
export default store
