import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decreaseItem,
  getTotals,
  increaseItem,
} from "../utils/cartSlice";
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
    <div className="">
      {/* <div>
          <img src=""></img>
          <h1>restaurant</h1>
          <h1>location</h1>
        </div> */}
      <div className="flex  justify-between border-b  pb-2 ">
        <h4 className="w-4/12 pl-12 font-semibold">items</h4>
        <h4 className="w-4/12 text-center font-semibold">Quantity</h4>
        <h4 className="w-4/12 text-center font-semibold">price</h4>
      </div>

      {items.map((item) => (
        <div
          className="flex justify-between my-4 mx-2 pb-2 border-b"
          key={item.card.info.id}
        >
          {/* {//console.log(item, "items")} */}

          <div className="w-4/12">
            <h1 className="text-base"> {item.card.info.name}</h1>
          </div>
          <div className="w-4/12 text-center">
            <div className="bg-slate-200 w-32 mx-auto ">
              <button
                className="mx-2 text-red-400"
                onClick={() => handleDecrease(item)}
              >
                {" "}
                -{" "}
              </button>

              <span className="px-4">{item.cartQuantity}</span>
              <button
                className="mx-2 text-green-400"
                onClick={() => handleIncrease(item)}
              >
                {" "}
                +{" "}
              </button>
            </div>
          </div>
          <div className="w-4/12 text-center">
            ₹{" "}
            {(item.card.info.price / 100) * item.cartQuantity ||
              (item.card.info.defaultPrice / 100) * item.cartQuantity}
          </div>
        </div>
      ))}
      <div className="flex justify-end mr-[115px] ">
        <h3 className="mr-4">Total -</h3>
        <h3 className=" "> ₹{totalPrice} </h3>
      </div>
    </div>
  );
};
export default CartCard;
