import React from "react";
class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  //here state is the huge object itself
      count: 0,
    };
    console.log(this.props.name,"child constructor")

  }
  componentDidMount(){
//     this.timer = setInterval(()=>{
// console.log("set interval called")
//     },1000)

  
    
    // console.log(this.props.name,"child component did mount")
  }
  componentWillUnmount(){ // here componentWillMount will clear the component  
    
// clearInterval(this.timer)
  }
  render() {
    const { name, location } = this.props;
    const {count} = this.state;
    console.log(name,"child Render")

    return (
      <div className="user-class ">
        <h1>User using Class</h1>
        <h2>{name}</h2>
        <h2>Count {count}</h2>
        <button onClick={()=>{
this.setState({
  count: this.state.count+1,
})

        }}>count increase</button>
       


        <h2>{location}</h2>
      </div>
    );
  }
}
export default UserClass;
