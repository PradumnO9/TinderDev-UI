import axios from "axios";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser, removeUser } from "../redux/userSlice";
import { clearFeed } from "../redux/feedSlice";
import { createSocketConnection } from "../utils/socket";

const NavBar = () => {
  const loggedInUser = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUserId = loggedInUser?._id;

  useEffect(() => {
    const user = localStorage.getItem("user");
    dispatch(addUser(JSON.parse(user)));
  }, []);

  useEffect(() => {
    if (!loggedInUserId) return;
    const socket = createSocketConnection();
    socket.emit("loggedIn", { loggedInUserId });

    return () => {
      socket.disconnect();
    };
  }, [loggedInUserId]);

  const statusOffline = () => {
    if (!loggedInUserId) return;
    const socket = createSocketConnection();
    socket.emit("loggedOut", { loggedInUserId });
  };

  const token = Cookies.get("token");

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      statusOffline();
      dispatch(removeUser());
      dispatch(clearFeed());
      localStorage.clear();
      return navigate("/auth");
    } catch (err) {
      // Error redirect to login page
      console.error(err);
    }
  };

  return (
    <div className="navbar bg-base-200 shadow-sm">
      {token ? (
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            TinderDev
          </Link>
        </div>
      ) : (
        <div className="flex-1 flex justify-between">
          <p className="btn btn-ghost text-xl">TinderDev</p>
          <div>
            <Link to="/auth" className="btn btn-ghost text-xl">
              Login
            </Link>
            <div className="dropdown dropdown-end mx-4">
              <div tabIndex={0} role="button" className="btn btn-ghost">
                <div className="w-10 text-xl">
                  <p>About</p>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/pages/privacy-policy" className="link link-hover">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pages/terms-and-conditions"
                    className="link link-hover"
                  >
                    Terms and Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/pages/refund-policy" className="link link-hover">
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link to="/pages/contact-us" className="link link-hover">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      {token && (
        <div className="flex gap-2">
          <div className="form-control">Welcome, {loggedInUser?.firstName}</div>
          <div className="dropdown dropdown-end mx-4">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar avatar-online"
            >
              <div className="w-10 rounded-full">
                <img alt="Profile Picture" src={loggedInUser?.imageUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/">Feed</Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <Link to="/premium">Premium</Link>
              </li>
              <li>
                <p onClick={handleLogout}>Logout</p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
