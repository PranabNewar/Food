
import { useEffect } from "react";
import MenuCard from "./MenuCard";
const RestrauntCategory = ({category,restaurant ,showList,setShowIndex,setHideIndex,index})=>{
const {title,itemCards} = category;

//console.log(itemCards,"title")
let count = 1;
function handleChange(){
    if(showList){
        setHideIndex()
    }else{
        setShowIndex()

    }
    // setShowList(!showList) // it is a toggle button when true it will false vice versa
}

    return(
        <div>
            <div className="bg-slate-50 shadow-lg md:my-3 my-2 lg:my-4 p-1 md:p-2 lg:p-4 ">
           <div className="flex justify-between cursor-pointer" onClick={handleChange}>
            <span className="font-medium lg:text-md md:text-sm text-xs">{title}({itemCards.length})</span>
            <span>⬇</span>
            </div>
            {/* <span className="mx-auto">items</span> */}
           {showList && <MenuCard items={itemCards} restaurant={restaurant}/>} 
            </div>
      </div>
    )
}
export default RestrauntCategory;