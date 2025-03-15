import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [eyeToggle, setEyeToggle] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMessage("");
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/login`,
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(response.data.data));
      localStorage.setItem("user", JSON.stringify(response.data.data));
      return navigate("/");
    } catch (err) {
      setErrorMessage(err?.response?.data || "Something Went Wrong!");
    }
  };

  const handleRegisterUser = async () => {
    setErrorMessage("");
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/signup`,
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      setSuccessMessage(`${res.data.message} Now, Please Login`);
      setShowToast(true);
      setTimeout(() => {
        setSuccessMessage("");
        setShowToast(false);
      }, 5000);
      setIsLoginForm(!isLoginForm);
    } catch (err) {
      setErrorMessage(err?.response?.data || "Something Went Wrong!");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title text-3xl justify-center">
            {isLoginForm ? "Login" : "Register User"}
          </h2>
          <div className="py-2">
            {!isLoginForm && (
              <>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs my-2"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs my-2"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </>
            )}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input
                type="text"
                value={emailId}
                className="input input-bordered w-full max-w-xs my-2"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <div className="flex items-center">
                <input
                  type={`${eyeToggle ? "text" : "password"}`}
                  value={password}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {eyeToggle ? (
                  <FaRegEye
                    size={25}
                    className="absolute cursor-pointer m-[75%] z-10"
                    onClick={() => setEyeToggle(!eyeToggle)}
                  />
                ) : (
                  <FaRegEyeSlash
                    size={25}
                    className="absolute cursor-pointer m-[75%] z-10"
                    onClick={() => setEyeToggle(!eyeToggle)}
                  />
                )}
              </div>
            </label>
          </div>
          {errorMessage && (
            <span className="text-red-500 mb-2">{errorMessage}</span>
          )}
          <div className="card-actions">
            <button
              className="btn btn-primary w-[96%] text-lg"
              onClick={isLoginForm ? handleLogin : handleRegisterUser}
            >
              {isLoginForm ? "Login" : "Register User"}
            </button>
          </div>
          {isLoginForm ? (
            <p
              className="cursor-pointer flex justify-end mx-3 mt-2"
              onClick={() => setIsLoginForm((value) => !value)}
            >
              Click here to Register
            </p>
          ) : (
            <p
              className="cursor-pointer flex justify-end mx-3 mt-2"
              onClick={() => setIsLoginForm((value) => !value)}
            >
              Click here to login
            </p>
          )}
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            {successMessage && (
              <span className=" font-bold mb-2">{successMessage}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
