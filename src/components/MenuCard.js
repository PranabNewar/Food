import { useDispatch } from "react-redux";
import { MENU_CARD_IMG_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice";
const MenuCard = ({ items }) => {
//   console.log(items, "items");
  // const {name,price,imageId,defaultPrice} = res?.items?.card?.info;
  const dispatch = useDispatch();
 
 const handleItem = (item)=>{
  dispatch(addItem(item))
 }
  return (
    <div>
      {items.map((item) => (
        <div key={item?.card?.info?.id} className="flex justify-between my-4 border-b border-gray-200">
          <div className="dishName-price pb-4 pl-2 w-8/12">
            <p className="font-bold">{item?.card?.info?.name}</p>
            <p >
              {"Rs. "}{" "}
              {item?.card?.info?.price / 100 ||
                item?.card?.info?.defaultPrice / 100}
            </p>
            <p className="text-xs py-4 font-regular text-ellipsis overflow-hidden text-gray-500   ">{item?.card?.info?.description}</p>
          </div>
        <div className="w-2/12  ">
         <button onClick={()=>handleItem(item)} className="p2 bg-white shadow-lg    mx-6 mt-16 text-green-600 px-2 font-mediuam text-md absolute rounded-lg">Add +</button>
            <img className=" w-[116px] h-[96px] rounded-lg " src={MENU_CARD_IMG_URL + item?.card?.info?.imageId}></img>
          
        </div>
        </div>
      ))}
    </div>
  );
};
export default MenuCard;
