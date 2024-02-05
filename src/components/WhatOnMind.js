import { useState } from "react";
import { COROUSEL_IMG_ID } from "../utils/constants";

const WhatOnMind = ({ whatsOnYourMind }) => {
  console.log(whatsOnYourMind, "compo");
  
  const { title } = whatsOnYourMind[0]?.card?.card?.header;
  const { info } = whatsOnYourMind[0]?.card?.card?.imageGridCards;
  console.log(info, "infora");
  const [current,setCurrent] =useState(0)

  function prevSlide(){
    if(current===0){
        setCurrent(info.length-1-7)

    }else{
        setCurrent(current-1)

    }
  }
  function nextSlide(){
    console.log("clicked")
    if(current>=info.length-1-7){
        setCurrent(0)

    }
    else{
        setCurrent(current+1 )
    }
  }
  console.log(current,"current")
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-bold text-xs md:text-xl">{title}</h1>
        <div>
          <button className="px-2 hover:bg-sky-100 " onClick={prevSlide}>⬅</button>
          <button className="px-2 hover:bg-slate-100 " onClick={nextSlide}>➡</button>
        </div>
      </div>

      <div className="flex w-[1500px] md:w-[2700px] transition ease-out duration-40" style={{transform: `translateX(-${current*5}%)`}}>
        {info?.map((res,index) => (
          <div key={res.id}>
            {/* {console.log(COROUSEL_IMG_ID, "inside")} */}
            <img className="px-2 w-[500px]" src={COROUSEL_IMG_ID + res.imageId} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default WhatOnMind;
