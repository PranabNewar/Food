import { Component } from "react";
import User from "./User";
import UserClass from "./UserClass";


class Aboutus extends Component{
constructor(props){
    super(props)
    console.log("Parent Constructor")

}
componentDidMount(){
    console.log("Parent component did mount")
    //make  an api calls
  }
    render()
    {
    console.log("Parent render")
    
    
 
        return(
        <div className="about-container">
            <h1>ABout us page</h1>
            <UserClass name ={"first Newar class()"} location={"Guwahati,Assam"}/>
            <User name ={"second Newar class()"} location={"Rowmari,Assam"}/>
           
            {/* <User name = {"Pranab Newar func()"} location={"Guwahati,Assam"}/> */}
        </div>
        )
    }
}



//  const Aboutus =()=>{

//     return(
//         <div className="about-container">
//             <h1>ABout us page</h1>
//             <UserClass name ={"Pranab Newar class()"} location={"Guwahati,Assam"}/>
//             {/* <User name = {"Pranab Newar func()"} location={"Guwahati,Assam"}/> */}
//         </div>
//     )
//  }
 export default Aboutus;
