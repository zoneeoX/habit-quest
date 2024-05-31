import React from "react";

const Recent = ({ users }) => {
  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const timeDiff = Math.abs(now - past);
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return days === 1 ? "1 day ago" : `${days} days ago`;
    } else if (hours > 0) {
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    } else if (minutes > 0) {
      return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    } else {
      return "...";
    }
  };
  return (
    <div className="overflow-y-scroll">
      <div className="flex flex-col gap-2">
        {users.map(
          ({ user_profile, habit_information, lastCompletionDate }, i) => (
            <div className="flex flex-row gap-2 items-center">
              <img
                src={user_profile.profile_picture}
                className="w-9 h-9 rounded-full"
                alt=""
              />
              <div className="flex flex-col">
                <h1 className="text-sm">{user_profile.username}</h1>
                <p className="text-sm opacity-50">
                  {lastCompletionDate
                    ? `Last completed at ${getTimeAgo(lastCompletionDate)}`
                    : "No activity."}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Recent;
