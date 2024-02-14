import { useEffect, useState } from "react";
import LocationContext from "./LocationContext";

const LocationContextProvider = ({children})=>{
const [location,setLocation] = useState(null)
const [locationDetails, setLocationDetails] = useState();
const [dataFromLocal,setDatafromLocal] = useState()
useEffect(()=>{
    if(locationDetails)
    localStorage.setItem("address:", JSON.stringify(locationDetails));

},[locationDetails])
useEffect(()=>{
    const storedData = JSON.parse(localStorage.getItem("address:"));
    if (storedData) {
        setDatafromLocal(storedData);
    }
},[location])
return (
    <LocationContext.Provider value={{location,setLocation,setLocationDetails,dataFromLocal}}>
        {children}
    </LocationContext.Provider>
)
}
export default LocationContextProvider;