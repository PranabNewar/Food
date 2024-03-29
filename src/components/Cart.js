import { useDispatch, useSelector } from "react-redux";
import CartCard from "./CartCard";
import { clearCart } from "../utils/redux/cartSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AddAddress from "./address/AddAddress";
import { db } from "../utils/firebase";
import { addDoc, collection } from "firebase/firestore";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import PreLoader from "./PreLoader";
import { useMediaQuery } from "react-responsive";
import CartMobile from "./cartmobile/CartMobile";

const Cart = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 425px)" });
  const cartItems = useSelector((store) => store.cart.items);
  const [deliveryAdd, setDeliveryAdd] = useState(null);
  const [isSpinner, setIsSpinner] = useState(false);
  const cartData = useSelector((state) => state.cart);
  console.log(cartData, " cart items");

  // const cartUserId = useSelector((state)=> state.cart.userId)
  const userId = useSelector((state) => state?.user?.uid);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(cartItems, "in cart");
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  async function handleProceedPayment() {
    if (deliveryAdd === null) {
      console.log("Address not selected ");
      window.alert("Address not selected please select any one address ");
    } else {
      console.log("Address  selected ");

      navigate("/success");
      dispatch(clearCart());

      // try {
      //   //store data in fire base

      //   const stripe = await loadStripe(
      //     "pk_test_51OkhDgSDjGYeKK2dMHeEqOkKMsrblKbji6Sal3AIzf8lE8ov5Ph3blzwruMDfra3gyX02gujvOIscqrJAIhECzdI00qtrMFrBr"
      //   );
      //   // "pk_test_51OGD1UBZ38hpuCTdUihZE7x2kJSP7mxE24CHETV9EFQr5NkC6N65SZOnrR4bYpFj5ZA0olRVPGr8dhlMdPSyc0t400qmEtugI1"
      //   // "pk_test_51OkhDgSDjGYeKK2dABf0XGJLqxsn16eXwPGQBzY8sZh2WTGwMEhzvr3bjKHsnU0uGohIjyV33Dj9jVRue9LMqJlW00Ha40k8Ua"
      //   setIsSpinner(true);
      //   const body = {
      //     cart: cartData,
      //   };
      //   console.log(
      //     "🚀 ~ file: Cart.js:46 ~ handleProceedPayment ~ body:",
      //     body
      //   );
      //   const headers = {
      //     "Content-Type": "application/json",
      //   };

      //   const response = await fetch(
      //     "http://localhost:7000/api/create-checkout-session",
      //     {
      //       method: "POST",
      //       headers: headers,
      //       body: JSON.stringify(body),
      //     }
      //   );
      //   console.log(
      //     "🚀 ~ file: Cart.js:63 ~ handleProceedPayment ~ response:",
      //     response
      //   );

      //   const session = await response.json();
      //   console.log(session, "session data ");
      //   const result = stripe.redirectToCheckout({
      //     sessionId: session.id,
      //   });
      //   if (cartData) {
      //     let newDate = new Date();
      //     const orderRef = await addDoc(collection(db, "Order"), {
      //       user_id: userId,
      //       cart: cartData,
      //       orders: cartData,
      //       orderedDate: newDate,
      //     });
      //     console.log(orderRef, "post data");
      //   }
      // } catch (err) {
      //   console.log(err);
      // }
    }
  }

  return isSpinner === true ? (
    <PreLoader />
  ) : (
    <div>
      {isTabletOrMobile ? (
        <CartMobile />
      ) : (
        <div className="lg:w-10/12 w-11/12 mx-auto  ">
          <h1 className="text-center font-semibold text-xl"> Cart </h1>
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
              <div className="flex flex-col md:flex-row">
                <div className="md:w-full lg:w-[50vw]">
                  {/* className=" w-8/12 bg-slate-100" */}
                  <div className="md:w-full lg:w-[50vw] ">
                    <CartCard items={cartItems} />
                  </div>
                  <div className=" lg:mr-8 md:mr-8 sm:mr-8 mr-3 ">
                    <AddAddress
                      setDeliveryAdd={setDeliveryAdd}
                      deliveryAdd={deliveryAdd}
                    />
                  </div>

                  <div className="mt-2 bg-slate-100 mr-8  p-4 ">
                    {/* <h1 className="pb-4 lg:text-lg md:text-md text-sm font-semibold">
                      Payment Method
                    </h1> */}
                    <button
                      className="bg-green-500 rounded-md text-xs px-2 py-1 w-full text-white"
                      onClick={handleProceedPayment}
                    >
                      {" "}
                      Deliver{" "}
                    </button>
                  </div>
                </div>
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
      )}
    </div>
  );
};

export default Cart;
