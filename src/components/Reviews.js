import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { reviewRef, db } from "../firebase/Firebase";
import {
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import swal from "sweetalert";
const Reviews = ({ id, prevReating, userReated }) => {
  const [reating, setReating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState("");
  const [data, setData] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(false);
  const sendReview = async () => {
    try {
      setLoading(true);
      await addDoc(reviewRef, {
        movieid: id,
        name: "wasim perwez",
        reating: reating,
        thought: form,
        timestamp: new Date().getTime(),
      });
      const ref = doc(db, "movies", id);
      await updateDoc(ref, {
        reating: prevReating + reating,
        reated: userReated + 1,
      });
      setReating(0);
      setForm("");
      swal({
        title: "Review Shared",
        icon: "success",
        button: "false",
        timer: 3000,
      });
    } catch (error) {
      swal({
        title: "error.message",
        icon: "error",
        button: "false",
        timer: 3000,
      });
    }
    setLoading(false);
  };
  useEffect(() => {
    async function getData() {
      setReviewLoading(true);
      let quer = query(reviewRef, where("movieid", "==", id));
      const querySnapshot = await getDocs(quer);
      querySnapshot.forEach((doc) => {
        setData((prev) => [...prev, doc.data()]);
      });

      setReviewLoading(false);
    }
    getData();
  }, []);
  return (
    <div className="mt-4 w-full py-2 border-t-2 border-gray-700">
      <ReactStars
        size={20}
        half={true}
        value={reating}
        onChange={(reat) => setReating(reat)}
      />
      <input
        value={form}
        onChange={(e) => setForm(e.target.value)}
        type="text"
        placeholder="Share your thoughts"
        className="w-full outline-none bg-gray-500 p-2 m-1"
      />
      <button
        onClick={sendReview}
        className="bg-green-600 w-full flex justify-center items-center p-1 m-1"
      >
        {loading ? <TailSpin height={30} color="white" /> : "Share"}
      </button>

      {reviewLoading ? (
        <div className="mt-6 flex justify-center">
          <ThreeDots height={10} color="white" />
        </div>
      ) : (
        <div className="mt-4">
          {data.map((e, i) => {
            return (
              <div
                className=" p-2 w-full border-b header bg-opacity-50 border-gray-600 mt-2"
                key={i}
              >
                <div className="flex items-center">
                  <p className="text-blue-500">{e.name}</p>
                  <p className="ml-3 text-xs">
                    ({new Date(e.timestamp).toLocaleString()})
                  </p>
                </div>
                <ReactStars
                  size={15}
                  half={true}
                  value={e.reating}
                  edit={false}
                />

                <p>{e.thought}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Reviews;
