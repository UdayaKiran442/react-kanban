import { useEffect } from "react";

interface props {
  name: string;
  availability: boolean;
}

const ProfilePhoto = ({ name, availability }: props) => {
  const [firstLetter, secondLetter] = name
    ? name.split(" ").map((word) => word[0].toUpperCase())
    : ["", ""];

  useEffect(() => {
    console.log(name);
  }, [name]);
  return (
    <div className="flex items-end">
      <div className="flex items-center justify-center h-6 w-6 bg-blue-500 rounded-full">
        <span className="text-white font-bold text-sm">
          {firstLetter}
          {secondLetter}
        </span>
      </div>
      <div
        className={`-translate-x-[80%] rounded-full w-2 h-2 ${
          availability ? "bg-green-600" : "bg-red-600"
        }`}
      ></div>
    </div>
  );
};

export default ProfilePhoto;
