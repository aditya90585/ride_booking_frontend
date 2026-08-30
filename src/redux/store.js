import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlices"
import captainSlice from "./Slices/captainSlices";

export const store = configureStore({
    reducer: {
        userSlice,
        captainSlice
    }
})