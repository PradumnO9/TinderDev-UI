import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age || "");
  const [about, setAbout] = useState(user?.about || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [imageUrl, setImageUrl] = useState(user?.imageUrl);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const isProfilePage = true;

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
    <div className="md:flex md:justify-center my-10">
      <div className="flex justify-center mx-10">
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
              <div className="label">
                <span className="label-text">Gender</span>
                <label className="form-control w-full max-w-xs">
                  <input
                    type="radio"
                    name="radio-12"
                    value="male"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                    className="radio bg-blue-100 border-blue-300 checked:bg-blue-200 checked:text-blue-600 checked:border-blue-600"
                  />
                  <div className="label mx-2">
                    <span className="label-text">Male</span>
                  </div>
                </label>
                <label>
                  <input
                    type="radio"
                    name="radio-12"
                    value="female"
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                    className="radio bg-pink-100 border-pink-300 checked:bg-pink-200 checked:text-pink-500 checked:border-pink-500"
                  />
                  <div className="label mx-2">
                    <span className="label-text">Female</span>
                  </div>
                </label>
                <label>
                  <input
                    type="radio"
                    name="radio-12"
                    value="other"
                    checked={gender === "other"}
                    onChange={(e) => setGender(e.target.value)}
                    className="radio bg-purple-100 border-purple-300 checked:bg-purple-200 checked:text-purple-600 checked:border-purple-600"
                  />
                  <div className="label mx-2">
                    <span className="label-text">Other</span>
                  </div>
                </label>
              </div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="textarea h-24"
                  placeholder="Bio"
                ></textarea>
              </fieldset>
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
      <div className="flex justify-center my-4">
        <UserCard
          user={{ firstName, lastName, age, gender, imageUrl, about }}
          isProfilePage={isProfilePage}
        />
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

export default EditProfile;
