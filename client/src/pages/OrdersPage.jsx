import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import BookedItem from "../components/BookedItem";

const OrdersPage = () => {
  const { user, ready } = useContext(UserContext);
  const [bookedData, setBookedData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          axios.defaults.headers.common.Authorization = `Bearer ${user?.token}`;
          const response = await axios.get("/booking/bookeditem");
          setBookedData(() => response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user]);
  return (
    <div>
      <div className="m-4 ">
      {
      
  bookedData.length > 0 ? (
    <>
    <div>
      <h1 className="font-bold tracking-wider text-2xl text-center mt-10 mb-10" >Your Past Orders</h1>
    </div>
    
    <div className="mt-4 ml-32 mr-32 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {bookedData.map((data, index) => {
        return (
         <BookedItem props={data} key={index}/>
        );
      })}
      </div>

    </>
  ) : (
    <div className="flex mt-8 justify-center ">
      <div className="w-64 h-24 bg-red-400 flex justify-center items-center font-semibold">
        No Booked Items Found
      </div>
    </div>
  )
}
      </div>
    </div>
  );
};

export default OrdersPage;
