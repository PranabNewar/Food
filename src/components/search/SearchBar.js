import { useEffect, useState } from "react";
import { SWIGGY_SEARCH_API, generateProxyUrl } from "../../utils/constants";
import SearchIcon from "../../assets/svg/search.svg";

import SearchResultList from "./SearchResultList";
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  // //console.log(searchQuery)
  useEffect(() => {
    const timer = setTimeout(() => {
      getSearchResults();
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);
  console.log(
    "🚀 ~ file: SearchBar.js:18 ~ SearchBar ~ searchQuery:",
    searchQuery
  );

  const getSearchResults = async () => {
    //console.log("api - ", searchQuery);
    // const resource = generateProxyUrl(); 
    try {
      const data = await fetch(
        `https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/restaurants/search/suggest?lat=26.176673&lng=91.760003&str=${searchQuery}`
      );
      const json = await data.json();
      console.log(
        "🚀 ~ file: SearchBar.js:31 ~ getSearchResults ~ json:",
        json
      );
      //console.log(json);
      setSearchResult(json.data);
    } catch (error) {
      console.log(error);
    }
  };
  // //console.log(searchResult, "search");

  return (
    <div className="">
      <div className="sticky top-0 bg-white p-2">
        <input
          type="text"
          className="border text-xs md:text-base w-[20rem] h-8 md:w-[700px] lg:w-[850px] md:h-12 mx-auto rounded-lg p-2 outline-none"
          value={searchQuery}
          placeholder="Search for restaurants and food"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <img
          className="md:w-4 w-3 absolute lg:left-[810px] md:left-[670px] md:bottom-[20px] left-[300px] bottom-[18px] lg:bottom-[20px]"
          src={SearchIcon}
          alt="Search Icon"
        />
      </div>
      <div className="bg-slate-50  ml-2 ">
        {searchResult && <SearchResultList searchResult={searchResult} />}
      </div>
    </div>
  );
};
export default SearchBar;
