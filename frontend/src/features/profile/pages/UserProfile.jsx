import React from "react";
import LumenGlow from "../../shared/components/LumenGlow";
import { useNavigate } from "react-router";

const UserProfile = () => {
    const navigate = useNavigate();

  return (
    <div className="loading-container">
      <LumenGlow />
      <button
      onClick={()=>{
        navigate("/");
      }}
        className={`absolute top-4 left-4 cursor-pointer bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 px-2 rounded-lg transition duration-200 transform hover:shadow-lg hover:shadow-orange-500/20 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-900 mt-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:scale-100 `}
      >
        Back to Dashboard
      </button>
      <h3>Coming Soon ... </h3>{" "}
    </div>
  );
};

export default UserProfile;
