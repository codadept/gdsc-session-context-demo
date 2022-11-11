import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "./global/auth/auth-context";

import Navbar from "./Components/Navbar";

import Login from "./Pages/Login";
import Home from "./Pages/Home";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {!authCtx.user?.id ? (
          <Route path="/login" element={<Login />} />
        ) : (
          <Route path="/login" element={<Navigate to={"/"} />} />
        )}
      </Routes>
    </>
  );
}

export default App;
