import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { deleteCartItem } from "../feature/cart/cartSlice";
import { UserContext } from "../context/UserContext";

const SingleCartItem = ({ props }) => {
  const dispatch = useDispatch();
  const { user } = useContext(UserContext);
  console.log("SCartProps" ,props);
  console.log(props.itemid._id)
  const id  =props.itemid._id
  return (
    <div className=" ">
      <div>
        <div className="flex justify-around mr-44">
          <div>
            {props.itemid.photos && (
              <div
                className="min-h-[270px] max-h-[270px] flex max-w-80  justify-center mb-8"
                key={props.itemid}
              >
                <img
                  className="w-full object-cover"
                  alt="img not found"
                  src={"http://localhost:5000/" + props.itemid.photos[0]}
                />
              </div>
            )}
          </div>

          <div className="">
            <div>
              <h1 className="text-4xl tracking-widest font-bold mb-4 ml-10">
                {props.itemid.iname}
              </h1>
              <h1 className="text-xl tracking-widest font-semibold mb-4 ml-10">
                Cateogry : {props.itemid.icategory}
              </h1>
            </div>

            <div className=" flex ">
              <h1 className="text-xl tracking-widest font-semibold mb-4 ml-10">
                Size : {props.itemid.isize}
              </h1>
              <h1 className="text-xl tracking-widest font-semibold mb-4 ml-10">
                Type :{props.itemid.imaterial}
              </h1>
            </div>

            <div className=" flex ">
              <h1 className="text-xl tracking-widest font-semibold mb-4 ml-10">
                Gender : {props.itemid.gender}
              </h1>
              <h1 className="text-lg tracking-widest font-semibold mb-4 ml-10">
                Condition :{props.itemid.icondition}
              </h1>
            </div>

            <div>
              <h1 className="text-xl tracking-widest font-semibold mb-4 ml-10">
                Price : {props.itemid.imrp}
              </h1>
            </div>
          </div>

          <div>
            <h1 className="text-2xl tracking-widest font-bold mb-4 ">
              Price :{props.itemid.imrp}
            </h1>
          </div>

          <div>
            <button
              onClick={() =>
                dispatch(
                  deleteCartItem({
                    payload: { itemid: props.itemid_id },
                    token: user?.token,
                  })
                )
              }
              className="border bg-green-400 pl-4 pr-4 pt-2 pb-2"
            >
              REMOVE ITEM{" "}
            </button>
          </div>
        </div>

      


      </div>
    </div>
  );
};

export default SingleCartItem;
