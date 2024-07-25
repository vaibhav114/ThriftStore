import {createSlice} from '@reduxjs/toolkit'
import { useContext } from 'react'

const initialState ={
    clothes:[]
}
const itemSlice =createSlice({
    name:'item',
    initialState,
    reducers:{
        setInitalItems:(state,action)=>{
            state.clothes= action.payload
            }
        }
        
    }
)


export const {setInitalItems} = itemSlice.actions
export default itemSlice.reducer