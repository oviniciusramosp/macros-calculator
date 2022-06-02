import React, { createContext, useState } from "react";

export const UserData = createContext({});

function UserDataProvider({ children }) {
  const numberWithDot = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const [userGender, setUserGender] = useState("none");
  const [userHeight, setUserHeight] = useState();
  const [userWeight, setUserWeight] = useState();
  const [userAge, setUserAge] = useState();
  const [userTMB, setUserTMB] = useState(0);
  const [userTDEE, setUserTDEE] = useState(0);
  const [userStatus, setUserStatus] = useState();
  const [userGoal, setUserGoal] = useState();
  const [calDiference, setCalDiference] = useState(0);
  const [totalCalGoal, setTotalCalGoal] = useState(0);

  var user = {
    gender: userGender,
    height: userHeight,
    weight: userWeight,
    age: userAge,
    tmb: userTMB,
    tdee: userTDEE,
    goal: userGoal,
    status: userStatus,
    goalCalDifference: calDiference,
    totalCalGoal: totalCalGoal,
  };

  return (
    <UserData.Provider
      value={{
        numberWithDot,
        user,
        setUserGender,
        setUserHeight,
        setUserWeight,
        setUserAge,
        setUserTMB,
        setUserTDEE,
        setUserStatus,
        setUserGoal,
        setCalDiference,
        setTotalCalGoal,
      }}
    >
      {children}
    </UserData.Provider>
  );
}

export default UserDataProvider;
