import { useEffect, useState } from "react";
import { SWIGGY_SEARCH_API } from "../utils/constants";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // console.log(searchQuery)
  useEffect(() => {
    const timer = setTimeout(() => {
      getSearchResults();
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchResults = async () => {
    console.log("api - ", searchQuery);
    const data = await fetch(SWIGGY_SEARCH_API + searchQuery);
    const json = await data.json();
    console.log(json);
  };

  return (
    <div>
      <input
        type="text"
        className="border"
        onChange={(e) => setSearchQuery(e.target.value)}
      ></input>
    </div>
  );
};
export default SearchBar;
