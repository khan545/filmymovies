import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { addDoc } from "firebase/firestore";
import { moviesRef } from "../firebase/Firebase";
import swal from "sweetalert";
const Addmovie = () => {
  const [form, setForm] = useState([
    {
      title: "",
      year: "",
      discription: "",
      image: "",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const addmovies = async () => {
    setLoading(true);
    try {
      await addDoc(moviesRef, form);
      swal({
        title: "successfully Added",
        icon: "success",
        button: "false",
        timer: 3000,
      });
    } catch (err) {
      swal({
        title: err,
        icon: "error",
        button: "false",
        timer: 3000,
      });
    }
    setLoading(false);
  };
  return (
    <div>
      <section className="text-white-600 body-font relative">
        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-col text-center w-full mb-4">
            <h1 className="sm:text-3xl text-2xl text-blue font-medium title-font mb-4 text-white-900">
              Add New Movie
            </h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    for="name"
                    className="leading-7 text-sm text-white-600"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className="w-full bg-white-100  rounded border border-white-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    for="email"
                    className="leading-7 text-sm text-white-600"
                  >
                    Years
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    className="w-full bg-white-100  rounded border border-white-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    for="email"
                    className="leading-7 text-sm text-white-600"
                  >
                    Image Link
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.image}
                    onChange={(e) =>
                      setForm({ ...form, image: e.target.value })
                    }
                    className="w-full bg-white-100  rounded border border-white-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    for="message"
                    className="leading-7 text-sm text-white-600"
                  >
                    Discription
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.discription}
                    onChange={(e) =>
                      setForm({ ...form, discription: e.target.value })
                    }
                    className="w-full bg-white-100  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  onClick={addmovies}
                  className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  {loading ? (
                    <TailSpin height={25} color={"white"} />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Addmovie;
