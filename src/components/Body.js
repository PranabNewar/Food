import RestraurantCard from "./RestraurantCard";
// import restrautList from "../utils/mockData";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnline";
const Body = () => {
  //Local State Variables - Super powerful variable
  const [restraunt, setRestraunt] = useState([]); //here it did array destruturing
  // const arr = useState(resList);
  // const [restraunt,setRestraunt] =arr; // these are he same thing
  const [filteredRestraunt, setFilteredRestraunt] = useState([]);
  const [searchText, setSearchText] = useState("");
  // whenever state variables update, react triggers a reconciliation cycle(RE - render component)
  console.log("body rendered");

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.16363&lng=91.7611838&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    console.log(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setRestraunt(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    // const card
    setFilteredRestraunt(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    console.log(json.data);
  }

  function handleSearchInput(e) {
    setSearchText(e.target.value);
    // console.log(searchText)
  }
  //conditional rendering
  // if(restraunt.length===0)
  // {
  //   return <Shimmer/>
  // }
  const onlineStatus = useOnlineStatus();
  if(!onlineStatus){
    return <h1>Looks your internet connection is lost</h1>
  }

  return restraunt?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="search">
        <input
          type="text"
          placeholder="Search"
          onChange={handleSearchInput}
        ></input>
        <button
          className="search-btn"
          onClick={() => {
            const filterData = restraunt.filter((res) => {
              return res.info.name
                .toLowerCase()
                .includes(searchText.toLowerCase());
            });
            setFilteredRestraunt(filterData);
            console.log(filterData, "fill");
          }}
        >
          Search
        </button>
        <button
          className="filter-btn"
          onClick={() => {
            let filterRes = restraunt.filter((res) => res.info.avgRating > 4);
            setFilteredRestraunt(filterRes);
            console.log("button clicked", filterRes);
          }}
        >
          Top rated restraunts
        </button>
      </div>
      <div className="res-container">
        {/* //componenet */}
        {filteredRestraunt?.map((restraunt) => (
          <Link to={"/restraunts/" + restraunt.info.id} key={restraunt.info.id}>
            {" "}
            <RestraurantCard resData={restraunt} />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Body;
