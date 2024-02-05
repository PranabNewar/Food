import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decreaseItem,
  getTotals,
  increaseItem,
} from "../utils/cartSlice";
import { useEffect } from "react";

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
  console.log(totalPrice, "totalPrice");
  return (
    <div className="">
      <div className="flex  justify-between ">
        <h4 className="w-4/12 text-center font-semibold">items</h4>
        <h4 className="w-4/12 text-center font-semibold">Quantity</h4>
        <h4 className="w-4/12 text-center font-semibold">price</h4>
      </div>

      {items.map((item) => (
        <div className="flex justify-between my-4 mx-2" key={item.card.info.id}>
          {console.log(item, "items")}

          <div className="w-4/12">
            <h1 className="pl-10"> {item.card.info.name}</h1>
          </div>
          <div className="w-4/12 text-center">
            <div className="bg-slate-200 w-32 mx-auto ">
              <button
                className="px-4 text-red-400"
                onClick={() => handleDecrease(item)}
              >
                {" "}
                -{" "}
              </button>

              <span className="px-4">{item.cartQuantity}</span>
              <button
                className="px-4 text-green-400"
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
      <div className="flex justify-between ">
        <h3 className="w-6/12">Total-</h3>
        <h3 className="w-6/12 text-center"> ₹{totalPrice} </h3>
      </div>
    </div>
  );
};
export default CartCard;
