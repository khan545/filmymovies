import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { useParams } from "react-router-dom";
import { db } from "../firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { Bars } from "react-loader-spinner";
import Reviews from "./Reviews";

const Detail = () => {
  const [data, setData] = useState({
    title: "",
    image: "",
    yaer: "",
    discription: "",
    reating: 0,
    reated: 0,
  });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _doc = doc(db, "movies", id);
      const _data = await getDoc(_doc);
      setData(_data.data());
      setLoading(false);
    }
    getData();
  }, []);
  return (
    <div className="p-4 mt-2 flex flex-col md:flex-row w-full justify-left ">
      {loading ? (
        <div className="flex flex-col md:flex-row w-full justify-center items-center">
          <Bars height={50} color="white" />
        </div>
      ) : (
        <>
          <img
            src={data.image}
            className="h-96 block md:sticky top-2"
            alt="Details"
          />
          <div className="ml-4 w- 1/2">
            <h1 className="text-2xl font-bold text-gray-500">
              Name: {data.title} <span>{data.yaer}</span>
            </h1>
            <span>
              <ReactStars
                size={20}
                half={true}
                value={data.reating / data.reated}
                edit={false}
              />
            </span>
            <p className="text-gray-200">{data.discription}</p>

            <Reviews
              id={id}
              prevReating={data.reating}
              userReated={data.reated}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;
