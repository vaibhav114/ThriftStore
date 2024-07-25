import React from "react";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";

const SingleBookedItem = ({}) => {
  const location = useLocation();
  const singleCart = location.state;
  console.log(singleCart);
  return (
    <div className="mt-24 ml-24">
      <div>
     
        <div className="mt-10 mb-16">
          <h1 className="text-2xl tracking-wider font-bold mb-4"> PRODCUTS </h1>
          <h2 className="text-xl tracking-wider font-bold mb-4"> Bought From : {singleCart.mail}</h2>
        </div>
        <div>
          {singleCart.products.map((itm) => {
            return (
              <div>
                <div className="flex justify-around mr-44">
                  <div>
                    {itm.itemid.photos && (
                      <div
                        className="min-h-[270px] max-h-[270px] flex max-w-80  justify-center mb-8"
                        key={itm.itemid}
                      >
                        <img
                          className="w-full object-cover"
                          alt="img not found"
                          src={"http://localhost:5000/" + itm.itemid.photos[0]}
                        />
                      </div>
                    )}
                  </div>

                  <div className="">
                    <div>
                        <h1 className="text-4xl tracking-widest font-bold mb-4 ml-10">{itm.itemid.iname}</h1>
                        <h1 className="text-xl tracking-widest font-semibold mb-4 ml-10">Cateogry : {itm.itemid.icategory}</h1>
                    </div>

                    <div className=" flex ">
                        <h1 className="text-xl tracking-widest font-semibold mb-4 ml-10">Size : {itm.itemid.isize}</h1>
                        <h1 className="text-xl tracking-widest font-semibold mb-4 ml-10">Type :{itm.itemid.imaterial}</h1>
                    </div>

                    <div className=" flex ">
                        <h1 className="text-xl tracking-widest font-semibold mb-4 ml-10">Gender : {itm.itemid.gender}</h1>
                        <h1 className="text-xl tracking-widest font-semibold mb-4 ml-10">Condition :{itm.itemid.icondition}</h1>
                    </div>
                        
                    <div>
                    <h1 className="text-xl tracking-widest font-semibold mb-4 ml-10">Price : {itm.itemid.imrp}</h1>
                    </div>
                  
                  </div>

                  <div>
                    <h1 className="text-2xl tracking-widest font-bold mb-4 ">Price :{itm.itemid.imrp}</h1>
                  </div>

                </div>
              </div>
            );
          })}

        </div>

        <div className="mt-4 ml-20 mr-52 float-right ">
        <h1 className="text-2xl tracking-wider font-bold mb-4">
            Quantity : {singleCart.amount}
          </h1>
          <h1 className="text-2xl tracking-wider font-bold mb-32">
            Total : {singleCart.total}{" "}
          </h1>
        </div>

      </div>
    </div>
  );
};

export default SingleBookedItem;
