import { PostState } from "../utils/interface";
import { FaArrowRight } from "react-icons/fa";

export const PostCard = ({ title, body }: PostState) => {
  return (
    <div className="group flex flex-col justify-between p-5 h-[180px] border rounded-md hover:shadow-md duration-200">
      <h5 className="text-lg min-h-[56px] font-semibold capitalize line-clamp-2">
        {title}
      </h5>
      <p className="text-sm line-clamp-2">{body}</p>
      <button className="flex gap-2 items-center text-blue-500">
        Read More
        <FaArrowRight className="group-hover:translate-x-1 duration-200" />
      </button>
    </div>
  );
};

export const PostCardSkeleton = () => {
  return (
    <div className="flex flex-col justify-between p-7 h-[180px] border rounded-md shadow-md animate-pulse">
      <div className="min-h-[30px] flex flex-col gap-3">
        <div className="h-4 bg-slate-200 rounded" />
        <div className="h-4 bg-slate-200 rounded w-[40%]" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-2 bg-slate-200" />
        <div className="h-2 bg-slate-200" />
      </div>
      <div className="h-3 bg-slate-200 w-[30%]"></div>
    </div>
  );
};
