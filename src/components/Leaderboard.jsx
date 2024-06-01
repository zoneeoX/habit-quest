import React from "react";

const Leaderboard = ({ users }) => {
  const sortedUsers = [...users].sort(
    (a, b) => b.habit_information.total_habit - a.habit_information.total_habit
  );

  return (
    <div className="overflow-x-auto overflow-y-scroll ">
      <table className="min-w-full divide-y divide-gray-200 bg-slate-800 rounded-lg">
        <thead>
          <tr>
            <th
              className="px-4 py-2 text-left font-poppins font-semibold text-lg text-white"
              colSpan={2}
            >
              Leaderboard
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedUsers.map(({ user_profile, habit_information }, i) => (
            <tr key={i}>
              <td className="px-4 py-2 flex flex-row items-center gap-2">
                <img
                  src={user_profile?.profile_picture}
                  className="rounded-full w-9 h-9"
                  alt={user_profile.username}
                />
                <p>{user_profile.username}</p>
              </td>
              <td className="px-4 py-2 text-white">
                <p className="flex flex-row gap-2">
                  {" "}
                  <span>lvl</span>
                  {habit_information.level_habit}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
