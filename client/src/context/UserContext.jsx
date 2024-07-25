import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCartItems } from "../feature/cart/cartSlice";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready,setReady] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!user) {
      axios
        .get("/profile/getname")
        .then(({ data }) => {
          setUser(data);
          setReady(true)
          if(data)
          {

            axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
            dispatch(getCartItems({userId: data.userId }))
          }
        })  
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser ,ready }}>
      {children}
    </UserContext.Provider>
  );
}
