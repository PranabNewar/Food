import { useRef, useState } from "react";
import { checkValidData } from "../utils/validate";

const Login = () => {
  const [error, setError] = useState("");
  const email = useRef(null);
  const password = useRef(null);
  function handleButtonClick() {
    const errMessage = checkValidData(
      email.current.value,
      password.current.value
    );
    setError(errMessage);
  }
  return (
    <div>
      <form
        className="w-[300px] h-[300px] p-5 mx-auto bg-slate-50 border-black shadow-md rounded-md"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h1 className="font-semibold text-lg">Sign In</h1>
        <input
          ref={email}
          className="block py-3  w-full px-1 mx-auto my-4 outline-none "
          type="text"
          placeholder=" Enter email"
        />
        <input
          ref={password}
          className="block mx-auto w-full py-3 my-4 outline-none rounded-md"
          type="password"
          placeholder=" Enter password"
        />
        <p className="text-red-400 text-xs p-1 ">{error}</p>
        {/* <div className="mx-auto w-40"> */}
        <button
          onClick={handleButtonClick}
          className="mx-auto mt-3 bg-green-300 w-full py-2 px-2 rounded-md"
        >
          {" "}
          Sign In
        </button>
        {/* </div> */}
      </form>
    </div>
  );
};
export default Login;
