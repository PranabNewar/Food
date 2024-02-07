import { useEffect, useState } from "react"

const uesRestrauntData = () =>{
        const [resData,setResData] = useState(null)
        useEffect(()=>{
            getData()
        },[])

        async function getData() {
            try{ 
                const data = await fetch(
               "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.176673&lng=91.760003&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
             );
             const json = await data.json();
            setResData(json.data)
         //console.log(resData,"resData")
            }
            catch(err){
             console.log(err)
            }
           }

    return  resData;
   
   
}
export default uesRestrauntData;