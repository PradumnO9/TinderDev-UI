import React from "react";

const UserCard = ({ user }) => {
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
          <div className="card-actions justify-center">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
