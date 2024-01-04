import React from "react";
import ReactDOM from "react-dom/client";

const Title =()=> <h1 className="heading">Hey this is react</h1>
const desc  = <h3>This is description</h3>  //this is an react element
//component inside a component is called comonent composition
const Heading =()=>{
    return(
    <div>
        <Title/>
    <h2 className="head">This is the Heading </h2>
    {desc} 
    {/* whatever you will write in curly braces jsx will take care of it */}
    </div>
)}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Heading/>);
