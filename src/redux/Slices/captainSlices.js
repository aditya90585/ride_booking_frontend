import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    captainData: null,
    captainAuthStatus:null
}

const captainSlices = createSlice({
    name: "captainAuth",
    initialState,
    reducers: {
        captainLogin: (state, action) => {
            state.captainData = action.payload.user
            state.captainAuthStatus = true
        },
        captainLogout:(state,action) =>{
            state.captainData = null,
            state.captainAuthStatus = false
        }
    }
})

export const {captainLogin,captainLogout} = captainSlices.actions

export default captainSlices.reducer