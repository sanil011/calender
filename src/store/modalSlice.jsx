import { createSlice } from '@reduxjs/toolkit';
const initialState = { popove: false,id:"" }

export const modalSlice = createSlice({
    name: "popover",
    initialState,
    reducers: {
        modalOpen: (state, action) => {
            state.popove = action.payload
        },
        modalClose: (state, action) => {
            state.popove = action.payload
        }

    }
})

export default modalSlice.reducer

export const modalActions = modalSlice.actions;