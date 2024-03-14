import { useRef, useState } from "react";
import {
  addAddress,
  deleteAddress,
} from "../../utils/redux/deliveryAddressSlice";
import { useDispatch, useSelector } from "react-redux";
import AddressForm from "./AddressForm";
import Check from "../../assets/images/check.png";
import Delete from "../../assets/svg/delete.svg";
import { db } from "../../utils/firebase";
import { addDoc, collection } from "firebase/firestore";
import PreLoader from "../PreLoader";

const AddAddress = ({ setDeliveryAdd, deliveryAdd }) => {
  const dispatch = useDispatch();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const addresses = useSelector((state) => state.deliveryAddress.address);
  const userId = useSelector((state) => state?.user?.uid);
  console.log(userId, "adresesesese");

  function handleEdit(res) {
    setEditData(res);
    setIsAddOpen(true);
  }

  function handleDelete(res) {
    dispatch(deleteAddress(res));
  }

  return (
    <div>
      <div className="bg-slate-100 ">
        <div className="flex">
          <h1 className="font-bold lg:text-lg md:text-base sm:text-sm text-xs pl-3  my-1">
            {deliveryAdd === null
              ? "Choose a delivery address"
              : "Delivery address"}
          </h1>
          {deliveryAdd && <img className="w-4 h-4 mt-3 ml-8" src={Check}></img>}
        </div>
        <div>
          {deliveryAdd === null ? (
            <div className="flex flex-wrap">
              {addresses.map((res) => (
                <div
                  className="border w-[40%] m-4 bg-white md:p-6 sm:p-6 p-3 lg:p-6 "
                  key={res.id}
                >
                  <div className="lg:w-[200px] w-[100px] h-[50px] lg:h-[100px] overflow-hidden ellipsis ml-2 pt-2 md:text-xs sm:text-xs text-[8px] lg:text-xs">
                    <p className="">{res.Door}</p>
                    <p className="inline-block">
                      {res.address}
                      {", "}
                      {res.Landmark}
                    </p>
                  </div>
                  <div className=" lg:flex md:flex mt-3  lg:h-9 h-5  ">
                    <button
                      className="bg-green-500 sm:text-[8px] lg:text-sm text-[5px] px-3  rounded-lg  lg:px-2 sm:px-4  lg:py-1 mr-2 text-white"
                      onClick={(e) => setDeliveryAdd(res)}
                    >
                      {" "}
                      Deliver Here
                    </button>
                    <button
                      className="bg-black sm:text-[8px] text-[8px] lg:text-sm lg:px-2 px-4 mt-1 rounded-lg  mr-2 lg:py-1 text-white"
                      onClick={(e) => handleEdit(res)}
                    >
                      {" "}
                      Edit
                    </button>
                    <button
                      className=" mt-1"
                      onClick={(e) => handleDelete(res)}
                    >
                      <img
                        className="lg:w-4 sm:w-2 sm:h2 lg:h-4 w-3 h-3 mx-auto"
                        src={Delete}
                      ></img>
                    </button>
                  </div>
                </div>
              ))}
              <div className="border lg:w-[270px] lg:h-[200px] sm:w-[150px] sm:h-[130px] w-[155px] h-[90px]  m-4 bg-white p-6 ml-4">
                <h1 className="font-semibold sm:text-xs lg:text-md text-[9px]">
                  Add new address
                </h1>
                <button
                  className="bg-green-400 rounded-lg sm:text-xs text-[8px] px-2 text-white my-auto mt-4 mx-auto py-1"
                  onClick={(e) => setIsAddOpen(!isAddOpen)}
                >
                  Add new
                </button>
              </div>
            </div>
          ) : (
            <div className="border w-full  bg-white p-4 ">
              <div className="w-[100px] text-xs">
                <p className="">{deliveryAdd.Door}</p>
                <p className="inline-block">
                  {deliveryAdd.address}
                  {", "}
                  {deliveryAdd.Landmark}
                </p>
              </div>
              <div className=" flex">
                <button
                  className="bg-green-500 text-sm rounded-lg px-2 py-1 mt-2 text-white"
                  onClick={(e) => setDeliveryAdd(null)}
                >
                  {" "}
                  Change
                </button>
                {/* <button className="bg-black text-sm rounded-lg px-2 py-1 text-white" onClick={(e)=>handleEdit(deliveryAdd)}>
                {" "}
                Edit
              </button> */}
              </div>
            </div>
          )}
        </div>

        {isAddOpen && (
          <AddressForm
            setEditData={setEditData}
            data={editData}
            setIsAddOpen={setIsAddOpen}
          />
        )}
      </div>
    </div>
  );
};
export default AddAddress;
