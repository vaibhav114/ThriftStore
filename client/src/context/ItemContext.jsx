import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { UserContext } from "./UserContext";
import { useDispatch } from 'react-redux'
import { setInitalItems } from "../feature/item/itemSlice";

export const ItemContext = createContext();

export  function ItemContextProvider({children}) {
    const dispatch = useDispatch();
    const {user} = useContext(UserContext)
    const [userLoaded, setUserLoaded] = useState(false)
    useEffect(()=>{
        if(user)
        {
            setUserLoaded(true);
        }
    },[user])

    const {data,isSuccess} = useQuery({
        queryKey:['item'],
        staleTime:1000,
        queryFn:async ()=> {
            try {
                axios.defaults.headers.common.Authorization = `Bearer ${user?.token}`
                const {data} = await  axios.get('items/getallitems')
                return data
            } catch (error) {
                console.log(error)
            }
        },
        enabled:userLoaded
    })
    useEffect(()=>{
        if(data)
        {
            dispatch(setInitalItems(data))
        }
    },[data])

    return <ItemContext.Provider value={{data}}>
        {children}
    </ItemContext.Provider>
}


