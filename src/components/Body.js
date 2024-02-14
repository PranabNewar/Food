import RestraurantCard from "./RestraurantCard";
// import restrautList from "../utils/mockData";
import { useContext, useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnline";
import WhatOnMind from "./WhatOnMind";
import UserContext from "../utils/UserContext";
import uesRestrauntData from "../utils/useRestrauntData";
import { generateProxyUrl } from "../utils/constants";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/redux/userSlice";
import { auth } from "../utils/firebase";
import GetLocation from "./GetLocation";
import LocationContext from "../utils/context/LocationContext";
import { stringify } from "postcss";
const Body = () => {
  //Local State Variables - Super powerful variable
  const [restraunt, setRestraunt] = useState([]); //here it did array destruturing
  // const arr = useState(resList);
  // const [restraunt,setRestraunt] =arr; // these are he same thing
  const [filteredRestraunt, setFilteredRestraunt] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [whatsOnYourMind, setWhatsOnYourMind] = useState();
  const [topRestraunt, setTopRestraunt] = useState();
  const [current, setCurrent] = useState(0);
  const [onCloseModal, setOnCloseModal] = useState(false);
  const { location ,dataFromLocal} = useContext(LocationContext);
 

  console.log(location, "locationssss");
  const dispatch = useDispatch();
  // whenever state variables update, react triggers a reconciliation cycle(RE - render component)
  //console.log("body rendered");

  const { logggdInUser, setUserName } = useContext(UserContext);

  const isModalOpen = useSelector((state) => state.modal.isMenuOpen);
  console.log(isModalOpen, "isModalOpen");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;

        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        // ...
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
      }
    });
  }, []);

  useEffect(() => {
    getData();
  }, [location]);
  useEffect(()=>{
    const storedData = JSON.parse(localStorage.getItem('address:'))
  },[])

  // const resData = uesRestrauntData();
  //console.log(resData, "data from custom hook");

  async function getData() {
    try {
      if (location !== null) {
        const resource = generateProxyUrl(
          `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${location.lat}&lng=${location.lng}&is-seo-homepage-enabled=true`
        );
        const data = await fetch(resource);
        const json = await data.json();
        //console.log(
        //   json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle ?.restaurants
        // );
        const restruntList = json.data.cards.filter((res) => {
          return res.card.card.id === "restaurant_grid_listing";
        });
        setWhatsOnYourMind(
          json.data?.cards?.filter((res) => {
            return res?.card?.card?.id === "whats_on_your_mind";
          })
        );
        setTopRestraunt(json.data?.cards[1]?.card?.card);
        //console.log(whatsOnYourMind, "in mind");

        setRestraunt(
          restruntList[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants
        );
        // const card

        setFilteredRestraunt(
          restruntList[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants
        );

        console.log(json.data);
        //console.log(filteredRestraunt, "filterr");
        console.log(topRestraunt, "restrauntList");
      } else {
        const resource = generateProxyUrl(
          `https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.1157917&lng=91.7085933&is-seo-homepage-enabled=true`
        );

        const data = await fetch(resource);
        const json = await data.json();
        //console.log(
        //   json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle ?.restaurants
        // );
        const restruntList = json.data.cards.filter((res) => {
          return res.card.card.id === "restaurant_grid_listing";
        });
        setWhatsOnYourMind(
          json.data?.cards?.filter((res) => {
            return res?.card?.card?.id === "whats_on_your_mind";
          })
        );
        setTopRestraunt(json.data?.cards[1]?.card?.card);
        //console.log(whatsOnYourMind, "in mind");

        setRestraunt(
          restruntList[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants
        );
        // const card

        setFilteredRestraunt(
          restruntList[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants
        );

        console.log(json.data);
        //console.log(filteredRestraunt, "filterr");
        console.log(topRestraunt, "restrauntList");
      }
      // https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=26.1157917&lng=91.7085933&carousel=true&third_party_vendor=1
      //
    } catch (err) {
      console.log(err);
    }
  }

  const onlineStatus = useOnlineStatus();
  //console.log(onlineStatus);
  //Early return
  if (!onlineStatus) {
    return (
      <h1 className="p-10 font-semibold text-xl">
        Looks like you are offline please check your internet connection
      </h1>
    );
  }

  function handleSearchInput(e) {
    setSearchText(e.target.value);
    // //console.log(searchText)
  }
  //conditional rendering
  // if(restraunt.length===0)
  // {
  //   return <Shimmer/>
  // }

  function prevSlide() {
    if (current === 0) {
      setCurrent(
        topRestraunt?.gridElements?.infoWithStyle?.restaurants.length - 1 - 7
      );
    } else {
      setCurrent(current - 4);
    }
  }
  function nextSlide() {
    //console.log("clicked");
    if (
      current >=
      topRestraunt?.gridElements?.infoWithStyle?.restaurants.length - 1 - 7
    ) {
      setCurrent(0);
    } else {
      setCurrent(current + 4);
    }
  }

  return restraunt?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className=" w-[20rem] sm:min-w-[600px] md:min-w-[670px] lg:min-w-[961px] mx-auto">
      {whatsOnYourMind.length !== 0 && (
        <div className="overflow-hidden my-10 pb-2 border-b ">
          <WhatOnMind whatsOnYourMind={whatsOnYourMind} />
        </div>
      )}

      {topRestraunt?.gridElements?.infoWithStyle?.restaurants.length !== 0 && (
        <div className=" overflow-hidden mt-6  border-b pb-2">
          <div>
            <div className="flex justify-between mb-6">
              <h1 className="font-medium text-xs md:text-xl lg:text-2xl">
                {topRestraunt?.header?.title}
              </h1>
              <div>
                <button
                  className="px-2 sm:px-1 hover:bg-sky-100"
                  onClick={prevSlide}
                >
                  ⬅
                </button>
                <button
                  className="px-2 sm:px-1 hover:bg-slate-100"
                  onClick={nextSlide}
                >
                  ➡
                </button>
              </div>
            </div>
            <div
              className="flex  w-[7000px] transition ease-out duration-40"
              style={{ transform: `translateX(-${current * 4}%)` }}
            >
              {topRestraunt?.gridElements?.infoWithStyle?.restaurants?.map(
                (restraunt) => (
                  <Link
                    to={"/restraunts/" + restraunt.info.id}
                    key={restraunt.info.id}
                  >
                    {" "}
                    <RestraurantCard resData={restraunt} />{" "}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center items-center mx-auto mt-6 mb-4">
        <input
          className="mr-4 mt-1 p-1 w-24 text-[6px] sm:text-[8px] md:text-[10px] lg:text-[15px] md:w-44 lg:w-60 border rounded outline-none "
          type="text"
          placeholder="Search"
          onChange={handleSearchInput}
        ></input>
        <div>
          <button
            className="bg-green-300 rounded  p-1 px-2 mr-2 md:text-[10px] sm:text-[8px] lg:text-[15px] text-[8px]  "
            onClick={() => {
              const filterData = restraunt.filter((res) => {
                return res.info.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase());
              });
              setFilteredRestraunt(filterData);
              //console.log(filterData, "fill");
            }}
          >
            Search
          </button>

          <button
            className="bg-rose-300 rounded  p-1 px-2 mr-6 md:text-[10px] sm:text-[8px] lg:text-[15px] text-[8px]"
            onClick={() => {
              let filterRes = restraunt.filter(
                (res) => res.info.avgRating > 4.2
              );
              setFilteredRestraunt(filterRes);
              //console.log("button clicked", filterRes);
            }}
          >
            Top rated restraunts
          </button>

          {/* <input
            className=" "
            value={logggdInUser}
            onChange={(e) => {
              setUserName(e.target.value);
            }} */}
          {/* /> */}
        </div>
      </div>
      <div className="flex flex-wrap    ">
        {/* //componenet */}
        {filteredRestraunt?.map((restraunt) => (
          <Link to={"/restraunts/" + restraunt.info.id} key={restraunt.info.id}>
            {" "}
            <RestraurantCard resData={restraunt} />
          </Link>
        ))}
      </div>
      <div>
        <Login isModalOpen={isModalOpen} />{" "}
      </div>
    </div>
  );
};
export default Body;
