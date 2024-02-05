import { useEffect, useState,useContext } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import Logo from "../assets/svg/myfoodlogo.svg";
import useOnlineStatus from "../utils/useOnline";
import UserContext from "../utils/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { getTotals } from "../utils/cartSlice";
import SearchBar from "./SearchBar";


const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  console.log("header render");
  //if dependency array is empty =[]=> useEffect is called on initial render(just once)
  //if no dependency arry => useEffect is called on every component  render
  useEffect(() => {
    console.log("header render using useEffect");
  }, []);
  //if dependency array is [isLogin] => called every time isLogin is updated. every time isLogin is changes useEffect will be called

  // useEffect(()=>{
  //     console.log("header render using useEffect with dependency in array");
  // },[isLogin])
  const totalCartItems = useSelector((state)=>state.cart.itemsTotalQuantity)
  const items = useSelector((state)=>state.cart.items)

const dispatch = useDispatch();
useEffect(()=>{
  dispatch(getTotals())
},[items])
  // const totalCartItems = useSelector((state)=>state.cart.itemsTotalQuantity)
  
  console.log(totalCartItems,"Hearder")

  const onlineStatus = useOnlineStatus();
  const {logggdInUser} = useContext(UserContext)
//here we are subscribing the store using selector
  const cartItems = useSelector((store)=>store.cart.items)
  console.log("cart",cartItems)
  console.log()
  return (
    <div className="border-b-1 border-slate-100 shadow-lg">
    <div className="flex justify-between ">
      
        <img className="w-20 ml-2" src={Logo} />
  
      {/* <div className="flex justify-between"> */}
        <ul className="md:flex md:justify-between hidden md:items-center">
        <li className="px-4 ">
            <Link to="/">Search</Link>
          </li>   
          
          <li className="px-4 ">
            <Link to="/">Home</Link>
          </li>
          {/* <li className="px-4">
            <Link to="/about">About us</Link>
          </li> */}
          {/* <li className="px-4">
            <Link to="/contact">Contact us</Link>
          </li> */}
          {/* <li className="px-4 ">
            <Link to="/grocery">Grocery</Link>
          </li> */}

          <li className="px-4">Online status:{onlineStatus ? "✅" : "🔴"}   </li>
         <Link to="/cart"> <li className="px-4">Cart({totalCartItems})</li> </Link>
          <li className="px-4">user: {logggdInUser}</li>


          {/* <li className="px-4">{isLogin ? (
            <button
              className="login-btn"
              onClick={() => {
                setIsLogin(false);
              }}
            >
              Logout
            </button>
          ) : (
            <button
              className="login-btn"
              onClick={() => {
                setIsLogin(true);
              }}
            >
              Login
            </button>
          )}</li> */}
        </ul>
      {/* </div> */}
    </div>
    {/* <hr className="   border-gray-200 shadow-xl"></hr> */}
    </div>
  );
};
export default Header;
