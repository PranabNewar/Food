import { useContext } from "react";
import { CDN_URL } from "../utils/constants";
import UserContext from "../utils/UserContext";
import StarRating from "../assets/svg/starRating.svg";

const RestraurantCard = (props) => {
  const { resData } = props;
  console.log(
    "🚀 ~ file: RestraurantCard.js:8 ~ RestraurantCard ~ resData:",
    resData
  );
  const { logggdInUser } = useContext(UserContext);
  // const {name,cuisines,avgRating, cloudinaryImageId} = resData.data
  // //console.log(resData.info.name) text-[10px] md:text-sm
  return (
    <div className="p-2 m-2 w-[144px] cursor-pointer lg:w-[224px] sm:w-[133px]  md:w-[151px] whitespace-normal bg-neutral-50 hover:bg-neutral-100 lg:min-h-[260px] lg:max-h-[260px]   md:min-h-[180px] md:max-h-[180px] sm:h-[190px] h-[170px]  relative  rounded-xl">
      <img
        className="rounded-xl  relative"
        alt="res-logo"
        src={CDN_URL + resData.info.cloudinaryImageId}
      ></img>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 lg:top-[76px]  sm:top-[60px] lg:w-[208px] w-[128px] h-6 left-2 top-[64px] sm:w-[136px] sm:left-2 lg:left-2  to-transparent opacity-85 rounded-lg  sm:h-8 lg:h-16"></div>
      <h2 className=" absolute lg:top-28 sm:top-[76px] text-[10px] left-3 top-[70px] sm:text-xs lg:text-lg font font-bold  text-white sm:left-3 lg:left-5 z-8">
        {resData?.info?.aggregatedDiscountInfoV3?.header}{" "}
        {resData?.info?.aggregatedDiscountInfoV3?.subHeader}
      </h2>
      <h3 className="font-semibold pl-2 lg:mt-2 m-0 truncate  lg:py-1 sm:text-[11px] text-[10px] md:text-[12px] lg:text-[15px]">
        {resData.info.name}
      </h3>
      <h4 className="text-[9px] font-semibold pl-2 inline-block lg:text-[14px] sm:text-[10px] md:text-[11px]  lg:pb-2">
        <img className="lg:w-4 sm:w-3 w-2 inline-block" src={StarRating}></img>{" "}
        {resData.info.avgRating}
      </h4>
      <span className="text-[9px]  font-semibold inline-block lg:text-[14px] sm:text-[10px] md:text-[11px] mx-2">
        {resData?.info?.sla?.slaString}
      </span>
      <h4 className=" truncate pl-2 text-[7px] sm:text-[7px] lg:text-[14px] md:text-[11px]">
        {resData.info.cuisines.join(",")}
      </h4>

      <h1 className="text-[8px]  lg:text-[14px] sm:text-[9px] md:text-[11px] mx-2">
        {resData?.info?.areaName}
      </h1>
      {/* <h4>user: {logggdInUser}</h4> */}
    </div>
  );
};
export default RestraurantCard;
