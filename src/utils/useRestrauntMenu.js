import { useEffect, useState } from "react";
import { MENU_API, generateProxyUrl } from "./constants";

const useRestrauntMenu =(resId)=>{
    const [resInfo, setResinfo] = useState(null);

 useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
   try{ const resource = generateProxyUrl(MENU_API + resId)

    const data = await fetch( resource);
    const json = await data.json();
    setResinfo(json.data);}
    //console.log(resInfo);
    //console.log("hey");
    catch(err){
      console.log(err)
    }
  };
    return resInfo
}
export default useRestrauntMenu;