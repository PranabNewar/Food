import { useContext } from "react";
import { CDN_URL } from "../utils/constants";
import UserContext from "../utils/UserContext";

const RestraurantCard = (props) => {
  const { resData } = props;
  const { logggdInUser } = useContext(UserContext);
  // const {name,cuisines,avgRating, cloudinaryImageId} = resData.data
  // //console.log(resData.info.name) text-[10px] md:text-sm
  return (
    <div className="p-2 m-2 w-[144px] cursor-pointer lg:w-[224px] sm:w-[133px]  md:w-[151px] whitespace-normal bg-neutral-50 hover:bg-neutral-100 lg:min-h-[290px] lg:max-h-[290px]  md:min-h-[180px] md:max-h-[180px]  rounded-lg">
      <img
        className="rounded-lg"
        alt="res-logo"
        src={CDN_URL + resData.info.cloudinaryImageId}
      ></img>
      <h3 className="font-semibold truncate  py-1 text-[10px] md:text-[12px] lg:text-[15px]">
        {resData.info.name}
      </h3>
      <h4 className=" truncate text-[9px] lg:text-[14px] md:text-[11px]">
        {resData.info.cuisines.join(",")}
      </h4>
      <h4 className="text-[9px] lg:text-[14px] sm:text-[10px] md:text-[11px] pb-2">
        {resData.info.avgRating}stars
      </h4>
      {/* <h4>user: {logggdInUser}</h4> */}
    </div>
  );
};
export default RestraurantCard;
