import { useEffect, useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import Logo from "../assets/images/myfoodlogo.jpg"

const Header = () =>{
    const [isLogin,setIsLogin] = useState(false);
    console.log("header render")
    //if dependency array is empty =[]=> useEffect is called on initial render(just once)
    //if no dependency arry => useEffect is called on every component  render
    useEffect(()=>{
        console.log("header render using useEffect");
    },[])
    //if dependency array is [isLogin] => called every time isLogin is updated. every time isLogin is changes useEffect will be called

    // useEffect(()=>{
    //     console.log("header render using useEffect with dependency in array");
    // },[isLogin])
    return(
    <div className="header">
        <div className="logo-container">
            <img className="logo" src={Logo}/>
        </div>
        <div className="nav-items">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About us</Link></li>
                <li><Link to ="/contact">Contact us</Link></li>
                <li>Cart</li>

               {isLogin?<button className="login-btn" onClick={()=>{setIsLogin(false)}}>Logout</button>:<button className="login-btn" onClick={()=>{setIsLogin(true)}}>Login</button>}

            </ul>
        </div>
    </div>
    )

}
export default Header;
