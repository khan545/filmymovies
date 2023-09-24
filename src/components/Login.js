import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { query, where, getDocs } from "firebase/firestore";
import { userRef } from "../firebase/Firebase";
import { bcrypt } from "bcryptjs";
import { AppSate } from "../App";
import swal from "sweetalert";

const Login = () => {
  const AppContext = useContext(AppSate);
  const nevigate = useNavigate();
  const [form, setForm] = useState({
    mobile: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      const quer = query(userRef, where("mobile", "==", form.mobile));
      const querySnapshot = await getDocs(quer);
      querySnapshot.forEach((doc) => {
        const _data = doc.data();
        const isUser = bcrypt.compareSync(form.password, _data.password);
        if (isUser) {
          AppContext.setLogin(true);
          AppContext.setUserName(_data.name);

          swal({
            title: "Login",
            icon: "success",
            button: "false",
            timer: 3000,
          });
          nevigate("/");
        } else {
          swal({
            title: "User Invalid",
            icon: "error",
            button: "false",
            timer: 3000,
          });
        }
      });
    } catch (error) {
      swal({
        title: "error.message",
        icon: "error",
        button: "false",
        timer: 3000,
      });
      setLoading(false);
    }
  };
  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="pt-2 font-bold text-white-700">Login</h2> <br />
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
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full bg-white-100  rounded border border-white-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="p-2 w-full">
        <button
          onClick={login}
          className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          {loading ? <TailSpin height={30} color="white" /> : ""}
        </button>
      </div>
      <div>
        <p>
          Do not have account?{" "}
          <Link to={"/signup"}>
            <span className="text-blue-500">SignUp</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
