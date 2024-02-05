import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

let persistConfig={
    key:'root',
     storage
}
const rootReducer = combineReducers({
    cart: cartReducer,

})
let persistedReducer = persistReducer(persistConfig,rootReducer)

const appStore = configureStore({  // here we need to add our slice into the store
    // reducer: {  // this reducer is combination of different small store // big reducer  so reducer
    //     cart: cartReducer,
    // }
    reducer: persistedReducer,
    middleware: (gDM) =>
    gDM({
      serializableCheck: false,
    }),

})


export default appStore;