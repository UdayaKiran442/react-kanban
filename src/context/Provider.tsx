import React, { createContext, useState } from "react";

export type ContextObject = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

type ProviderProps = React.PropsWithChildren;

export const AppContext = createContext<ContextObject>({
  darkMode: false,
  setDarkMode: () => {},
});

const Provider = ({ children }: ProviderProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  return (
    <AppContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </AppContext.Provider>
  );
};

export default Provider;
