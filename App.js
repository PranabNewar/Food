import React from "react";
import ReactDOM  from "react-dom/client";
const heading = React.createElement(
  "h1",
  { id: "heading" },
  "Hello world from react"
);
//here {} is place where we will give attributes to the tag
//here createRoot is the property of ReactDOM  and here root is the place where all the react will be run
//#what if we want to create multiple tags? so here is the solution
const parent = React.createElement("div", { id: "parent" },[React.createElement("div", { id: "child1" },[
    React.createElement("h1", { id: "heading" }, "This is after parcel "),
    React.createElement("h2", { id: "heading" }, "i am h2 tag here"),
  ]),React.createElement("div", { id: "child2" },[
    React.createElement("h1", { id: "heading" }, "i am 2nd child h1 tag here"),
    React.createElement("h2", { id: "heading" }, "i am 2nd child  h2 tag here"),
  ])] ); 
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent); // now here we render the heading in the react
// here render method will convert the react object to h1 tag and put it into the code
