import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { addDoc, collection } from "firebase/firestore";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

import { db } from "../../utils/firebase";
import CartCardM from "./CartCardM";
import PreLoader from "../PreLoader";
import { clearCart } from "../../utils/redux/cartSlice";
import AddAddressM from "./AddAddressM";

const CartMobile = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const [deliveryAdd, setDeliveryAdd] = useState(null);
  const [isSpinner, setIsSpinner] = useState(false);
  const cartData = useSelector((state) => state.cart);
  console.log(cartData, " cart items");

  // const cartUserId = useSelector((state)=> state.cart.userId)
  const userId = useSelector((state) => state?.user?.uid);
  const dispatch = useDispatch();

  //console.log(cartItems, "in cart");
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  async function handleProceedPayment() {
    // if (deliveryAdd === null) {
      // console.log("Address not selected ");
      // window.alert("Address not selected please select any one address ");
    // } else {
      console.log("Address  selected ");
      try {
        //store data in fire base

        const stripe = await loadStripe(
          "pk_test_51OGD1UBZ38hpuCTdUihZE7x2kJSP7mxE24CHETV9EFQr5NkC6N65SZOnrR4bYpFj5ZA0olRVPGr8dhlMdPSyc0t400qmEtugI1"
        );
        setIsSpinner(true);
        const body = {
          cart: cartData,
        };
        const headers = {
          "Content-Type": "application/json",
        };
        const response = await fetch(
          "http://localhost:3000/api/create-checkout-session",
          {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
          }
        );

        const session = await response.json();
        console.log(session, "session data ");
        const result = stripe.redirectToCheckout({
          sessionId: session.id,
        });
        if (cartData) {
          let newDate = new Date();
          const orderRef = await addDoc(collection(db, "Order"), {
            user_id: userId,
            cart: cartData,
            orders: cartData,
            orderedDate: newDate,
          });
          console.log(orderRef, "post data");
        }
      } catch (err) {
        console.log(err);
      }
    // }
  }

  return isSpinner === true ? (
    <PreLoader />
  ) : (
    <div className=" w-11/12 mx-auto  relative ">
      {/* <h1 className="text-center font-semibold text-xl"> Cart </h1> */}
      {cartItems.length !== 0 && (
        <button
          className=" item-center mb-2 lg:text-base md:text-sm text-[10px] bg-blue-300 rounded-md p-1"
          onClick={handleClearCart}
        >
          clear cart
        </button>
      )}
      <div>
        {cartItems.length !== 0 ? (
          <div className=" ">
            <CartCardM items={cartItems} />

            {/* <div className=" sticky ">
                <AddAddressM
                  setDeliveryAdd={setDeliveryAdd}
                  deliveryAdd={deliveryAdd}
                />
              </div> */}
              <button
                  className="bg-green-500 sticky text-xs px-2 py-1 w-full text-white"
                  onClick={handleProceedPayment}
                >
                  {" "}
                  Proceed to payment{" "}
                </button>
          </div>
        ) : (
          <div className="">
            <h1 className="text-center">
              No Items Your shopping cart is empty
            </h1>{" "}
            <div className=" mt-6 mx-auto w-[200px]">
              {" "}
              <Link to={"/"}>
                <button className="bg-orange-400 text-white px-3 rounded-md ">
                  Restaurants Near You
                </button>{" "}
              </Link>
            </div>{" "}
          </div>
        )}
      </div>
      {/* {   cartItems.length !== 0 &&   } */}
    </div>
  );
};

export default CartMobile;
