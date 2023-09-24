import React, { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import ReactStars from "react-stars";
import { getDocs } from "firebase/firestore";
import { moviesRef } from "../firebase/Firebase";
import { Link } from "react-router-dom";
const Cards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _data = await getDocs(moviesRef);
      _data.forEach((doc) => {
        setData((pre) => [...pre, { ...doc.data(), id: doc.id }]);
      });
      setLoading(false);
    }
    getData();
  }, []);
  return (
    <div className="flex flex-wrap justify-between p-3 mt-3">
      {loading ? (
        <div className="w-full flex justify-center items-center min-h-screen">
          <ThreeCircles height={40} color="white" />
        </div>
      ) : (
        data.map((e, i) => {
          return (
            <Link to={`/detail/${e.id}`}>
              <div
                key={i}
                className="card shadow-lg p-2 font-bold cursor-pointer mt-6 hover:-translate-y-2 transition-all duration-300"
              >
                <img className="h-72" src={e.image} alt="movie" />
                <h1>
                  <span className="text-gray-500">Name:</span>
                  {e.title}
                </h1>
                <h1>
                  <span className="text-gray-500">Rating:</span>
                  <ReactStars
                    size={20}
                    half={true}
                    value={e.reating / e.reated}
                    edit={false}
                  />
                </h1>
                <h1>
                  <span className="text-gray-500">Year:</span> {e.year}
                </h1>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default Cards;
