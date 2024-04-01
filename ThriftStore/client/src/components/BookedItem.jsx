import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const BookedItem = ({ props }) => {
  console.log(props);
  const formattedDate = format(new Date(props.updatedAt), "yyyy-MM-dd");
  return (
    <div className="max-w-96 border mb-10 mt-4">
      <div>
        <div>
          {props.itemid.photos && (
            <div
              className="min-h-[470px] max-h-[470px] flex max-w-86  justify-center"
              key={props._id}
            >
              <img
                className="w-full object-cover"
                alt="img not found"
                src={"http://localhost:5000/" + props.itemid.photos[0]}
              />
            </div>
          )}
        </div>
        <div className="flex justify-between ml-6 mr-6 mt-3 text-lg">
          <h1 className="tracking-wider  font-bold">{props.itemid.iname}</h1>
          <h2 className="text-lg ">{props.itemid.itype}</h2>
        </div>
        <div className="flex  gap-4 ml-6 mr-6  mt-1 text-lg" >
        <h2>${props.itemid.imrp}</h2>
        <h3>{props.itemid.isize}</h3>
      </div>
        <h3 className="ml-6 mb-4">Bought On : {formattedDate}</h3>
      </div>
    </div>
  );
};

export default BookedItem;
