import { useEffect, useState } from "react";
import { generateProxyUrl } from "../utils/constants";

const Filters = ({ filteredData }) => {
  const [address, setAddress] = useState(null);
  console.log(filteredData, "as a prop");
  const { facetList } = filteredData[0]?.card?.card;
  useEffect(() => {
    setAddress(JSON.parse(localStorage.getItem("address:")));
  }, []);
  console.log(address, "inprop");
  async function handleClick(res) {
    const postData = {
      lat: address.lat,
      lng: address.lng,
      filters: {
        isFiltered: true,
        facets: {
         [ res?.id]: [
            {
              value: res?.facetInfo[0]?.id,
            },
          ],
        },
      },
      seoParams: {
        seoUrl: "https://www.swiggy.com/",
        pageType: "FOOD_HOMEPAGE",
        apiName: "FoodHomePage",
      },
      page_type: "DESKTOP_WEB_LISTING",
      _csrf: "y9m7A9BdXzVb-FRP3udehwQj4JbXZ_xqnROuEMk0",
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type based on your API's requirements
        // Add any other headers if needed
      },
      body: JSON.stringify(postData), // Convert the data to JSON format
    };
    const resource = generateProxyUrl(
      "https://www.swiggy.com/dapi/restaurants/list/update"
    );
    const data = await fetch(resource, requestOptions);
    const json = data.json();
    console.log(json.data, "inform prop");
  }
  return (
    <div className="flex justify-evenly py-2 my-2">
      {facetList.map((res) => (
        <div key={res.id} className="">
          <button
            className="border rounded-2xl px-3 py-1"
            onClick={() => handleClick(res)}
          >
            {res?.facetInfo[0]?.label}
          </button>
        </div>
      ))}
    </div>
  );
};
export default Filters;
