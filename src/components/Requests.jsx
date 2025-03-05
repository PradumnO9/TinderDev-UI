import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../redux/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();

  const requests = useSelector((store) => store.requests);

  const fetchConnectionRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnectionRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="font-bold text-2xl">No Pending Requests Found!</h1>
      </div>
    );
  }

  return (
    <div className="my-10">
      <h1 className="text-center font-bold text-2xl my-4">
        Connection Requests
      </h1>

      {requests.map((request) => {
        const {
          _id,
          firstName,
          lastName,
          imageUrl,
          age,
          gender,
          about,
          skills,
        } = request.fromUserId;
        return (
          <div key={_id} className="flex justify-center my-2">
            <ul className="list bg-base-300 rounded-box shadow-md w-[95%] md:w-[50%]">
              <li className="list-row">
                <div>
                  <img className="size-10 rounded-box" src={imageUrl} />
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
                <div className="card-actions justify-center">
                  <button
                    className="btn bg-green-600 cursor-pointer hover:opacity-80"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn bg-red-600 cursor-pointer hover:opacity-80"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                </div>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
