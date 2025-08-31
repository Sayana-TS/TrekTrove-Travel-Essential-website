import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../Firebase/firebaseConfig";
import { setUser } from "../store/Slices/authSlice";
import { showToast } from "../store/Slices/toastSlice"; // ✅ import toast

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      dispatch(showToast({ message: "Passwords do not match!", type: "error" }));
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      const fullName = `${firstName} ${lastName}`.trim();

      await updateProfile(auth.currentUser, {
        displayName: fullName,
      });

      // Firestore Users collection
      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL.toLowerCase();
      const role = user.email.toLowerCase() === adminEmail ? "admin" : "user";

      await setDoc(doc(db, "Users", user.uid), {
        fullName,
        email: user.email,
        role,
        createdAt: serverTimestamp(),
      });

      // Redux store
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: fullName,
        })
      );

      // ✅ success toast
      dispatch(showToast({ message: "Registration successful! Please log in.", type: "success" }));

      navigate("/login");
    } catch (err) {
      console.error(err);
      dispatch(
        showToast({ message: err.message || "Registration failed.", type: "error" })
      );
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#282928] p-4">
      {/* Left - Background with image */}
      <div className="w-1/2 relative hidden md:block">
        <img
          src="https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?cs=srgb&dl=pexels-freestockpro-3278215.jpg&fm=jpg"
          alt="Travel background"
          className="w-screen h-screen object-cover"
        />
        <div className="absolute bottom-10 left-6 text-white text-xl font-semibold">
          Capturing Moments, <br /> Creating Memories
        </div>
      </div>

      {/* Right - Register Form */}
      <div className="w-full md:w-1/2 p-8 text-white">
        <h2 className="text-3xl font-bold mb-4">Create an account</h2>
        <p className="mb-6 text-sm text-gray-300">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="underline cursor-pointer"
          >
            Log in
          </span>
        </p>

        <div className="flex gap-3 mb-4">
          <input
            type="text"
            className="bg-[#1d1f23] p-3 rounded w-full"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            className="bg-[#1d1f23] p-3 rounded w-full"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <input
          type="email"
          className="bg-[#1d1f23] p-3 rounded w-full mb-4"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="bg-[#1d1f23] p-3 rounded w-full mb-4"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          className="bg-[#1d1f23] p-3 rounded w-full mb-4"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <div className="flex items-center gap-2 mb-4">
          <input type="checkbox" />
          <p className="text-sm">
            I agree to the{" "}
            <span className="underline cursor-pointer">
              Terms & Conditions
            </span>
          </p>
        </div>

        <button
          className="w-full bg-[#606b57] transition text-white py-3 rounded mb-4 cursor-pointer"
          onClick={handleRegister}
        >
          Create account
        </button>

        <div className="text-center mb-2 text-sm text-gray-400">
          Or register with
        </div>

        <div className="flex gap-4">
          <button className="w-full bg-white text-black py-2 rounded flex items-center justify-center gap-2 cursor-pointer hover:bg-[#e6ebe4] transition-colors duration-300 ease-in-out">
            <FcGoogle size={22} /> Google
          </button>
          <button className="w-full bg-white text-black py-2 rounded flex items-center justify-center gap-2 cursor-pointer hover:bg-[#e6ebe4] transition-colors duration-300 ease-in-out">
            <FaApple size={22} /> Apple
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
