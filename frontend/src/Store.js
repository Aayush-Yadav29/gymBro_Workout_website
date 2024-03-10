import {configureStore} from "@reduxjs/toolkit";
import { customReducer } from "./Reducers";
const store = configureStore({
    reducer:{
        addWeightReducer : customReducer
    },
});
export default store;