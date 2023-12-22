import React from "react";
import { IoMoonSharp } from "react-icons/io5";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
const NavBar: React.FC = () => {
  return (
    <div className="bg-white w-full flex items-center justify-between p-1 ">
      <div className="w-28">
        <FormControl fullWidth>
          <InputLabel id="display">Display</InputLabel>
          <Select id="display" label="Display">
            <MenuItem>
              <div className="flex gap-10  items-center">
                <p>Grouping</p>
                <div className="w-40">
                  <FormControl fullWidth>
                    <Select defaultValue="Status">
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
      <div className="mr-4 cursor-pointer">
        <IoMoonSharp />
      </div>
    </div>
  );
};

export default NavBar;
