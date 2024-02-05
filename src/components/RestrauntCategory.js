
import MenuCard from "./MenuCard";
const RestrauntCategory = ({category ,showList,setShowIndex,setHideIndex})=>{
const {title,itemCards} = category;

// console.log(itemCards,"title")
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
            <div className="bg-slate-50 shadow-lg my-4 p-4 ">
           <div className="flex justify-between cursor-pointer" onClick={handleChange}>
            <span className="font-medium text-md">{title}({itemCards.length})</span>
            <span>⬇</span>
            </div>
            {/* <span className="mx-auto">items</span> */}
           {showList && <MenuCard items={itemCards}/>} 
            </div>
      </div>
    )
}
export default RestrauntCategory;