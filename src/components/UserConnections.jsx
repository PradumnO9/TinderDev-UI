import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../redux/connectionsSlice";
import { Link } from "react-router-dom";

const UserConnections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="font-bold text-2xl">No Connections Found!</h1>
      </div>
    );
  }

  return (
    <div className="my-10">
      <h1 className="text-center font-bold text-2xl my-4">Connections</h1>

      {connections.map((connection) => {
        const {
          _id,
          firstName,
          lastName,
          imageUrl,
          age,
          gender,
          about,
          skills,
        } = connection;
        return (
          <div
            key={_id}
            className="flex justify-center my-2 hover:opacity-80 cursor-pointer"
          >
            <ul className="list bg-base-300 rounded-box shadow-md w-[95%] md:w-[70%]">
              <li className="list-row">
                <div>
                  <img
                    className="size-16 rounded-box"
                    src={imageUrl}
                    alt="image"
                  />
                </div>
                <div>
                  <div>{firstName + " " + lastName}</div>
                  {age && gender && (
                    <div className="text-xs uppercase font-semibold opacity-60">
                      {age + ", " + gender}
                    </div>
                  )}
                </div>
                {about && <p className="list-col-wrap text-xs">{about}</p>}
                <Link to={`/chat/${_id}`}>
                  <button className="btn btn-secondary">Chat</button>
                </Link>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default UserConnections;
