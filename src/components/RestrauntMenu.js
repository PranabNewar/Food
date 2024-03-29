import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import Star from "../assets/svg/star.svg";
import Cycle from "../assets/images/cycle.avif";
import useRestrauntMenu from "../utils/useRestrauntMenu";
import RestrauntCategory from "./RestrauntCategory";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addRestaurant } from "../utils/redux/cartSlice";

const RestrauntMenu = () => {
  const { resId } = useParams();
  const [showIndex, setShowIndex] = useState(null);
  const dispatch = useDispatch();
  // //console.log(resId);

  const resInfo = useRestrauntMenu(resId); //Custom hook
  console.log(
    "🚀 ~ file: RestrauntMenu.js:18 ~ RestrauntMenu ~ resInfo:",
    resInfo
  );
  useEffect(() => {
    setShowIndex(0);
  }, []);
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
  console.log(
    "🚀 ~ file: RestrauntMenu.js:31 ~ restrauntDetails ~ restrauntDetails:",
    restrauntDetails
  );
  console.log(restrauntDetails, "details");
  const {
    name,
    costForTwoMessage,
    cuisines,
    avgRating,
    totalRatingsString,
    areaName,
  } = restrauntDetails[0]?.card?.card?.info;

  // dispatch(addRestaurant(name));

  const { lastMileTravelString } = restrauntDetails[0]?.card?.card?.info?.sla;
  //console.log(lastMileTravelString);
  const { message } = restrauntDetails[0]?.card?.card?.info?.feeDetails;

  const groupCard = resInfo?.cards.filter(
    //cards[2].groupedCard.cardGroupMap.REGULAR.cards
    (res) => {
      //  //console.log(res)
      return res === "groupedCard";
    }
  );
  // console.log(groupCard,"group card")

  const groupedcard = resInfo?.cards?.filter(
    (res) => res.groupedCard?.cardGroupMap?.REGULAR.cards
  );
  console.log(
    "🚀 ~ file: RestrauntMenu.js:65 ~ RestrauntMenu ~ groupedcard:",
    groupedcard[0]
  );

  const categories =
    groupedcard[0]?.groupedCard?.cardGroupMap?.REGULAR.cards.filter(
      //cards[2].groupedCard.cardGroupMap.REGULAR.cards
      (res) => {
        // cards[2].groupedCard.cardGroupMap.REGULAR.cards[1].card.card["@type"]
        //  //console.log(res)
        return (
          res.card?.["card"]?.["@type"] ===
          // "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory" ||
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        );
      }
    );
  console.log(
    "🚀 ~ file: RestrauntMenu.js:65 ~ RestrauntMenu ~ categories:",
    categories
  );

  console.log(categories, "res");
  return (
    <div className="lg:w-7/12 md:w-9/12 w-10/12 mx-auto ">
      <div className="flex justify-between pt-4">
        <div className="">
          <p className="font-bold md:text-md sm:text-sm text-xs lg:text-lg py-1">
            {name}
          </p>
          <p className="font-sm md:text-xs sm:text-[10px] text-[8px] lg:text-sm text-gray-500 py-0 lg:py-1">
            {cuisines.join(",")}
          </p>
          <div className="">
            <p className="inline-block font-sm md:text-xs sm:text-[10px] text-[8px] lg:text-sm text-gray-500 lg:py-1 py-0">
              {areaName}
              {","}
            </p>
            <p className="inline-block font-sm lg:text-sm md:text-xs text-[10px] text-gray-500 py-1">
              {lastMileTravelString}
            </p>
          </div>
        </div>

        <div className="border border-slate-200 relative lg:top-5 top-3 md:top-2 md:right-2  lg:right-4 rounded lg:w-[75px] lg:h-[70px] md:w-[60px]  w-[50px] h-[50px] ">
          <div className="lg:py-1 px-2">
            <span className=" inline-block">
              <img className=" lg:w-4 md:w-3  w-2 mr-1" src={Star} />
            </span>
            <span className="font-bold lg:text-sm md:text-xs text-[8px] text-green-600">
              {avgRating}
            </span>
          </div>
          <hr></hr>
          <span className="lg:text-[10px] md:text-[8px] text-[6px] text-gray-400 font-medium px-1">
            {totalRatingsString}
          </span>
        </div>
      </div>
      <ul className=" lg:mt-4 md:mt-2 mt-1">
        <li className="flex">
          <img className="lg:w-5 md:w-3 w-2" src={message && Cycle}></img>
          <p className="pl-2 font-sm text-gray-500 md:text-[8px] text-[6px] lg:text-sm">
            {message}
          </p>
        </li>
      </ul>
      <hr className=" border-dashed border-gray-400 md:my-2  lg:my-4"></hr>
      <h3 className="lg:text-base md:text-xs text-[10px]">
        {costForTwoMessage}
      </h3>
      {categories?.map((category, index) => {
        return (
          <RestrauntCategory
            key={category?.card?.card.title}
            category={category?.card?.card}
            showList={index === showIndex ? true : false}
            index={showIndex}
            setShowIndex={() => setShowIndex(index)}
            setHideIndex={() => setShowIndex(null)}
            restaurant={name}
          />
        );
      })}
      {/* {//console.log(showIndex, "Showindex ")} */}
    </div>
  );
};
export default RestrauntMenu;
