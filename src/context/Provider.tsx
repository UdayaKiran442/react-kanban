import React, { createContext, useState } from "react";

export type ContextObject = {
  darkMode: boolean;
  grouping: string;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  setGrouping: React.Dispatch<React.SetStateAction<string>>;
};

type ProviderProps = React.PropsWithChildren;

export const AppContext = createContext<ContextObject>({
  darkMode: false,
  grouping: "Status",
  setDarkMode: () => {},
  setGrouping: async () => {},
});

const Provider = ({ children }: ProviderProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [grouping, setGrouping] = useState<string>("Status");
  return (
    <AppContext.Provider
      value={{ darkMode, grouping, setDarkMode, setGrouping }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default Provider;
