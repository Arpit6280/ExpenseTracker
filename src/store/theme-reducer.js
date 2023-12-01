import { createSlice } from "@reduxjs/toolkit";

const initialThemeState={color:'', backgroundColor:'',themes:true }

const themeSlice= createSlice({
    name:'theme',
    initialState:initialThemeState,
    reducers:{
        darkTheme(state){
            state.color='white'
            state.backgroundColor='black'
            state.themes=false
        },
        lightTheme(state){
            state.color='black'
            state.backgroundColor='white'
            state.themes=true
        }
    }
})

export const themeActions=themeSlice.actions
export default themeSlice.reducer