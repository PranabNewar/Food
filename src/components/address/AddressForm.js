import { useRef } from "react";
import {
  addAddress,
  editAddress,
} from "../../utils/redux/deliveryAddressSlice";
import { useDispatch } from "react-redux";
// import { v4 as uuidv4 } from "uuid";
import { generateUUID } from "../../utils/genearateUuid";

const AddressForm = ({ setIsAddOpen, data, setEditData }) => {
  const address = useRef();
  const Door = useRef();
  const Landmark = useRef();
  const dispatch = useDispatch();
  function handleClick() {
    console.log(address.current.value, Door, Landmark.current.value);
    if (data === null) {
      const uniqueId = generateUUID();
      //   const uniqueId = uuidv4();
      dispatch(
        addAddress({
          id: uniqueId,
          address: address.current.value,
          Door: Door.current.value,
          Landmark: Landmark.current.value,
        })
      );
      setIsAddOpen(false);
    } else {
      console.log(data, "check");
      dispatch(
        editAddress({
          id: data.id,
          address: address.current.value,
          Door: Door.current.value,
          Landmark: Landmark.current.value,
        })
      );
      setEditData(null);
      setIsAddOpen(false);
    }
  }
  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-10">
        <div className=" w-[500px] mx-auto mt-40 bg-white">
          <input
            className="w-[400px] mt-6 ml-12 pl-4 p-4 border outline-none"
            type="text"
            placeholder="Address"
            ref={address}
            defaultValue={data ? data.address : ""}
          />{" "}
          <span className="cursor-pointer" onClick={(e) => setIsAddOpen(false)}>
            ✖
          </span>
          <br></br>
          <input
            className="w-[400px] mt-2 ml-12 pl-4 p-4 border outline-none"
            type="text"
            placeholder="Door/Flat no."
            ref={Door}
            defaultValue={data ? data.Door : ""}
          />{" "}
          <br></br>
          <input
            className="w-[400px] ml-12 pl-4 p-4 border outline-none"
            type="text"
            placeholder="Landmark"
            ref={Landmark}
            defaultValue={data ? data.Landmark : ""}
          />
          <div></div>
          <button
            className="w-[400px] mb-6 ml-12 rounded-lg mt-3 py-3 text-white bg-[#fc8019]"
            onClick={handleClick}
          >
            {" "}
            {data === null ? "SAVE ADDRESS & PROCEED" : "UPDATE"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddressForm;
