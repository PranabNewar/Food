import { useEffect, useState, useContext } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/svg/myfoodlogo.svg";
import useOnlineStatus from "../utils/useOnline";
import UserContext from "../utils/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { getTotals } from "../utils/redux/cartSlice";
import SearchIcon from "../assets/svg/search.svg";
import Hamburger from "../assets/svg/hamburger.svg";
import LeftSideBar from "./LeftSideBar";
import { toggleMenu } from "../utils/redux/modalSlice";
import { removeUser } from "../utils/redux/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import GetLocation from "./GetLocation";
import DownArrow from "../assets/images/down-arrow.png";
import LocationContext from "../utils/context/LocationContext";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  //console.log("header render");
  //if dependency array is empty =[]=> useEffect is called on initial render(just once)
  //if no dependency arry => useEffect is called on every component  render
  useEffect(() => {
    //console.log("header render using useEffect");
  }, []);
  //if dependency array is [isLogin] => called every time isLogin is updated. every time isLogin is changes useEffect will be called

  // useEffect(()=>{
  //     //console.log("header render using useEffect with dependency in array");
  // },[isLogin])
  const totalCartItems = useSelector((state) => state.cart.itemsTotalQuantity);
  const items = useSelector((state) => state.cart.items);
  const [isToggle, setIsToggle] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userDetails = useSelector((state) => state.user);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [address, setAddress] = useState(null);
  // con
  const { location, dataFromLocal } = useContext(LocationContext);
  console.log(dataFromLocal, "location");
  const navigate = useNavigate();
  //console.log(isToggle, "istogggle");
  console.log(userDetails, "userdetails");
  useEffect(() => {
    if (userDetails) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userDetails]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotals());
  }, [items]);
  // const totalCartItems = useSelector((state)=>state.cart.itemsTotalQuantity)

  //console.log(totalCartItems, "Hearder");
  // useEffect(() => {
  //   const storedData = JSON.parse(localStorage.getItem("address:"));
  //   if (storedData) {
  //     setAddress(storedData);
  //   }
  // }, [location]);

  const onlineStatus = useOnlineStatus();
  const { logggdInUser } = useContext(UserContext);
  //here we are subscribing the store using selector
  const cartItems = useSelector((store) => store.cart.items);
  //console.log("cart", cartItems);
  //console.log();
  function handleSignOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  }
  return (
    <div className="border-b-1 border-slate-100 shadow-lg  ">
      <div className="flex justify-between  ">
        <div className="flex items-center">
          <a href="/">
            {" "}
            <img className="lg:w-20 md:w-16 sm:w-12 w-10 ml-2" src={Logo} />
          </a>
          <div
            className="cursor-pointer flex text-ellipsis items-center "
            onClick={(e) => {
              setIsLocationOpen(!isLocationOpen);
            }}
          >
            <h1 className=" mx-2 md:text-sm font-bold hover:text-orange-500 underline underline-offset-8 sm:text-xs text-[10px] lg:text-sm">
              {dataFromLocal?.deliveryLocation}
            </h1>
            <h2 className=" md:text-sm font-normal text-gray-600 sm:text-xs text-[10px] lg:text-xs overflow-x-hidden w-[350px]  truncate">
              {dataFromLocal?.address}
            </h2>
            <img className="" src={DownArrow}></img>
          </div>
        </div>
        {/* <div className="flex justify-between"> */}
        <ul className=" md:flex md:justify-between hidden md:items-center">
          <li className="px-4 ">
            <Link to="/search">
              {" "}
              <img
                className="lg:w-4 mx-1 sm:w-2 w-1  md:w-3  inline-block"
                src={SearchIcon}
              />
              <span className="md:text-sm font-semibold text-gray-600 sm:text-xs text-[10px] lg:text-base">
                Search
              </span>{" "}
            </Link>
          </li>

          <li className="px-4 font-semibold text-gray-600 md:text-sm sm:text-xs text-[10px] lg:text-base ">
            <Link to="/">Home</Link>
          </li>

          <li className="px-4 font-semibold text-gray-600 md:text-sm sm:text-xs text-[10px] lg:text-base">
            Online status:{onlineStatus ? "✅" : "🔴"}{" "}
          </li>
          <Link to="/cart">
            {" "}
            {/* <li className="px-4 font-semibold text-gray-600 md:text-sm sm:text-xs text-[10px] lg:text-base">
              Cart({totalCartItems})
            </li>{" "} */}
             <div class="relative ">
            <div class="t-0 bottom-4 absolute left-3">
              <p class="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                {totalCartItems !== 0 ? totalCartItems : 0}
                {/* {console.log(totalCartItems)} */}
              </p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="file:  h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </div>

          </Link>

         

          {isLoggedIn ? (
            <div className="inline-block px-4 ">
              {" "}
              {userDetails?.photoURL && (
                <img
                  src={userDetails.photoURL}
                  className="w-10 rounded-3xl inline-block"
                />
              )}
              <li
                className="cursor-pointer font-semibold text-gray-600 md:text-sm sm:text-xs text-[10px] lg:text-base inline-block"
                onClick={handleSignOut}
              >
                Signout
              </li>
            </div>
          ) : (
            <li
              className="px-4 cursor-pointer font-semibold text-gray-600 md:text-sm sm:text-xs text-[10px] lg:text-base"
              onClick={(e) => dispatch(toggleMenu(true))}
            >
              Signin
            </li>
          )}
        </ul>
        {/* </div> */}
        <div className="md:hidden items-center my-auto ml-2 ">
          <img
            className="w-8 cursor-pointer ml-4"
            onClick={(e) => {
              setIsToggle(!isToggle);
            }}
            src={Hamburger}
          />
        </div>
      </div>
      <ul
        className={`md:hidden bg-white w-full flex-col text-center z-10 absolute  ${
          isToggle ? "block" : "hidden"
        } `}
      >
        <li className="px-4 ">
          <Link to="/search">
            {" "}
            <img
              className="lg:w-4 mx-1 sm:w-2 w-1  md:w-3  inline-block"
              src={SearchIcon}
            />
            <span className="md:text-sm font-semibold text-gray-600 sm:text-xs text-[10px] lg:text-base">
              Search
            </span>{" "}
          </Link>
        </li>
        <li className="px-4 font-semibold text-gray-600 md:text-sm sm:text-xs ml-2 text-[10px] lg:text-base ">
          <Link to="/">Home</Link>
        </li>

        <Link to="/cart">
          {" "}
          <li className="px-4 font-semibold text-gray-600 md:text-sm sm:text-xs ml-3  text-[10px] lg:text-base z-10 ">
            Cart({totalCartItems})
          </li>{" "}
        </Link>
      </ul>

      {/* <hr className="   border-gray-200 shadow-xl"></hr> */}
      <div>
        <GetLocation
          isLocationOpen={isLocationOpen}
          setIsLocationOpen={setIsLocationOpen}
        />
      </div>
    </div>
  );
};
export default Header;
