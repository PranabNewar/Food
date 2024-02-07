import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name:"search",
    initialState:{
    },
    reducers:{
        setSearch:(action,state)=>{

            state.push(action.payload)
        },
        getSearch:(action,state)=>{
            
        }
    }
})