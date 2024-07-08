import { createSlice } from '@reduxjs/toolkit'

const toastType = ['success', 'error']
const initialState = {
    message: '',
    type: '',
    visible: false,
}

export const toastifySlice = createSlice({
    name: 'toastify',
    initialState,
    reducers: {
        openToast: (state, action) => {
            state.message = action.payload.message
            state.type = action.payload.type
            state.visible = true
        },
        closeToast: (state) => {
            state.message = ''
            state.type = ''
            state.visible = false
        },
    },
})

export const { closeToast, openToast } = toastifySlice.actions
export default toastifySlice.reducer
