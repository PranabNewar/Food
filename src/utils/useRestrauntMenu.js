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

      const data = await fetch(resource);
      const json = await data.json();
      setResinfo(json.data);
      console.log(resInfo, "resInfo");
    } catch (err) {
      //console.log("hey");
      console.log(err);
    }
  };
  return resInfo;
};
export default useRestrauntMenu;
