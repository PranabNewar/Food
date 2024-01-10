import RestraurantCard from "./RestraurantCard";
import restrautList from "../utils/mockData";
import { useState } from "react"; 
const Body = () => {
    //Local State Variables - Super powerful variable
    const [restraunt,setRestraunt] = useState(restrautList); //here it did array destruturing
    // const arr = useState(resList);
    // const [restraunt,setRestraunt] =arr; // these are he same thing 
  
    return (
    <div className="body">
      <div className="search">
        <input type="text" placeholder="Search"></input>
        <button>Search</button>
        <button className="filter-btn" onClick  ={()=>{
            let filterRes = restrautList.filter((res)=>res.data.avgRating>4)
           setRestraunt(filterRes)
            console.log("button clicked")
        }}>Top rated restraunts</button>


      </div>
      <div className="res-container">
        {/* //componenet */}
        {restraunt.map((restraunt) => (
          <RestraurantCard resData={restraunt} key={restraunt.data.id} />
        ))}
      </div>
    </div>
  );
};
export default Body;
