import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
const Store = configureStore({
    reducer:{
        user : authSlice,
    }

})

export default Store;