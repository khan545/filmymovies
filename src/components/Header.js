import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AppSate } from "../App";

const Header = () => {
  const useAppsate = useContext(AppSate);
  return (
    <div className="sticky top-0 z-10 bgColor text-3xl flex justify-between items-center cursor-pointer text-red-500 font-bold p-3 border-b-2 border-gray-200">
      <Link to={"/"}>
        <span>
          Filmy <span className="text-white">Verse</span>
        </span>
      </Link>
      {useAppsate.login ? (
        <Link to={"/addmovie"}>
          <h5 className="text-lg text-white">
            <Button>
              <AddIcon className="mr-2" color="inhirt" />
              <span className="text-white">Add New</span>
            </Button>
          </h5>
        </Link>
      ) : (
        <Link to={"/login"}>
          <h5 className="text-lg bg-slate-600 text-white">
            <Button>
              <span className="text-white">Login</span>
            </Button>
          </h5>
        </Link>
      )}
    </div>
  );
};

export default Header;
