import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { Clothes } from "../components/Clothes";
import { SoldItems } from "./SoldItems";

export const UsersListing = () => {
  const [clothes, setClothes] = useState([]);
  const [soldClothes, setSoldClothes] = useState([]);
  const [unsoldClothes, setUnsoldClothes] = useState([]);
  const [displaySold, setDisplaySold] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      axios.defaults.headers.common.Authorization = `Bearer ${user.token}`;
      axios.get("/items/get").then((data) => {
        const ogData = data.data.item;
        setSoldClothes(() => ogData.filter((item) => item.sold === true));
        setUnsoldClothes(() => ogData.filter((item) => item.sold === false));
        setClothes(data.data.item);
      });
    }
  }, [user]);
  const toggleSold = () => {
    setDisplaySold((prevValue) => {
      return !prevValue;
    });
  };

  function linkClasses(type=null){
    let classes ="p-2 m-4 pl-6 pr-6 "
    if(type===displaySold)
    {
      classes +=" bg-green-400"
    }

    return classes
  }

  return (
    <div>
      <div>
      <button onClick={toggleSold} className={linkClasses(true)}>
          {"SOLD"}
        </button>
        <button onClick={toggleSold} className={linkClasses(false)}>
          {"UNSOLD"}
        </button>
      </div>
      <div>
      {clothes.length > 0 ? (
  <>
    {displaySold ? (
      soldClothes.length > 0 ? (
        <>
          <h1 className="text-center text-2xl tracking-widest">Items Sold</h1> 
          <div className="mt-4 ml-16 mr-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {soldClothes.map((data) => (
            <div className="m-8" key={data._id}>
              <SoldItems props={data} />
            </div>
          ))}
          </div>
        </>
      ) : (
        <div className="flex mt-8 justify-center">
          <div className="w-64 h-24 bg-red-400 flex justify-center items-center font-semibold">
            No Sold Items Found
          </div>
        </div>
      )
    ) : (
      unsoldClothes.length > 0 ? (
        <>
          <h1 className="text-center text-2xl tracking-widest " > Items Unsold</h1>
          <div  className="mt-8  ml-16 mr-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {unsoldClothes.map((data) => (
              <Clothes props={data} key={data._id}/>
          ))}
          </div>
        </>
      ) : (
        <div className="flex mt-8 justify-center">
          <div className="w-64 h-24 bg-red-400 flex justify-center items-center font-semibold">
            No Unsold Items Found
          </div>
        </div>
      )
    )}
  </>
) : (
  <div className="flex mt-8 justify-center">
    <div className="w-64 h-24 bg-red-400 flex justify-center items-center font-semibold">
      You Have Zero Listings
    </div>
  </div>
)}

      </div>
    </div>
  );
};
