import { createSlice, current } from "@reduxjs/toolkit";

const deliveryAddressSlice = createSlice({
  name: "DeliveryaAddress",
  initialState: {
    address: [],
  },
  reducers: {
    addAddress: (state, action) => {
      console.log(action.payload, "payload");
      state.address.push(action.payload);
    },
    deleteAddress: (state, action) => {
      // console.log(action.payload.id, "delete called");
      const deletedAdd = state.address.filter((res) => {
        // console.log(current(res));
        return res.id !== action.payload.id;
      });
      // console.log(deletedAdd, "payload in delete ");

      state.address = deletedAdd;
    },
    editAddress: (state, action) => {
      const index = state.address.findIndex(
        (res) => res.id === action.payload.id
      );

      if (index !== -1) {
        state.address[index] = action.payload;
      }
      console.log(action.payload, "upadated data");

      // console.log(updatedData, "upadated data");
    },
  },
});
export const { addAddress, deleteAddress, editAddress } =
  deliveryAddressSlice.actions;
export default deliveryAddressSlice.reducer;
