import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
    name:'location',
    initialState:null,
    reducers:{
        addLocation:(state,action)=>{
            return action.payload;
        },
        addLocationDetails:(state,action)=>{
            return action.payload;
        }
    }
})