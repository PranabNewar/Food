import { useContext, useEffect, useState } from "react";
import { generateProxyUrl } from "../utils/constants";
import Location from "../assets/images/location.png";
import LocationContext from "../utils/context/LocationContext";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/redux/modalSlice";

const GetLocation = ({ isLocationOpen, setIsLocationOpen }) => {
  const [query, setQuery] = useState("");
  const [suggestedLocations, setSuggestedLocations] = useState(null);
  const { setLocation, setLocationDetails } = useContext(LocationContext);
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      getData();
    }, 200);
    return () => {
      clearTimeout(timer);
    };
    // getData()
  }, [query]);

  //   console.log(query);

  async function getData() {
    // console.log(e);
    try {
      const resource = generateProxyUrl(
        "https://www.swiggy.com/dapi/misc/place-autocomplete?input=" + query
      );
      const data = await fetch(resource);
      const json = await data.json();
      setSuggestedLocations(json.data);
      console.log(json.data, "data");
    } catch (err) {
      console.log(err);
    }
  }
  async function handleClick(res) {
    try {
      const resource = generateProxyUrl(
        `https://www.swiggy.com/dapi/misc/address-recommend?place_id=${res?.place_id}`
      );
      const data = await fetch(resource);
      const json = await data.json();
      console.log(json.data, "aftr");
      const { formatted_address } = json.data[0];
      const { lat, lng } = json.data[0]?.geometry?.location;
      const { address_components } = json.data[0];

      const deliveryLocation = address_components?.filter(
        (res) => res?.types[0] === "locality"
      );

      setLocationDetails({
        address: formatted_address,
        deliveryLocation: deliveryLocation[0]?.long_name,
        lat: lat,
        lng: lng,
      });

      //   const {}
      console.log(deliveryLocation, "deliveryLocation");

      setLocation(json.data[0].geometry.location);
      //
      setIsLocationOpen(false);
    } catch (err) {
      console.log(err);
    }
  }

  if (!isLocationOpen) {
    return; //early return
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-10 ">
      <div className="w-[500px]  p-5  mx-auto mt-40  bg-slate-50 border-black shadow-md rounded-md">
        <div className="flex ">
          <input
            className="border mt-6 w-full outline-none  p-2"
            placeholder="Search for area,street name"
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          <span
            className="cursor-pointer"
            onClick={(e) => {
              setIsLocationOpen(false);
            }}
          >
            ✖
          </span>
        </div>
        <div>
          {suggestedLocations &&
            suggestedLocations?.map((res) => (
              <div
                key={res.place_id}
                onClick={(e) => {
                  handleClick(res);
                }}
                className=" flex items-center my-2 cursor-pointer"
              >
                <img className="w-4 h-4" src={Location}></img>
                <div className="px-4">
                  <h1>{res.structured_formatting.main_text}</h1>
                  <h2 className="text-xs text-gray-300">
                    {res.structured_formatting.secondary_text}
                  </h2>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default GetLocation;
