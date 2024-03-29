import { useEffect, useState } from "react";
import { MENU_API, generateProxyUrl } from "./constants";

const useRestrauntMenu = (resId) => {
  const [resInfo, setResinfo] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const resource = generateProxyUrl(MENU_API + resId);

      const data = await fetch(
        `https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=26.16363&lng=91.7611838&restaurantId=${resId}`
      );
      const json = await data.json();
      console.log(
        "🚀 ~ file: useRestrauntMenu.js:19 ~ fetchMenu ~ json:",
        json
      );
      setResinfo(json.data);
    } catch (err) {
      //console.log("hey");
      console.log(err);
    }
  };
  return resInfo;
};
export default useRestrauntMenu;
