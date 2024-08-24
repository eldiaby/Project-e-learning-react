import { createSlice } from "@reduxjs/toolkit";
import EN from "../../Lang/En";
import AR from "../../Lang/AR";

 

const translation ={
    en:EN,
    ar:AR
}

const INITAL_STATE ={
    language:"en",
    translation:translation['en']
}





const langSlice= createSlice({
    name:"language",
    initialState:INITAL_STATE,
    reducers:{
        setLang(state,action){
            state.language = action.payload;
            state.translation=translation[action.payload]
        }
    }
})

export const {setLang} = langSlice.actions;

export default langSlice.reducer;
