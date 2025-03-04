import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age);
  const [about, setAbout] = useState(user?.about);
  const [gender, setGender] = useState(user?.gender);
  const [imageUrl, setImageUrl] = useState(user?.imageUrl);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const updateProfile = async () => {
    setErrorMessage("");
    try {
      const res = await axios.put(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, age, gender, imageUrl, about },
        { withCredentials: true }
      );
      setSuccessMessage(res?.data?.message);
      setShowToast(true);
      dispatch(addUser(res.data.data));
      setTimeout(() => {
        setSuccessMessage("");
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setErrorMessage(err?.response?.data || "Something Went Wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center my-10 mx-10">
        <div className="card card-border bg-base-300 w-96">
          <div className="card-body">
            <h2 className="card-title text-3xl justify-center">
              Update Profile
            </h2>
            <div className="py-2">
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
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Image URL</span>
                </div>
                <input
                  type="text"
                  value={imageUrl}
                  className="input input-bordered w-full max-w-xs my-2"
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Age</span>
                </div>
                <input
                  type="text"
                  value={age}
                  className="input input-bordered w-full max-w-xs my-2"
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Gender</span>
                </div>
                <input
                  type="text"
                  value={gender}
                  className="input input-bordered w-full max-w-xs my-2"
                  onChange={(e) => setGender(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">About</span>
                </div>
                <input
                  type="text"
                  value={about}
                  className="input input-bordered w-full max-w-xs my-2"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>
            </div>
            {errorMessage && (
              <span className="text-red-500 mb-2">{errorMessage}</span>
            )}
            <div className="card-actions">
              <button
                className="btn btn-primary w-[96%] text-lg"
                onClick={updateProfile}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, age, gender, imageUrl, about }} />
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            {successMessage && (
              <span className="text-white mb-2">{successMessage}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
