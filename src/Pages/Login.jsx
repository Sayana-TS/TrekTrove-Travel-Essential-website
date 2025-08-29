import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../Firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { setUser } from "../store/Slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // fetch Firestore user data
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      let fullName = user.displayName || "";
      if (docSnap.exists()) {
        fullName = docSnap.data().fullName || fullName;
      }

      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          fullName,
        })
      );

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#282928] p-4">
      <div className="w-1/2 relative hidden md:block">
        <img
          src="https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg"
          alt="Travel background"
          className="w-screen h-screen object-cover"
        />
        <div className="absolute bottom-10 left-6 text-white text-xl font-semibold">
          Capturing Moments, <br /> Creating Memories
        </div>
      </div>

      <div className="w-full md:w-1/2 p-8 text-white">
        <h2 className="text-3xl font-bold mb-4">Log In to your account</h2>
        <p className="mb-6 text-sm text-gray-300">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-[#1d1f23] p-3 rounded w-full mb-4"
          placeholder="Email"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-[#1d1f23] p-3 rounded w-full mb-4"
          placeholder="Enter your password"
        />

        <div className="flex items-center gap-2 mb-4">
          <input type="checkbox" />
          <p className="text-sm">
            <span>Remember me</span>
          </p>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-[#606b57] transition text-white py-3 rounded mb-4 cursor-pointer"
        >
          Log In
        </button>

        <div className="text-center mb-2 text-sm text-gray-400">
          Or log in with
        </div>

        <div className="flex gap-4">
          <button className="w-full bg-white text-black py-2 rounded flex items-center justify-center gap-2 cursor-pointer hover:bg-[#e6ebe4]">
            <FcGoogle size={22} /> Google
          </button>
          <button className="w-full bg-white text-black py-2 rounded flex items-center justify-center gap-2 cursor-pointer hover:bg-[#e6ebe4]">
            <FaApple size={22} /> Apple
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
