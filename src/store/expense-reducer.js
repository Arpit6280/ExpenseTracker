import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState={expenses:[]}

console.log(initialExpenseState.expenses);
const expenseSlice=createSlice({
    name:'expense',
    initialState:initialExpenseState,
    reducers:{
        addExpenses(state,action){
        state.expenses=action.payload
        },

    }
})

export const expenseAction=expenseSlice.actions

export default expenseSlice.reducer

// export const expenseAction=expenseSlice.actions
// description: description,
// date: date,
// price: price,
// category: category,