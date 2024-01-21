import { useState } from "react";
import ChevronDown from "../assets/svg/ChevronDown.svg";
import ChevronUp from "../assets/svg/ChevronUp.svg"
import MenuCard from "./MenuCard";
const RestrauntMenuBtn = (category)=>{
const [isButtonClick, setIsButtonClick] = useState(false)
console.log(category,"cardmenubtn")
const {title,itemCards} = category.category;

console.log(itemCards,"title")
    return(
        <div>
        <div className="recomended-main-container">
        <div id="recomend-div" className="recomended-btn" onClick={()=>{
            let div = document.getElementById("menu-card")
            if(!isButtonClick){
              div.style.display ='none'
                setIsButtonClick(true)

                console.log(isButtonClick,"now click")

            }else{
                div.style.display ='block'
                setIsButtonClick(false)
                console.log(isButtonClick,"now click1")
            }
            console.log("recmend clicked")
        }}>
         <h3>{title}{"("}{itemCards.length}{")"}</h3>
        {isButtonClick? (<img src={ChevronUp}></img> ):
         (<img src={ChevronDown}></img>)}
          
        </div>
      </div>
      <div id="menu-card">
            <ul>
         {itemCards?.map((res) => (
                 <MenuCard items={res} key={res?.card?.info?.id} />
            //     //   <li key={res?.card?.info?.id}>
            //     //     {res?.card?.info?.name} - {"Rs."}{" "}
            //     //     {res?.card?.info?.price / 100 ||
            //     //       res?.card?.info?.defaultPrice / 100}{" "}
            //     //   </li>
         ))}
             </ul>
            </div>
      </div>
    )
}
export default RestrauntMenuBtn;