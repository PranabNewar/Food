// import { useEffect, useState } from "react";
// import { generateProxyUrl } from "../utils/constants";

// const GetLocation = () => {
//   const [query, setQuery] = useState("");
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       getData();
//     }, 200);
//     return () => {
//       clearTimeout(timer);
//     };
//     // getData()
//   }, [query]);
//   //   console.log(query);

//   async function getData() {
//     // console.log(e);
//     const resource = generateProxyUrl(
//       "https://www.swiggy.com/dapi/misc/place-autocomplete?input=" + query
//     );
//     const data = await fetch(resource);
//     const json = await data.json();
//     console.log(json.data, "data");
//   }
//   return (
//     <div>
//       <input
//         className="border-black mt-6  p-2"
//         placeholder="Search"
//         onChange={(e) => setQuery(e.target.value)}
//       ></input>
//     </div>
//   );
// };
// export default GetLocation;
