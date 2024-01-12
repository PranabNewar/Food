import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter,Outlet,RouterProvider } from "react-router-dom";
import Aboutus from "./components/Aboutus";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestrauntMenu from "./components/RestrauntMenu";

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
}],
  errorElement:<Error/>
  
 },
 
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
