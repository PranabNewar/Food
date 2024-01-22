import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter,Outlet,RouterProvider } from "react-router-dom";
import Aboutus from "./components/Aboutus";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestrauntMenu from "./components/RestrauntMenu";
import UserClass from "./components/UserClass";
// import Grocery from "./components/Grocery";
const Grocery = lazy(()=>import("./components/Grocery"))

const AppLayout = () => {
  console.log(<Body />); // virtual dom basically an object
  return (
    <div className="app">
      <Header />
<Outlet/>
    </div>
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
  path:"/grocery",  //dynamic Route
  element:<Suspense fallback={<h1>Loading......</h1>}><Grocery/></Suspense> //while using lazy loading we have to use Suspense Component
}
],
  errorElement:<Error/>
  
 },
 
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
