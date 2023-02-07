import { configureStore } from '@reduxjs/toolkit';
import profileSliceReducer from "./profileSlice";
import modalSliceReducer from './modalSlice';
export default configureStore({
    reducer: {
        profile: profileSliceReducer,
        popover:modalSliceReducer
    },
});