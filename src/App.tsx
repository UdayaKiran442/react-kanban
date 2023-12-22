import { useContext, useEffect } from "react";
import NavBar from "./components/NavBar";
import { AppContext } from "./context/Provider";

function App() {
  const { grouping } = useContext(AppContext);
  useEffect(() => {
    console.log(grouping);
  }, [grouping]);
  return (
    <div className="h-screen bg-[rgb(244,245,248)] dark:bg-black">
      <NavBar />
    </div>
  );
}

export default App;
