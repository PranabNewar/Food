import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter,Outlet,RouterProvider } from "react-router-dom";
import Aboutus from "./components/Aboutus";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestrauntMenu from "./components/RestrauntMenu";
import UserContext from "./utils/UserContext";
// import Grocery from "./components/Grocery";
const Grocery = lazy(()=>import("./components/Grocery"))
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";

const AppLayout = () => {
  console.log(<Body />); // virtual dom basically an object

//authentication
let persistor = persistStore(appStore)
  const [userName,setUserName] = useState()
  useEffect(()=>{
//Make a api call and send user name and password
 const data = {
  name: " Pranab Newar"
 };
 setUserName(data.name);

  },[])
  // console.log(userName)
  return (
    //defaul value
    <Provider store={appStore}>
      <PersistGate persistor={persistor}>
    <UserContext.Provider value = {{logggdInUser: userName,setUserName}} >  
    <div className="app">
      {/* <UserContext.Provider value={{logggdInUser: "Ms Dhoni"}}> */}
      <Header />

      {/* </UserContext.Provider> */}
<Outlet/>
    </div>
    </UserContext.Provider>
    </PersistGate>
    </Provider>
  );
};
const appRouter = createBrowserRouter([
  { path: "/", element: <AppLayout />,
  children:[ {
    
    path: "/",
    element: <Body/>,
    },{
    path: "/about",
    element: <Aboutus />,
  },
  {
    path:"/contact",
    element:<Contact/>
  },
{
    path:"/restraunts/:resId",  //dynamic Route
    element:<RestrauntMenu/>
},
{
  path:"/grocery",  
  element:<Suspense fallback={<h1>Loading......</h1>}><Grocery/></Suspense> //while using lazy loading we have to use Suspense Component
},
{
  path:"/cart",  //dynamic Route
  element:<Cart/>
}
],
  errorElement:<Error/>
  
 },
 
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
