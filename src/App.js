import Cards from "./components/Cards";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Addmovie from "./components/Addmovie";
import Detail from "./components/Detail";
import { createContext, useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";

const AppSate = createContext();
function App() {
  const [userName, setUserName] = useState("");
  const [login, setLogin] = useState(false);
  return (
    <AppSate.Provider value={{ userName, login, setLogin, setUserName }}>
      <div className="reletive">
        <Header />
        <Routes>
          <Route path="/" element={<Cards />} />
          <Route path="/addmovie" element={<Addmovie />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </AppSate.Provider>
  );
}

export default App;
export { AppSate };
