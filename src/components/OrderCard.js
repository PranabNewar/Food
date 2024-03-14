import { CDN_URL } from "../utils/constants";

const OrderCard = ({ res }) => {
  return (
    <div>
      {res?.data?.cart?.items?.map((res) => (
        <div
          key={res.card.info.id}
          className="flex shadow-md hover:shadow-lg rounded-md p-4"
        >
          <img
            className="w-20 h-18 mr-6"
            src={CDN_URL + res.card.info.imageId}
          ></img>

          <div>
            <h1>{res.card.info.name}</h1>

            <h1>Quantity: {res?.cartQuantity}</h1>
            <h1>Amount: {(res?.price * res.cartQuantity) / 100}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};
export default OrderCard;
