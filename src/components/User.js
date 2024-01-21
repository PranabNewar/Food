import { useEffect, useState } from "react";

const User =({name,location})=>{

    useEffect(()=>{
     const timer=   setInterval(()=>{
            console.log("interval")
        },1000)

        return ()=>{   // here return will clear the component
            clearInterval(timer)
        }
    },[])
    const [count] = useState(0)
    return(
        <div className="user-func">
            <h1>User using Function</h1>
            <h2>Count: {count}</h2>

            <h2>{name}</h2>
            <h2>{location}</h2>

            </div>
    )
}

export default User;