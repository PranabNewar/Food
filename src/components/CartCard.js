import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decreaseItem,
  getTotals,
  increaseItem,
} from "../utils/redux/cartSlice";
import { useEffect } from "react";
import { CDN_URL } from "../utils/constants";

const CartCard = ({ items }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotals());
  }, [items]);

  const handleIncrease = (item) => {
    dispatch(increaseItem(item));
  };
  const handleDecrease = (item) => {
    dispatch(decreaseItem(item));
  };

  const totalPrice = useSelector((state) => state.cart.itemsTotalAmount);
  //console.log(items, "totalPrice");
  return (
    <div className=" border   lg:p-2">
      {/* <div>
          <img src=""></img>
          <h1>restaurant</h1>
          <h1>location</h1>
        </div> */}
      {/* <div className="flex  justify-between border-b  pb-2 ">
        <h4 className="lg:w-4/12 w-5/12 lg:text-base md:text-sm text-xs pl-12 font-semibold">
          items
        </h4>
        <h4 className="lg:w-4/12 w-2/12 lg:text-base md:text-sm text-xs text-center font-semibold">
          Quantity
        </h4>
        <h4 className="lg:w-4/12 w-5/12 lg:text-base md:text-sm text-xs text-center font-semibold">
          price
        </h4>
      </div> */}

      {items.map((item) => (
        <div
          className="flex justify-between my-4 mx-2 pb-2 border-b"
          key={item.card.info.id}
        >
          {/* {//console.log(item, "items")} */}

          <div className="w-5/12">
            <h1 className="lg:text-base md:text-sm text-[6px] ">
              {" "}
              {item.card.info.name}
            </h1>
          </div>
          <div className="w-4/12 mx-auto   text-center">
            <div className="bg-slate-200 mx-auto lg:w-24 lg:h-6 sm:w-12 w-10 h-4  ">
              <button
                className="lg:mx-2 mx-1 text-xs  mb-2  text-red-400 "
                onClick={() => handleDecrease(item)}
              >
                -{" "}
              </button>

              <span className="lg:px-2 lg:text-sm pb-2 md:text-sm text-[8px]">
                {item.cartQuantity}
              </span>
              <button
                className="lg:mx-2 mx-1 sm:text-sm text-xs  text-green-400"
                onClick={() => handleIncrease(item)}
              >
                +
              </button>
            </div>
          </div>
          <div className="w-4/12 text-center lg:text-base md:text-sm text-[10px]">
            ₹{" "}
            {(item.card.info.price / 100) * item.cartQuantity ||
              (item.card.info.defaultPrice / 100) * item.cartQuantity}
          </div>
        </div>
      ))}
      <div className="flex justify-end lg:mr-[115px] mr-[10px] text-[10px] sm:text-xs  ">
        <h3 className="mr-4">Total -</h3>
        <h3 className=" "> ₹{totalPrice} </h3>
      </div>
    </div>
  );
};
export default CartCard;
