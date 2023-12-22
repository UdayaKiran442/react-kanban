import React, { useContext } from "react";
import { IoMoonSharp } from "react-icons/io5";
import { CiSun } from "react-icons/ci";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { AppContext } from "../context/Provider";

const NavBar: React.FC = () => {
  const { darkMode, setDarkMode, setGrouping } = useContext(AppContext);
  const onChangeTheme = () => {
    console.log("click");
    if (darkMode) {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  };

  const handleChange = (e: SelectChangeEvent) => {
    console.log("Grouping", e.target.value);
    setGrouping(e.target.value as string);
  };

  return (
    <div className="bg-white dark:bg-[#161B22]  w-full flex items-center justify-between p-1 ">
      <div className="w-28">
        <FormControl fullWidth>
          <InputLabel id="display">
            <span className="dark:text-white ">Display</span>
          </InputLabel>
          <Select id="display" label="Display">
            <MenuItem>
              <div className="flex gap-10 items-center">
                <p>Grouping</p>
                <div className="w-40">
                  <FormControl fullWidth>
                    <Select defaultValue="Status" onChange={handleChange}>
                      <MenuItem value="Status">Status</MenuItem>
                      <MenuItem value="User">User</MenuItem>
                      <MenuItem value="Priority">Priority</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="mr-4 dark:z-10 cursor-pointer" onClick={onChangeTheme}>
        {darkMode ? <CiSun /> : <IoMoonSharp />}
      </div>
    </div>
  );
};

export default NavBar;
