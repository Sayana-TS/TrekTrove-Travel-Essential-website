import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../Firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { setUser } from "../store/Slices/authSlice";
import { showToast } from "../store/Slices/toastSlice"; // ✅ toast

// Define admin email once at the top
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL.toLowerCase();

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      dispatch(showToast({ message: "Please fill in all fields.", type: "error" }));
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const role = user.email.toLowerCase() === ADMIN_EMAIL ? "admin" : "user";

      // Ensure Firestore has this user
      const userRef = doc(db, "Users", user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          fullName: user.displayName || "",
          email: user.email,
          role,
          createdAt: serverTimestamp(),
        });
      }

      // Resolve display name
      let fullName = user.displayName || "";
      if (userSnap.exists()) {
        fullName = userSnap.data().fullName || fullName;
      }

      // Save user in Redux
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          fullName,
          role,
        })
      );

      // ✅ success toast
      dispatch(showToast({ message: "Login successful!", type: "success" }));

      // Redirect based on role
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      // ✅ error toast
      dispatch(showToast({ message: err.message || "Login failed.", type: "error" }));
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

        {/* <div className="text-center mb-2 text-sm text-gray-400">
          Or log in with
        </div>

        <div className="flex gap-4">
          <button className="w-full bg-white text-black py-2 rounded flex items-center justify-center gap-2 cursor-pointer hover:bg-[#e6ebe4]">
            <FcGoogle size={22} /> Google
          </button>
          <button className="w-full bg-white text-black py-2 rounded flex items-center justify-center gap-2 cursor-pointer hover:bg-[#e6ebe4]">
            <FaApple size={22} /> Apple
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
