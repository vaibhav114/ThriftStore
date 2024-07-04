import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

function HomeCarousel() {
  return (
    <div>
      <Carousel  className=" absolute top-0 left-0 w-full h-screen overflow-hidden z-[-100]">
        <Carousel.Item>
          <img
            className="d-block w-100 h-[700px] object-cover"
            src="./desk1.png"
            alt="First slide"
          />
          <Carousel.Caption>
            <div className="">
              <Link className="cursor-pointer bg-green-400 text-lg font-bold tracking-wider pt-3 pb-3 pl-8 pr-8 rounded-xl">SHOP NOW</Link>
              <div className="text-black ">
                <h3 className="text-xl tracking-wider  text-[40px] mt-20">
                   New Arrivals
                </h3>
                <h1 className="text-[80px] font-semibold mt-4 mb-28">Upgrade You Closet</h1>
              </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 h-[700px] object-cover"
            src="./desk2.png"
            alt="Second slide"
          />
          <Carousel.Caption>
          <div className="">
              <Link className="cursor-pointer bg-green-400 text-lg font-bold tracking-wider pt-3 pb-3 pl-8 pr-8 rounded-xl">SHOP NOW</Link>
              <div className="text-black ">
                <h3 className="text-xl tracking-wider  text-[40px] mt-16">
                  SALE ON 
                </h3>
                <h1 className="text-[80px] font-semibold mt-4 mb-28">Modern Designs</h1>
              </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img  
            className="d-block w-100 h-[700px] object-cover"
            src="./desk3.png"
            alt="Third slide"
          />
          <Carousel.Caption>
          <div className="">
              <Link className="cursor-pointer bg-green-400 text-lg font-bold tracking-wider pt-3 pb-3 pl-8 pr-8 rounded-xl">SHOP NOW</Link>
              <div className="text-black ">
                <h3 className="text-xl tracking-wider  text-[40px] mt-16">
                  New Men Collection
                </h3>
                <h1 className="text-[80px] font-semibold mt-4 mb-28">Unique Designs</h1>
              </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default HomeCarousel;
