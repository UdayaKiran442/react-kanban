import { useContext } from "react";

import { AppContext } from "../context/Provider";

interface User {
  id: string;
  available: boolean;
  name: string;
}

export const useUser = () => {
  const { userAvl, userObj, users } = useContext(AppContext);
  users.forEach((user: User) => {
    if (!userObj[user.id]) {
      userObj[user.id] = user.name;
      userAvl[user.id] = user.available;
    }
  });
  console.log(userObj);
  console.log(userAvl);
};
