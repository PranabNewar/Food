import { useDispatch, useSelector } from "react-redux";
import CartCard from "./CartCard";
import { clearCart } from "../utils/cartSlice";

const Cart =()=>{
    const cartItems = useSelector((store)=>store.cart.items)
  const dispatch = useDispatch();

    console.log(cartItems,"in cart")
    const handleClearCart = ()=>{
        dispatch(clearCart())
      }
    return (
        <div className="w-8/12  mx-auto mt-6"> 
            <h1 className="text-center font-semibold"> Cart </h1>
           {cartItems.length!==0 && <button className=" item-center bg-blue-300 rounded-md p-1" onClick={handleClearCart}>clear cart</button>} 
            <div>
               {cartItems.length!==0 ?<CartCard items ={cartItems}/>:<h1 className="text-center">No Items Your shopping cart is empty</h1> } 
            </div>
        
        </div>

    )
}

export default Cart;