import { useContext, useLayoutEffect } from "react";
import NavBar from "./components/NavBar";
import { AppContext } from "./context/Provider";
import Status from "./components/Status";
import User from "./components/User";
import Priority from "./components/Priority";

function App() {
  const { grouping } = useContext(AppContext);
  useLayoutEffect(() => {
    console.log(grouping);
  }, [grouping]);
  return (
    <div className="h-screen bg-[rgb(244,245,248)] dark:bg-black">
      <NavBar />
      {grouping === "Status" ? (
        <Status />
      ) : grouping === "User" ? (
        <User />
      ) : (
        <Priority />
      )}
    </div>
  );
}

export default App;
