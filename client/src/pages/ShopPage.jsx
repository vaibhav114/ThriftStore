import { useContext, useEffect, useState } from "react";
import axios, { all } from "axios";
import InitialListing from "../components/InitialListing";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { ItemContext } from "../context/ItemContext";
import { useSelector  } from "react-redux";

const ShopPage = () => {
  // const [allItems, setAllItems] = useState([]);
  const { user, ready } = useContext(UserContext);
  const { clothes } = useSelector((store)=>store.item)
  const [genderOpt, setGenderOpt] = useState("all");
  // useEffect(() => {
  //   if (user) {
  //     const fetchData = async () => {
  //       try {
  //         axios.defaults.headers.common.Authorization = `Bearer ${user?.token}`;
  //         const response = await axios.get("items/getallitems");
  //         setAllItems(response.data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     fetchData();
  //   }
  // }, [user]);


  if (ready && !user) {
    return <Navigate to={"/register"} />;
  }
  const handleGender = (value) => {
    setGenderOpt(value);
  };
  function linkClass(type = null) {
    let classes = "border border-black p-2 pl-5 pr-5 font-bold tracking-widest";
    if (type === genderOpt) {
      classes += " bg-green-400";
    }
    return classes;
  }
  return (
    <div>
      <div className="flex justify-center">
        <h1 className="text-4xl font-bold tracking-wider">SHOP </h1>
      </div>
      <div className="flex justify-center mt-8">
        <div className="flex justify-around w-96">
          <button
            className={linkClass("all")}
            onClick={() => {
              handleGender("all");
            }}
          >
            All
          </button>
          <button
            className={linkClass("male")}
            onClick={() => {
              handleGender("male");
            }}
          >
            Men
          </button>
          <button
            className={linkClass("female")}
            onClick={() => {
              handleGender("female");
            }}
          >
            Women
          </button>
        </div>
      </div>
      <div className="mt-10 ml-32 mr-32 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {genderOpt === "all" &&
          clothes?.map((item, index) => {
            return <InitialListing props={item} key={index} />;
          })}
        {genderOpt === "male" &&
          clothes
            ?.filter((data) => data.gender === "male")
            .map((item, index) => {
              return <InitialListing props={item} key={index} />;
            })}

        {genderOpt === "female" &&
          clothes
            ?.filter((data) => data.gender === "female")
            .map((item, index) => {
              return <InitialListing props={item} key={index} />;
            })}
      </div>
    </div>
  );
};

export default ShopPage;
