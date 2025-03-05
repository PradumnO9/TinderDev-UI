import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../redux/feedSlice";

const UserCard = ({ user, isProfilePage }) => {
  const dispatch = useDispatch();

  const handleSendRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={user?.imageUrl} alt="profle picture" />
        </figure>
        <div className="card-body overflow-auto">
          <h2 className="card-title">
            {user?.firstName + " " + user?.lastName}
          </h2>
          {user?.age && <p>{user?.age}</p>}
          {user?.gender && <p>{user?.gender}</p>}
          <p>{user?.about}</p>
          {!isProfilePage && (
            <div className="card-actions justify-center">
              <button
                className="btn btn-primary"
                onClick={() => handleSendRequest("ignored", user._id)}
              >
                Ignore
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleSendRequest("interested", user._id)}
              >
                Interested
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
