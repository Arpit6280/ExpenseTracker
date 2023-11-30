import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth-reducer";
import expenseReducer from "./expense-reducer";

const store=configureStore({
    reducer:{expense:expenseReducer, auth:authReducer}
})

export default store