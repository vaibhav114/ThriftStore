import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleCartItem from "../components/SingleCartItem";
import { bookItem, clearCart, getCartItems } from "../feature/cart/cartSlice";
import { UserContext } from "../context/UserContext";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();


  const placeOrder = async () => {
    const resultAction = await dispatch(bookItem({ token: user?.token }));
    if (resultAction.meta.requestStatus === "fulfilled") {
      queryClient.invalidateQueries(["item"]);
      navigate("/shop");
    } else {
      console.error("Failed to book item", resultAction.error);
    }
  };

  useEffect(()=>{
    if(user && user.userId && user.token)
    {
      dispatch(getCartItems({userId:user?.userId , token :user?.token}))
    }
  },[user])
  return (
    <div>
      {cart.products.length>0 ?
      <div className="ml-36  mt-20">
        <h1 className="text-2xl tracking-wider font-bold mb-8">
          Product Owner : {cart.mail}
        </h1>
        <div>
          {cart.products.map((itm) => {
            return <SingleCartItem key={itm.itemid} props={itm} />;
          })}
        </div>

        <div className="ml-20 mr-52 float-right ">
          <h1 className="text-2xl tracking-wider font-bold mb-4">
            Quantity : {cart.amount}
          </h1>
          <h1 className="text-2xl tracking-wider font-bold mb-32">
            Total : {cart.total}
          </h1>
        </div>

        <div className="mt-24">

          <div>
            <button
              onClick={() =>
                dispatch(clearCart({ payload: cart.buyer, token: user?.token }))
              }

              className="bg-green-400 border  pl-6 pr-6 pt-3 pb-3"
            >
              CLEAR CART
            </button>
          </div>

          <div className="mt-5 mb-20">
            <button
              className="pl-12 pr-12 pt-4 pb-4 cursor-pointer  border bg-green-400"
              onClick={placeOrder}
            >
              {" "}
              PLACE ORDER
            </button>
          </div>

        </div>


      </div>
:(
  <div className="flex mt-40 justify-center">
          <div className="w-64 h-24 bg-red-400 flex justify-center items-center font-semibold">
            CART EMPTY
          </div>
        </div>
)}
    </div>
  );
};

export default CartPage;
