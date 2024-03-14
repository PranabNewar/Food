import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import {
  decreaseItem,
  getTotals,
  increaseItem,
} from "../../utils/redux/cartSlice";

const CartCardM = ({ items }) => {
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
    <div className=" ">
      {items.map((item) => (
        <div className="flex  justify-between mb-4 " key={item.card.info.id}>
          {/* {//console.log(item, "items")} */}

          <div className="w-6/12 ">
            <h1 className="text-sm "> {item.card.info.name}</h1>
          </div>
          <div className="w-4/12 ">
            <div className="mx-auto border text-sm  w-16 flex justify-between px-1">
              <button
                className="  text-red-400 "
                onClick={() => handleDecrease(item)}
              >
                -{" "}
              </button>

              <span className="">{item.cartQuantity}</span>
              <button
                className=" text-green-400"
                onClick={() => handleIncrease(item)}
              >
                +
              </button>
            </div>
          </div>
          <div className="w-2/12 text-center">
            ₹{" "}
            {(item.card.info.price / 100) * item.cartQuantity ||
              (item.card.info.defaultPrice / 100) * item.cartQuantity}
          </div>
        </div>
      ))}
      <div className="flex justify-between text-sm border-t p-2 font-semibold  ">
        <h3 className="">To pay -</h3>
        <h3 className=" mr-1 "> ₹{totalPrice} </h3>
      </div>





    </div>
  );
};
export default CartCardM;
