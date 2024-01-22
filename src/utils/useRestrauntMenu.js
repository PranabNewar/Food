import { useEffect, useState } from "react";
import { MENU_API } from "./constants";

const useRestrauntMenu =(resId)=>{
    const [resInfo, setResinfo] = useState(null);

 useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(MENU_API + resId);
    const json = await data.json();
    setResinfo(json.data);
    console.log(resInfo);
    console.log("hey");
  };
    return resInfo
}
export default useRestrauntMenu;