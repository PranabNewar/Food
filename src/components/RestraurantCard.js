import { CDN_URL } from "../utils/constants"



const RestraurantCard = (props)=>{
    const {resData} = props
    const {name,cuisines,avgRating, cloudinaryImageId} = resData.data
    console.log(resData)
    return(
        <div className="res-card">
            <img alt="res-logo" src={CDN_URL+   cloudinaryImageId}></img>
            <h3>{name}</h3>
            <h4>{cuisines.join(",")}</h4>
            <h4>{avgRating}stars</h4>
        </div>
    )
 }
 export default RestraurantCard;