import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import SearchRestraunt from "./SearchRestraunt";
import { CDN_URL, generateProxyUrl } from "../../utils/constants";

const SearchResultList = ({ searchResult }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  //   const metaData = queryParams.get("metadata");
  //   //console.log(metaData,"metadata")
  const [searchedData, setSearchedData] = useState(null);

  //console.log();
  const { suggestions } = searchResult;
  console.log(
    "🚀 ~ file: SearchResultList.js:17 ~ SearchResultList ~ suggestions:",
    suggestions
  );
  //console.log(suggestions, "as a prop");
  async function handleChnage(metadata) {
    const resource = generateProxyUrl();

    const data = await fetch(
      `https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/restaurants/search/v3?lat=26.176673&lng=91.760003&str=${query}&trackingId=null&submitAction=SUGGESTION&queryUniqueId=246bef4d-e9c7-f6e6-2be4-b920682c690d&metaData=${metadata}`
    );
    const json = await data.json();
    console.log(
      "🚀 ~ file: SearchResultList.js:25 ~ handleChnage ~ json:",
      json
    );
    setSearchedData(json.data);
  }
  //console.log(searchedData, "state");
  console.log(
    "🚀 ~ file: SearchResultList.js:14 ~ SearchResultList ~ searchedData:",
    searchedData
  );

  return (
    <div className="md:mt-4 mt-2 mx-auto">
      {searchedData !== null ? (
        <div>
          <SearchRestraunt searchedData={searchedData} />
        </div>
      ) : (
        <div>
          {suggestions &&
            suggestions?.map((res, index) => (
              <Link
                to={`/search?query=${encodeURIComponent(searchResult.query)}`}
                key={index}
              >
                <div
                  className="flex md:my-4 my-2 items-center bg-slate-100"
                  onClick={() => handleChnage(res.metadata)}
                >
                  <img
                    className="md:w-24 w-10"
                    src={CDN_URL + res.cloudinaryId}
                  />
                  <div className="pl-4 ">
                    <h1 className="text-xs md:text-base">{res.text}</h1>
                    <h5 className="text-xs md:text-base">{res.tagToDisplay}</h5>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
  console.log(
    "🚀 ~ file: SearchResultList.js:67 ~ SearchResultList ~ searchedData:",
    searchedData
  );
};
export default SearchResultList;
