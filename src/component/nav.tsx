import { Link } from "react-router-dom";

export const TopNavBar = () => {
  return (
    <nav className="p-4 flex justify-between items-center bg-white shadow-md sticky w-full top-0">
      <Link to={"/"}>
        <span>Home</span>
      </Link>
      <div className="flex gap-2">
        <Link to={"/create"} className="bg-blue-500 text-gray-50 px-3 py-2 rounded-md">
          Create Post
        </Link>
      </div>
    </nav>
  );
};
