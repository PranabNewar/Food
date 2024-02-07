import { Link } from "react-router-dom";
import { CDN_URL } from "../../utils/constants";

const SearchRestrauntCard = ({ data }) => {
  //console.log(data, "infoooooo");
  return (
    <div>
      <Link to={"/restraunts/" + data.id}>
        <div className="lg:w-6/12 md:w-8/12 w-[300px] bg-white flex items-center mt-6  rounded-xl shadow-lg p-2 ">
          {" "}
          <img
            src={CDN_URL + data.cloudinaryImageId}
            className="lg:w-36 md:w-28 w-16 rounded-lg"
          />
          <div className="ml-2">
            <h1 className="font-semibold lg:text-sm md:text-xs text-[10px] text-slate-600">
              {data.name}
            </h1>
            <div className="">
              <span className="text-[8px] lg:text-xs md:text-[10px] font-semibold text-slate-600 ">
                {data.avgRating} stars
              </span>
              <span className="text-[8px] lg:text-xs md:text-[10px] font-semibold text-slate-600 ml-2 ">
                {data.sla.slaString}{" "}
              </span>
            </div>
            <h1 className="text-[8px] lg:text-xs md:text-[10px]  text-slate-600">
              {data.cuisines.join(",")}{" "}
            </h1>
          </div>
        </div>
      </Link>
      <div>

        {}
      </div>
    </div>
  );
};
export default SearchRestrauntCard;
