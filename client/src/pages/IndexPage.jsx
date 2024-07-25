import { useContext, useEffect, useState } from "react"
import axios from 'axios'
import InitialListing from "../components/InitialListing"
import { UserContext } from "../context/UserContext"
import { Navigate } from "react-router-dom"
import HomeCarousel from "../components/HomeCarousel"
import LatestArrivals from "../components/LatestArrivals"
import { useDispatch } from "react-redux"
import { getCartItems } from "../feature/cart/cartSlice"

const IndexPage =()=>{
    const [allItems ,setAllItems] = useState([])
    const {user ,ready} = useContext(UserContext)
    const dispatch = useDispatch();
    useEffect(()=>{
        if(user)
        {
            const fetchData =async()=>{
                try {
                    axios.defaults.headers.common.Authorization = `Bearer ${user?.token}`
                    const response = await axios.get('items/getallitems')
                    setAllItems(response.data)          
                    // dispatch(getCartItems({userId: user.userId}))
                    console.log(user)
                    
                } catch (error) {
                    console.log(error)
                }
            }
            fetchData()
        }
    },[user])
        
    if (ready && !user) {
        return <Navigate to={"/register"} />;
      }
      return <div>
        <div className="">
        <HomeCarousel />
        </div>

        <div className=" mt-[650px]">
            <div>
                <h1 className="flex justify-center text-4xl tracking-widest ">LATEST ARRIVALS</h1>
                <div>
                  <LatestArrivals />
                </div>
            </div>
        </div>


            
    </div>
}

export default IndexPage