import { CDN_URL } from "../utils/constants"



const RestraurantCard = (props)=>{
    const {resData} = props
    // const {name,cuisines,avgRating, cloudinaryImageId} = resData.data
    // console.log(resData.info.name)
    return(
        <div className="res-card">
            <img alt="res-logo" src={CDN_URL+   resData.info.cloudinaryImageId}></img>
            <h3>{resData.info.name}</h3>
            <h4>{resData.info.cuisines.join(",")}</h4>
            <h4>{resData.info.avgRating}stars</h4>
        </div>
    )
 }
 export default RestraurantCard;