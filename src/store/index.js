//---   IMPORTS
import { configureStore } from "@reduxjs/toolkit";
import { ProductReducer } from './products'

//---   STORE
const Store = configureStore({
    reducer: {
        ProductReducer
    }
})
export default Store 