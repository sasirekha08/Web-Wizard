import { combineReducers } from 'redux'

// toastifySlice
import toastifySlice from '../uiComponents/toastify/toastSlice'
const rootReducer = combineReducers({
    toastify: toastifySlice,
})
export default rootReducer
