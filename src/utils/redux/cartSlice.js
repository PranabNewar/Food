import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart", //name of the slice
  initialState: {
    items: [],
    itemsTotalQuantity: 0,
    itemsTotalAmount: 0,
    restaurantName : '',
  }, //what initially cart state will be  what whill be cart item
  reducers: {
    //we will create reducer corrosponding to action  //reducers are basically an object has different kind of action which we have take

    addItem: (state, action) => {
      //it will modified the state based on the action
      //mutating there states here directly
      const itemIndex = state.items.findIndex((item) => {
        // console.log(item.card.info.id,"itemindex1")
        return item.card.info.id === action.payload.card.info.id;
      });
      if (itemIndex >= 0) {
        // console.log(current(state.items[itemIndex]),"check")
        state.items[itemIndex].cartQuantity += 1;

        // console.log(current( state.items[itemIndex].cartQuantity),"quantityyyyyyyyyyyy")
      


        // console.log(current(state))
      }
      // console.log(itemIndex,"itemIndex")
      else {
        const tempProduct = { ...action.payload, cartQuantity: 1, price:action.payload.card.info.price,defaultFrice:action.payload.card.info.defaultFrice };
        state.items.push(tempProduct);
      }
      // state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      // these are reducer function which are basically map to an action

      const removeItems = state.items.filter(
        (item) => item.card.info.id !== action.payload.card.info.id
      );
      state.items = removeItems;
    },
    increaseItem: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.card.info.id === action.payload.card.info.id
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].cartQuantity += 1;
        


      }
    },
    decreaseItem: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.card.info.id === action.payload.card.info.id
      );
      if (itemIndex >= 0 && state.items[itemIndex].cartQuantity > 1) {
        state.items[itemIndex].cartQuantity -= 1;
      } else if (state.items[itemIndex].cartQuantity < 2) {
        const removeItems = state.items.filter(
          (item) => item.card.info.id !== action.payload.card.info.id
        );
        state.items = removeItems;
      }
    },
    getTotals: (state) => {
      let { totalPrice, totalQuantity } =
        state.items.length !== 0 &&
        state?.items?.reduce(
          (cartTotal, item) => {
            const { price, defaultPrice } = item.card.info;
            console.log(price, defaultPrice, "inreducer");
            let priceTotalEach =
              (price / 100) * item.cartQuantity ||
              (defaultPrice / 100) * item.cartQuantity;
            console.log(priceTotalEach, "inreducerTotal");

            cartTotal.totalPrice += priceTotalEach;
            console.log(cartTotal.totalPrice, "inreducerTotalprice");

            cartTotal.totalQuantity += item.cartQuantity;
            return cartTotal;
          },
          {
            totalPrice: 0,
            totalQuantity: 0,
          }
        );
      state.itemsTotalQuantity = totalQuantity;
      state.itemsTotalAmount = totalPrice&& totalPrice.toFixed(2);
    },
    clearCart: (state, action) => {
        console.log("clear calls")
      state.items = [];
      state.itemsTotalQuantity = 0
      state.itemsTotalAmount = 0;
    },
    addRestaurant: (state,action)=>{
      state.restaurantName= action.payload
    }
  }, // these are reducer functions
});

export const {
  addItem,
  removeItem,
  clearCart,
  increaseItem,
  decreaseItem,
  getTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
