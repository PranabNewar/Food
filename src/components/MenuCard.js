import { useDispatch } from "react-redux";
import { MENU_CARD_IMG_URL } from "../utils/constants";
import { addItem, addRestaurant } from "../utils/cartSlice";
const MenuCard = ({ items,restaurant }) => {
  //console.log(restaurant, "items");
  // const {name,price,imageId,defaultPrice} = res?.items?.card?.info;
  const dispatch = useDispatch();
 
 const handleItem = (item)=>{
  dispatch(addItem({item,restaurant}))
  dispatch(addRestaurant(restaurant))
 }
  return (
    <div>
      {items.map((item) => (
        <div key={item?.card?.info?.id} className="flex justify-between my-4 border-b border-gray-200">
 {/* { //console.log(item?.card, "items")} */}
          
          <div className="dishName-price pb-4 pl-2 w-8/12">
            <p className="font-bold lg:text-sm md:text-xs text-[10px]">{item?.card?.info?.name}</p>
            <p className="lg:text-sm md:text-xs text-[10px] ">
              {"Rs. "}{" "}
              {item?.card?.info?.price / 100 ||
                item?.card?.info?.defaultPrice / 100}
            </p>
            <p className="lg:text-xs md:text-[10px] text-[8px] md:py-2 py-1 lg:py-4 font-regular text-ellipsis overflow-hidden text-gray-500   ">{item?.card?.info?.description}</p>
          </div>
        <div className="w-2/12  ">
         <button onClick={()=>handleItem(item,restaurant)} className="p2 bg-white shadow-lg  mt-10   lg:mx-6 md:mt-12 md:mx-2 lg:mt-16 text-green-600 lg:px-2 md:px-1 px-0 text-xs md:text-sm lg:text-base ml-2 font-mediuam text-md absolute rounded-lg">Add +</button>
            <img className=" lg:w-[116px] md:w-[80px] md:h-[70px] w-[70px] h-[60px] lg:h-[96px] rounded-lg " src={MENU_CARD_IMG_URL + item?.card?.info?.imageId}></img>
          
        </div>
        </div>
      ))}
    </div>
  );
};
export default MenuCard;
