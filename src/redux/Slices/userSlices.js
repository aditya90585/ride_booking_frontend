import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null,
    authStatus:null
}

const userSlices = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.userData = action.payload
            state.authStatus = true
        },
        logout:(state,action) =>{
            state.userData = null,
            state.authStatus = false
        }
    }
})

export const {login,logout} = userSlices.actions

export default userSlices.reducer