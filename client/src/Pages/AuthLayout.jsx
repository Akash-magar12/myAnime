import React from "react";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import Login from "./Login";
import Signup from "./Signup";

const AuthLayout = () => {
  const { isLogin } = useSelector((store) => store.toggle);

  return (
    <div className="">
      <ToastContainer position="top-right" autoClose={1000} />
      {isLogin ? <Login /> : <Signup />}
    </div>
  );
};

export default AuthLayout;
