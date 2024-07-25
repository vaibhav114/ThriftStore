import React from "react";
import { Link } from "react-router-dom";
import SingleBookedItem from "./SingleBookedItem";
import { format } from "date-fns";

const BookedItem = ({ props }) => {
  const formattedDate = format(new Date(props.updatedAt), "yyyy-MM-dd")
  const oneProduct =  props.products[0].itemid;
  return (
    <Link to={`/account/order/pastorder/${props._id}`} state={props}>
    <div className="max-w-96 border mb-10 mt-4">
    <div>
      <div>
        {oneProduct.photos && (
          <div
            className="min-h-[470px] max-h-[470px] flex max-w-86  justify-center"
            key={props._id}
          >
            <img
              className="w-full object-cover"
              alt="img not found"
              src={"http://localhost:5000/" + oneProduct.photos[0]}
            />
          </div>
        )}
      </div>
      <div className="flex justify-between ml-6 mr-6 mt-3 text-lg">
        <h1 className="tracking-wider  font-bold">Total :{props.total}</h1>
      </div>
      <div className="flex  gap-4 ml-6 mr-6  mt-1 text-lg" >
      <h2>Quantity : {props.amount} Items</h2>
    </div>
      <h3 className="ml-6 mb-4">Bought On : {formattedDate}</h3>
    </div>
  </div>    
  </Link>   
  );
};

export default BookedItem;
