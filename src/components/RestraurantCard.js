import { useContext } from "react"
import { CDN_URL } from "../utils/constants"
import UserContext from "../utils/UserContext"



const RestraurantCard = (props)=>{
    const {resData} = props
    const {logggdInUser}= useContext(UserContext)
    // const {name,cuisines,avgRating, cloudinaryImageId} = resData.data
    // console.log(resData.info.name) text-[10px] md:text-sm
    return(
        <div className="p-2 m-2 w-[144px] cursor-pointer  md:w-[224px] whitespace-normal bg-neutral-50 hover:bg-neutral-100 w-[130px] md:min-h-[290px] md:max-h-[290px]  rounded-lg">
            <img className="rounded-lg" alt="res-logo" src={CDN_URL+   resData.info.cloudinaryImageId}></img>
            <h3 className="font-semibold truncate  py-1 text-[10px] md:text-[15px]">{resData.info.name}</h3>
            <h4 className=" truncate text-[9px] md:text-[14px]">{resData.info.cuisines.join(",")}</h4>
            <h4 className="text-[9px] md:text-[14px] pb-2">{resData.info.avgRating}stars</h4>
            {/* <h4>user: {logggdInUser}</h4> */}

        </div>
    )
 }
 export default RestraurantCard;