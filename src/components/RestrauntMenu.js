import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import Star from "../assets/svg/star.svg";
import Cycle from "../assets/images/cycle.avif";
import useRestrauntMenu from "../utils/useRestrauntMenu";
import RestrauntCategory from "./RestrauntCategory";
import { useState } from "react";

const RestrauntMenu = () => {
  const { resId } = useParams();
  const [showIndex,setShowIndex]= useState(null)


  
  // console.log(resId);

  const resInfo = useRestrauntMenu(resId); //Custom hook

  if (resInfo === null) {
    return <Shimmer />;
  }
  console.log(resInfo, "info ");
  const restrauntDetails = resInfo.cards.filter((res) => {
    return (
      res.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
    );
  });
  console.log(restrauntDetails, "details");
  const {
    name,
    costForTwoMessage,
    cuisines,
    avgRating,
    totalRatingsString,
    areaName,
  } = restrauntDetails[0]?.card?.card?.info;

  const { lastMileTravelString } = restrauntDetails[0]?.card?.card?.info?.sla;
  console.log(lastMileTravelString);
  const { message } = restrauntDetails[0]?.card?.card?.info?.feeDetails;
  const categories =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR.cards.filter(
      //cards[2].groupedCard.cardGroupMap.REGULAR.cards
      (res) => {
        //  console.log(res)
        return (
          res.card?.["card"]?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        );
      }
    );

  console.log(restrauntDetails[0]?.card?.card?.info, "res");
  return (
    <div className="w-7/12 mx-auto">
      <div className="flex justify-between pt-4">
        <div className="">
          <p className="font-bold text-lg py-1">{name}</p>
          <p className="font-sm text-sm text-gray-500 py-1">
            {cuisines.join(",")}
          </p>
          <div className="">
            <p className="inline-block font-sm text-sm text-gray-500 py-1">
              {areaName}
              {","}
            </p>
            <p className="inline-block font-sm text-sm text-gray-500 py-1">
              {lastMileTravelString}
            </p>
          </div>
        </div>

        <div className="border border-slate-200 relative top-5 right-4 rounded w-[75px] h-[70px]">
          <div className="py-1 px-2">
            <span className=" inline-block">
              <img className=" w-4 mr-1" src={Star} />
            </span>
            <span className="font-bold text-green-600">{avgRating}</span>
          </div>
          <hr></hr>
          <span className="text-[10px] text-gray-400 font-medium px-1">
            {totalRatingsString}
          </span>
        </div>
      </div>
      <ul className="mt-4">
        <li className="flex">
          <img className="w-5" src={message && Cycle}></img>
          <p className="pl-2 font-sm text-gray-500 text-sm">{message}</p>
        </li>
      </ul>
      <hr className=" border-dashed border-gray-400 my-4"></hr>
      <h3>{costForTwoMessage}</h3>
      {categories?.map((category,index) => {
        return (
          <RestrauntCategory
            key={category?.card?.card.title}
            category={category?.card?.card}
            showList={index===showIndex?true:false}
            setShowIndex = { () => setShowIndex(index)}
            setHideIndex = {()=>setShowIndex(null)}
          
          />
        );

      })}
      {console.log(showIndex,"Showindex ")}
    </div>
  );
};
export default RestrauntMenu;
