import React, { createContext, useState } from "react";

interface UserObj {
  [key: string]: string;
}

interface UserAvailableObj {
  [key: string]: boolean;
}

interface Tickets {
  id: string;
  priority: number;
  status: string;
  tag: Array<string>;
  title: string;
  userId: string;
}

interface User {
  id: string;
  name: string;
  available: boolean;
}

export type ContextObject = {
  darkMode: boolean;
  grouping: string;
  userObj: UserObj;
  userAvl: UserAvailableObj;
  tickets: Array<Tickets>;
  users: Array<User>;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  setGrouping: React.Dispatch<React.SetStateAction<string>>;
  setUserObj: React.Dispatch<React.SetStateAction<UserObj>>;
  setUserAvl: React.Dispatch<React.SetStateAction<UserAvailableObj>>;
  setTickets: React.Dispatch<React.SetStateAction<Array<Tickets>>>;
  setUsers: React.Dispatch<React.SetStateAction<Array<User>>>;
};

type ProviderProps = React.PropsWithChildren;

export const AppContext = createContext<ContextObject>({
  darkMode: false,
  grouping: "Status",
  userObj: {},
  userAvl: {},
  users: [
    {
      available: false,
      id: "",
      name: "",
    },
  ],
  tickets: [
    {
      id: "",
      priority: 0,
      status: "",
      tag: [""],
      title: "",
      userId: "",
    },
  ],
  setDarkMode: () => {},
  setGrouping: async () => {},
  setUserObj: async () => {},
  setUserAvl: async () => {},
  setTickets: async () => {},
  setUsers: async () => {},
});

const Provider = ({ children }: ProviderProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [grouping, setGrouping] = useState<string>("Status");

  const [userObj, setUserObj] = useState<UserObj>({});
  const [userAvl, setUserAvl] = useState<UserAvailableObj>({});

  const [tickets, setTickets] = useState<Array<Tickets>>([]);
  const [users, setUsers] = useState<Array<User>>([]);
  return (
    <AppContext.Provider
      value={{
        darkMode,
        grouping,
        userObj,
        userAvl,
        tickets,
        users,
        setDarkMode,
        setGrouping,
        setUserObj,
        setUserAvl,
        setTickets,
        setUsers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default Provider;
