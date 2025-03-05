import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../redux/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const userFeed = useSelector((store) => store.feed);

  const getFeed = async () => {
    if (userFeed) {
      return;
    } else {
      try {
        const res = await axios.get(`${BASE_URL}/user/feed`, {
          withCredentials: true,
        });
        dispatch(addFeed(res.data.data));
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!userFeed) return;

  if (userFeed.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="font-bold text-2xl">No New User Found!</h1>
      </div>
    );
  }

  return (
    userFeed && (
      <div className="flex justify-center my-10 flex-wrap">
        <UserCard user={userFeed[0]} />
      </div>
    )
  );
};

export default Feed;
