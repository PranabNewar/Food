import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Aboutus from "./components/Aboutus";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestrauntMenu from "./components/RestrauntMenu";
import UserContext from "./utils/UserContext";
// import Grocery from "./components/Grocery";
const Grocery = lazy(() => import("./components/Grocery"));
import { Provider, useDispatch } from "react-redux";
import appStore from "./utils/redux/appStore";
import Cart from "./components/Cart";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
import SearchPage from "./components/search/SearchPage";
import SearchRestraunt from "./components/search/SearchRestraunt";
import SearchDishCard from "./components/search/SearchDishCard";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";
import { addUser, removeUser } from "./utils/redux/userSlice";
import LocationContextProvider from "./utils/context/LocationContextProvider";

const AppLayout = () => {
  console.log(<Body />); // virtual dom basically an object
  // const dispatch =useDispatch()
  //authentication
  let persistor = persistStore(appStore);
  const [userName, setUserName] = useState();

  useEffect(() => {
    //Make a api call and send user name and password
    const data = {
      name: " Pranab Newar",
    };
    setUserName(data.name);
  }, []);

  // console.log(userName)

  return (
    //defaul value
    <Provider store={appStore}>
      <PersistGate persistor={persistor}>
        <UserContext.Provider value={{ logggdInUser: userName, setUserName }}>
          <LocationContextProvider>
            <div className="app">
              {/* <UserContext.Provider value={{logggdInUser: "Ms Dhoni"}}> */}
              {/* <div className="absolute bg-slate-400 h-full ">
              <LeftSideBar />
            </div>
            <div className="absolute left-[1255px] z-10 bg-slate-400 h-full ">
              <LeftSideBar />
            </div> */}

              <Header />

              {/* </UserContext.Provider> */}
              <Outlet />
              {/* <LeftSideBar /> */}
            </div>
          </LocationContextProvider>
        </UserContext.Provider>
      </PersistGate>
    </Provider>
  );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <Aboutus />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restraunts/:resId", //dynamic Route
        element: <RestrauntMenu />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Loading......</h1>}>
            <Grocery />
          </Suspense>
        ), //while using lazy loading we have to use Suspense Component
      },
      {
        path: "/cart", //dynamic Route
        element: <Cart />,
      },

      {
        path: "/search", //dynamic Route
        element: <SearchPage />,
      },
      {
        path: "/search", //dynamic Route
        element: <SearchRestraunt />,
      },
      {
        path: "/dish", //dynamic Route
        element: <SearchDishCard />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
