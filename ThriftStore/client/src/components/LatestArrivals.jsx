import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import InitialListing from "./InitialListing"
import axios from "axios"

const LatestArrivals =()=>{
    const [litems,setLitems] = useState([])
    const {user}= useContext(UserContext)
    useEffect(()=>{
        if (user) {
            const fetchData = async () => {
              try {
                axios.defaults.headers.common.Authorization = `Bearer ${user?.token}`;
                const response = await axios.get("items/getlatest");
                setLitems(response.data);
              } catch (error) {
                console.log(error);
              }
            };
            fetchData();
          }
    },[user])
    return <div>
        <div className="mt-10 ml-32 mr-32 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-32">
            {
                litems.map((item,index)=>{
                    return <InitialListing props={item} key={index} />
                })
            }
        </div>
    </div>
}

export default LatestArrivals