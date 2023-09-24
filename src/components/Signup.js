import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  getAuth,
} from "firebase/auth";
import app from "../firebase/Firebase";
import swal from "sweetalert";
import { TailSpin } from "react-loader-spinner";
import { addDoc } from "firebase/firestore";
import { userRef } from "../firebase/Firebase";
import bcrypt from "bcryptjs";

const auth = getAuth(app);
const SignUp = () => {
  const nevigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [otpsent, setOtpsent] = useState(false);
  const [otp, setOtp] = useState();

  const generateRecaptha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      auth
    );
  };
  const requestOtp = () => {
    setLoading(true);
    generateRecaptha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        swal({
          text: "OTP Sent",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        setOtpsent(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const verifyOtp = () => {
    try {
      setLoading(true);
      window.confirmationResult.confirm(otp).then((result) => {
        upLoadData();
        swal({
          text: "Succesfully Registred",
          icons: "success",
          buttons: "false",
          timer: "3000",
        });
        nevigate("/login");
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const upLoadData = async () => {
    try {
      const salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(form.password, salt);
      await addDoc(userRef, {
        name: form.name,
        password: hash,
        mobile: form.mobile,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="pt-2 font-bold text-white-700">SignUp</h2>
      {otpsent ? (
        <>
          <div className="relative w-full md:w-1/3">
            <label for="email" className="leading-7 text-sm text-white-600">
              OPT
            </label>
            <input
              id="number"
              name="number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full bg-white-100  rounded border border-white-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="p-2 w-full">
            <button
              onClick={verifyOtp}
              className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              {loading ? (
                <TailSpin height={30} color="white" />
              ) : (
                " Confrim OPT"
              )}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="relative w-full md:w-1/3">
            <label for="email" className="leading-7 text-sm text-white-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-white-100  rounded border border-white-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative w-full md:w-1/3">
            <label for="email" className="leading-7 text-sm text-white-600">
              Mobile Number
            </label>
            <input
              type="number"
              id="number"
              name="number"
              value={form.mobile}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              className="w-full bg-white-100  rounded border border-white-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative w-full md:w-1/3">
            <label for="email" className="leading-7 text-sm text-white-600">
              Password
            </label>
            <input
              type={"password"}
              id="password"
              name="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full bg-white-100  rounded border border-white-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="p-2 w-full">
            <button
              onClick={requestOtp}
              className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              {loading ? (
                <TailSpin height={25} color="white" />
              ) : (
                " Request OTP"
              )}
            </button>
          </div>
        </>
      )}

      <div>
        <p>
          Already have account
          <Link to={"/login"}>
            <span className="text-blue-500 pl-2">Login</span>
          </Link>
        </p>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default SignUp;
