import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";
import Star from "../assets/svg/star.svg";
import Cycle from "../assets/images/cycle.avif"

const RestrauntMenu = () => {
  const [resInfo, setResinfo] = useState(null);
  const { resId } = useParams();
  console.log(resId);
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(MENU_API + resId);
    const json = await data.json();
    setResinfo(json.data);
    console.log(resInfo);
    console.log("hey");
  };
  if (resInfo === null) {
    return <Shimmer />;
  }
  console.log(resInfo);
  const {
    name,
    costForTwoMessage,
    cuisines,
    avgRating,
    totalRatingsString,
    areaName,
  } = resInfo?.cards[0]?.card?.card?.info;
  const { itemCards, title } =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;
  console.log(itemCards, "itemCard");
  const { lastMileTravelString } = resInfo?.cards[0]?.card?.card?.info?.sla;
  console.log(lastMileTravelString);
  const {message} = resInfo?.cards[0]?.card?.card?.info?.feeDetails;
  return (
    <div className="menu">
      <div className="menu-heading-container">
        <div className="restraunt-name">
          <p className="restraunt-menu-name">{name}</p>
          <p className="restraunt-menu-cuisines">{cuisines.join(",")}</p>
          <div className="restraunt-address-wrapper">
            <p className="restraunt-areaname">{areaName }{","}</p>
            <p className="restraunt-lastMileTravel">{ lastMileTravelString}</p>
        </div>
        </div>

        <button className="rating-card">
          <span className="restraunt-rating-wrapper">
            {" "}
            <span className="menu-rating-icon">
              <img src={Star} />
            </span>
            <span>{avgRating}</span>
          </span>
          <span className="restraunt-total-ratings">{totalRatingsString}</span>
        </button>
      
      </div>
      <ul>
        <li className="delivery-distance">
            <img src={Cycle}></img>
            <p className="delivery-fee-apply">{message}</p>
        </li>
      </ul>
      <hr className="restraunt-header-separator"></hr>
      <h3>{costForTwoMessage}</h3>

      <h3>{title}</h3>
      <ul>
        {itemCards?.map((res) => (
          <li key={res?.card?.info?.id}>
            {res?.card?.info?.name} - {"Rs."}{" "}
            {res?.card?.info?.price / 100 ||
              res?.card?.info?.defaultPrice / 100}{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default RestrauntMenu;
