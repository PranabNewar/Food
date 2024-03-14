import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Check from "../../assets/images/check.png";
import Delete from "../../assets/svg/delete.svg";
import { deleteAddress } from "../../utils/redux/deliveryAddressSlice";

const AddAddressM = ({ setDeliveryAdd, deliveryAdd }) => {
  const dispatch = useDispatch();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isChoose, setIsChoose] = useState(false);

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
      <div className=" ">
        <div className="flex shadow-lg p-2 h-16 mt-[120px] sticky cursor-pointer" onClick={(e)=>setIsChoose(true)}>
          <h1 className="">
           
 Choose a delivery address
            
          </h1>
          {deliveryAdd && <img className="w-4 h-4 mt-3 ml-8" src={Check}></img>}
        </div>
        <div>
          {isChoose === true && (
            <div className="flex flex-wrap">
              {addresses.map((res) => (
                <div className="border  " key={res.id}>
                  <div className="">
                    <p className="">{res.Door}</p>
                    <p className="inline-block">
                      {res.address}
                      {", "}
                      {res.Landmark}
                    </p>
                  </div>
                  <div className="   ">
                    <button className="" onClick={(e) => setDeliveryAdd(res)}>
                      {" "}
                      Deliver Here
                    </button>
                    <button className="" onClick={(e) => handleEdit(res)}>
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
          )}

          {deliveryAdd && (
            <div className="border w-full  bg-white p-4 ">
              <div className="w-[100px] text-xs">
                <p className="">{deliveryAdd?.Door}</p>
                <p className="inline-block">
                  {deliveryAdd?.address}
                  {", "}
                  {deliveryAdd?.Landmark}
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
export default AddAddressM;
