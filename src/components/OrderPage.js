import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { CDN_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import OrderCard from "./OrderCard";

const OrderPage = () => {
  const [order, setOrders] = useState(null);
  const userId = useSelector((state) => state.user.uid);
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const data = await getDocs(collection(db, "Order"));
    // const json = await data.json();
    // console.log(data.docs, "from fire base");
    const orders = data.docs.map((doc) => ({
      data: doc.data(),
      id: doc.id,
    }));
    const orderData = orders.map((res) => ({ data: res }));
    setOrders(orders);
    console.log(orderData, "from fire base");

    console.log(orders, "from fire base");
  }
  return (
    <div className=" w-8/12 mx-auto">
      <h1 className="font-semibold text-lg text-center ">Your Orders</h1>
      <div className="">
        {order !== null &&
          order.map((res) => (
            <div key={res.id} className="mb-6">
              {console.log(res.id, "id")}
              {
                res.data.user_id === userId && <OrderCard res={res} />

                // res?.data?.cart?.items?.map((res) => (
                //   <div key={res.card.info}>
                //     <h1>{res.card.info.name}</h1>
                //     <div>
                //       <img
                //         className="w-16"
                //         src={CDN_URL + res.card.info.imageId}
                //       ></img>
                //       <h1>Quantity: {res?.cartQuantity}</h1>
                //       <h1>amount: {(res?.price * res.cartQuantity) / 100}</h1>
                //     </div>
                //   </div>
                // ))
              }
            </div>
          ))}
      </div>
    </div>
  );
};
export default OrderPage;
