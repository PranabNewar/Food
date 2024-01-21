import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";
import Star from "../assets/svg/star.svg";
import Cycle from "../assets/images/cycle.avif";
import MenuCard from "./MenuCard";
import RestrauntMenuBtn from "./RestrauntMenuBtn";


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
//   console.log(itemCards, "itemCard");
  const { lastMileTravelString } = resInfo?.cards[0]?.card?.card?.info?.sla;
  console.log(lastMileTravelString);
  const { message } = resInfo?.cards[0]?.card?.card?.info?.feeDetails;
 const categories = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR.cards.filter((res)=>{
//  console.log(res)
    return res.card?.["card"]?.["@type"] === 
    "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
 })
 console.log(categories)
  const {cards} =resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR;
//   console.log(cards)
  return (
    <div className="menu">
      <div className="menu-heading-container">
        <div className="restraunt-name">
          <p className="restraunt-menu-name">{name}</p>
          <p className="restraunt-menu-cuisines">{cuisines.join(",")}</p>
          <div className="restraunt-address-wrapper">
            <p className="restraunt-areaname">
              {areaName}
              {","}
            </p>
            <p className="restraunt-lastMileTravel">{lastMileTravelString}</p>
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
      {categories?.map((category)=>{
      
   return <RestrauntMenuBtn category={category?.card?.card}  />

        // console.log(category.card.card.itemCards,"hey");

      })}
      {/* <div id="menu-card"> */}
            {/* <ul>
            {itemCards?.map((res) => (
                // <MenuCard items={res} key={res?.card?.info?.id} />
                //   <li key={res?.card?.info?.id}>
                //     {res?.card?.info?.name} - {"Rs."}{" "}
                //     {res?.card?.info?.price / 100 ||
                //       res?.card?.info?.defaultPrice / 100}{" "}
                //   </li>
            ))}
            </ul> */}
      {/* </div> */}
    </div>
  );
};
export default RestrauntMenu;
