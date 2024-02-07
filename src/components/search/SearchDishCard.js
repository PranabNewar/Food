import { useDispatch } from "react-redux";
import { CDN_URL } from "../../utils/constants";
import { addItem } from "../../utils/cartSlice";
import RightArrow from "../../assets/svg/right-arrow.svg";
import { Link } from "react-router-dom";
import Veg from "../../assets/images/veg.png";
import Nonveg from "../../assets/images/Nonveg.png";

const SearchDishCard = ({ dish }) => {
  const dispatch = useDispatch();

  const handleItem = (item) => {
    dispatch(addItem(item));
  };
  return (
    <div className="flex flex-wrap mx-auto">
      {dish.map((res) => (
        <div
          className=" w-[3000px] md:w-[400px]  p-4 mt-4 mx-2 shadow-xl bg-white rounded-lg"
          key={res?.card?.card?.info?.id}
        >
          <Link to={"/restraunts/" + res.card.card.restaurant.info.id}>
            <div className=" border-b border-dashed flex justify-between ">
              <div>
                <h1 className="font-semibold text-xs md:text-sm text-slate-600">
                  {res.card.card.restaurant.info.name}
                </h1>
                <h5 className="inline-block pr-2 font-normal text-slate-600 md:text-xs text-[10px]">
                  {res.card.card.restaurant.info.avgRating}stars
                </h5>
                <span className="font-normal text-slate-600 md:text-xs text-[10px]">
                  {res.card.card.restaurant.info.sla.slaString}
                </span>
              </div>
              <div className="items-center">
                <img className="md:w-4 w-2 " src={RightArrow} />
              </div>
            </div>
          </Link>

          <div className="flex">
            {res.card.card.info.isVeg ? (
              <img className="md:w-4 md:h-4 w-2 h-2" src={Veg} />
            ) : (
              <img className="md:w-4 md:h-4 w-2 h-2" src={Nonveg} />
            )}
            {/* <h2>promoted</h2> */}
          </div>
          <div className="flex justify-between mt-1 ">
            <div className="dishName-price pb-4 w-8/12">
              <p className="font-bold text-xs md:text-sm">{res.card.card.info.name}</p>
              <p className="md:text-sm text-xs">
                {"₹. "} {res.card.card.info.price / 100}
              </p>
              <p className="md:text-xs text-[8px] pt-2 font-regular text-ellipsis overflow-hidden text-gray-500   ">
                {res.card.card.info.description}
              </p>
            </div>
            <div className="w-2/12  mt-3 ">
              <button
                onClick={() => handleItem(res.card)}
                className=" bg-white shadow-lg    md:mt-16 mt-10 text-green-600 px-1 text-xs font-mediuam md:text-md absolute  rounded-lg"
              >
                Add +
              </button>
              <img
                className=" w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-lg "
                src={CDN_URL + res.card.card.info.imageId}
              ></img>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default SearchDishCard;
