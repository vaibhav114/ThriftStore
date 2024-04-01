import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

export const Clothes = ({ props }) => {
  console.log(props._id);
  const itemDelete = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(`/items/delete/${id}`);
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-96 border mb-10 mt-4">
      <div className="  ">
        <div>
          <Link
            to={"/account/items/single/" + props._id}
            className="cursor-pointer "
          >
            <div className="">
              {props.photos && (
                <div
                  className="min-h-[470px] max-h-[470px] flex max-w-86  justify-center"
                  key={props._id} 
                >
                  <img
                    className="w-full object-cover "
                    alt="img not found"
                    src={"http://localhost:5000/" + props.photos[0]}
                  />
                </div>
              )}
            </div>
          </Link>
        </div>
      </div>
      
      <div className="flex justify-between ml-6 mr-6 mt-3"> 
        <h1 className="tracking-wider text-xl font-bold">
          {props.iname}
        </h1>
        <div className="">
          <button
            onClick={() => {
              itemDelete(props._id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex  gap-4 ml-6 mr-6 mb-4 mt-1 text-lg" >
        <h2>{props.imrp}</h2>
        <h3>{props.isize}</h3>
      </div>
    </div>
  );
};
