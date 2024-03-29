import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { CDN_URL } from "../../utils/constants";
import SearchRestrauntCard from "./SearchRestrauntCard";
import MenuCard from "../MenuCard";
import SearchDishCard from "./SearchDishCard";

const SearchRestraunt = ({ searchedData }) => {
  console.log(
    "🚀 ~ file: SearchRestraunt.js:9 ~ SearchRestraunt ~ searchedData:",
    searchedData
  );
  //console.log(searchedData, "searchedData in prorp");

  const dishes =
    searchedData?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards.filter(
      (res) => {
        return (
          res.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.Dish"
        );
      }
    );
  console.log(
    "🚀 ~ file: SearchRestraunt.js:16 ~ SearchRestraunt ~ dishes:",
    dishes
  );

  //console.log(dishes, "dishesesd");
  //  const rest= searchedData?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards.filter(
  //     (res) => {
  //       return (
  //         res.card?.card?.["@type"] ===
  //        "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"

  //       );
  //     }
  //   );
  // //console.log(rest,"resttttt")
  //   const { info } =
  const restraunt =
    searchedData?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards[0]
      ?.card?.card.info;
  //console.log(restraunt, "info in prop");
  console.log(
    "🚀 ~ file: SearchRestraunt.js:37 ~ SearchRestraunt ~ restraunt:",
    restraunt
  );

  return (
    <div>
      {dishes ? (
        <div>
          <SearchDishCard dish={dishes} />
        </div>
      ) : (
        <SearchRestrauntCard data={restraunt} />
      )}
    </div>
  );
};
export default SearchRestraunt;
