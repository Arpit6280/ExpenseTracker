import {  createSlice } from "@reduxjs/toolkit";

let tok=localStorage.getItem('token')
const initialAuthState={token:tok,isLoggedIn:false}

// localStorage.setItem("token", token);
// setToken(token)
const authSlice=createSlice({
    name:'authentication',
    initialState:initialAuthState,
    reducers:{
        login(state,action){
           localStorage.setItem('token',action.payload)
           state.token=action.payload
           state.isLoggedIn=true
        },
        logout(state){
           localStorage.removeItem('token')
           state.token=''
           state.isLoggedIn=false
        }
    }
})




export const authActions=authSlice.actions
export default authSlice.reducer

// export default store