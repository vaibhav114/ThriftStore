import React, { useContext, useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2'
import { useDispatch } from "react-redux";
import {addCartItems, addToCart} from '../feature/cart/cartSlice'
const OneItemList = () => {
  const queryClient = useQueryClient()
  let { id } = useParams();
  const dispatch = useDispatch()
  const { user, ready } = useContext(UserContext);
  const [itemData, setItemData] = useState({});
  const [mail,setMail]=useState({})
  const [bmail,setBmail] =useState({})
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          axios.defaults.headers.common.Authorization = `Bearer ${user?.token}`;
          const response = await axios.get(`/items/getbyid/${id}`);
          setItemData(...response.data);
          let ownerId =response.data[0].owner
          const userMail = await axios.get(`/booking/getmail/${ownerId}`)
          setMail(...userMail.data)
          const buyerMail = await axios.get(`/booking/getbuyermail/${user.userId}`)
          console.log(buyerMail)
          setBmail(...buyerMail.data)
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [user]);

  if (ready && !user) {
    return <Navigate to={"/register"} />;
  }

  const addToCart = async()=>{
    const cart = localStorage.getItem('cart')
    console.log('cart add ' ,cart)
    if(cart==="undefined" || cart===null)
    {
      dispatch(addCartItems({ 
        payload:{
          buyer: user.userId,
          bmail:bmail.email,
          owner: itemData.owner,
          mail:mail.email,
          products:{
            itemid: itemData._id,
            iprice:itemData.imrp
          }
        },
        token:user?.token
    }))
  }
    else
    {
      const cart = JSON.parse(localStorage.getItem('cart'))
    if(cart.owner!=itemData.owner)
    {
      alert("Settle the current owner transaction")
    }else if(cart.products.find((itm)=>itm.itemid == itemData._id ))
    {
      alert("Item already added to cart")
    }
    else
    {
      dispatch(addCartItems({ 
        payload:{
          buyer: user.userId,
          bmail:bmail.email,
          owner: itemData.owner,
          mail:mail.email,
          products:{
            itemid: itemData._id,
            iprice:itemData.imrp
          }
        },
        token:user?.token
    }))
    }
  }
  }

  const bookItem = async () => {
    // if (user && itemData) {
    //   console.log(mail)
      addToCart()
      navigate('/cart')
      // try {
      //   const response = await axios.post("/booking/item", {
      //     owner: itemData.owner,
      //     itemid: itemData._id,
      //     buyer: user.userId,
      //     mail:mail.email,
      //     bmail:bmail.email
      //   });
      //   if (response.status === 200) {
      //     await axios.patch("/items/sold", {
      //       itemid: itemData._id,
      //       sold: true,
      //     });
      //     Swal.fire({
      //       title: "Confirmed",
      //       text: "Booking Successfull",
      //       icon: "success"
      //     });
      //     queryClient.invalidateQueries(['item'])
      //     navigate("/shop");
      //   }
      // } catch (error) {
      //   if (error.response && error.response.data) {
      //     console.log(error.response.data);
      //   } else {
      //     console.log(error.message);
      //   }
      // }
    // }
  };

  return (
    <div>
<div className="ml-16 mr-16">

      <div className="flex gap-4 mt-10 ">
        <div className="grow max-w-[900px]">
        <div className="grid grid-cols-2 sm:grid-cols-2 bg-gray-300">
          {itemData.photos?.map((pic, index) => (
              <div className=" flex  gap-2 justify-center" key={index}>
              <img
                className=" w-full object-cover"
                alt="img not found"
                src={"http://localhost:5000/" + pic}
                />
            </div>
          ))}
          </div>
        </div>

        <div className="grow border">
          <div className="sticky top-0 p-6 pl-8  ml-8 mt-20">
            <div className="text-lg font-bold tracking-wider">{itemData.iname}</div>
            <h4 className="text-md text-gray-500">MRP inclusive of all taxes</h4>
            <div className="mt-2 text-lg font-bold tracking-widest">Rs.{itemData.imrp}</div>
            <div className="text-lg tracking-wider mt-2 flex   justify-between">
                <div>
                {itemData.itype}
                </div>
                <div>
                SIZE: {itemData.isize}
                </div>
            </div>
            <div>
            <button className='cursor-pointer px-6 py-3 w-full mt-14 bg-green-500' onClick={bookItem}>Buy Now</button>
            </div>
            <div className="flex justify-between">

            <div className="flex gap-3 mt-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
</svg>
<h3>
    Not availabel in stores
</h3>
            </div>
          
          <div className="flex gap-3 mt-6 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
</svg>
            <button onClick={addToCart}>Add To Cart</button>
          </div>
          
          </div>

            <div className="mt-5 font-semibold tracking-wider">
                <h3 className="text-lg mb-4 mt-8 font-bold">Description & Fit</h3>
                <div className="flex flex-col gap-3">
                    {
                        itemData.icategory ==="lower" && (
                            <>
                            <div>
                                <h3>Waist : {itemData.prop1}</h3>
                            </div>
                            <div>
                                <h3>Hip : {itemData.prop2}</h3>
                            </div>
                            <div>
                                <h3>Rise : {itemData.prop3}</h3>
                            </div>
                            <div>
                                <h3>Length : {itemData.prop4}</h3>
                            </div>
                            <div>
                                <h3>Thigh Round : {itemData.prop5}</h3>
                            </div>
                            
                            </>
                        )
                    }

                    {
                        itemData.icategory ==="upper" && (
                            <>
                            <div>
                                <h3>Shoulder : {itemData.prop1}</h3>
                            </div>
                            <div>
                                <h3>Sleeve Length : {itemData.prop2}</h3>
                            </div>
                            <div>
                                <h3>Chest : {itemData.prop3}</h3>
                            </div>
                            <div>
                                <h3>Waist : {itemData.prop4}</h3>
                            </div>
                            <div>
                                <h3>Length : {itemData.prop5}</h3>
                            </div>
                            
                            </>
                        )
                    }
                </div>
            </div>

          </div>
        </div>
      </div>

      <div className="mt-8 mb-64">
        <h3 className="text-2xl font-bold tracking-wider">Others also Bought</h3>
      </div>
      
          </div>
    </div>
  );
};

export default OneItemList;
