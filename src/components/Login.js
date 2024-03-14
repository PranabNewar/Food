import { useRef, useState } from "react";
import { checkValidData } from "../utils/validate";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/redux/modalSlice";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import Google from "../assets/svg/google.svg";
import { addDoc, collection } from "firebase/firestore";
import { storeDataInFire } from "../utils/storeUserDataInFire";

const Login = ({ isModalOpen }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();
  async function handleButtonClick() {
    const errMessage = checkValidData(
      email.current.value,
      password.current.value
    );
    if (errMessage) return;
    if (!isSignUp) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // ...
         storeDataInFire(user)
          console.log(user, "signedup user new");
          console.log(user);
          setIsSignUp(true);
          dispatch(toggleMenu(false));
        })
        // .then((userDetails) => {
        //   const user = userCredential.user;
        //   addDoc(collection(db, "Users"), {
        //     user_id: user.uid,
        //     name: user.displayName,
        //     email: user.email,
        //   });
        //   console.log(userDetails, "details");
        // })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorCode + ":" + errorMessage);
          // ..
        });
      // const userRef = await
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          dispatch(toggleMenu(false));
          navigate("/");
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorCode + ":" + errorMessage);
        });
    }

    setError(errMessage);
  }
  function handleGoogleSignUp() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        storeDataInFire(user);
        console.log(user, "google");
        navigate("/");
        dispatch(toggleMenu(false));
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        setError(errorCode + ":" + errorMessage + ":" + email);
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  if (!isModalOpen) {
    return;
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm ">
      <form
        className="w-[350px]  p-5  mx-auto mt-40  bg-slate-50 border-black shadow-md rounded-md"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex justify-between">
          <h1 className="font-semibold text-lg">
            {isSignUp ? "Sign In" : "Sign Up"}
          </h1>{" "}
          <p
            className="cursor-pointer"
            onClick={(e) => dispatch(toggleMenu(false))}
          >
            {" "}
            ❌
          </p>
        </div>
        {!isSignUp && (
          <input
            // ref={name}
            className="block py-3  w-full px-1 mx-auto my-4 outline-none "
            type="text"
            placeholder="Name"
          />
        )}
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
          {isSignUp ? "Sign In" : "Sign Up"}
        </button>
        <button
          className="mx-auto mt-3 bg-green-300 w-full py-2 px-2 rounded-md"
          onClick={handleGoogleSignUp}
        >
          Sign in with <img src={Google} className="w-4 inline-block" />
        </button>
        <p
          className="py-4 text-xs cursor-pointer"
          onClick={(e) => setIsSignUp(!isSignUp)}
        >
          {" "}
          {isSignUp
            ? "Don't have an account?Sign up here"
            : "Already have an Account? Sign In now"}
        </p>
        {/* </div> */}
      </form>
    </div>
  );
};
export default Login;
