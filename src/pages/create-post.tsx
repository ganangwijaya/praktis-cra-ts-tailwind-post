import { useState } from "react";
import { PostState } from "../utils/interface";
import { FaSpinner } from "react-icons/fa";

const CreatePost = () => {
  const [postCreateData, setPostsCreateData] = useState<PostState>();
  const [loadingCreate, setLoadingCreate] = useState<{
    status: boolean;
    result?: boolean;
    message: string;
  }>({ status: false, message: "" });

  const handlerCreate = async () => {
    setLoadingCreate((s) => ({ status: true, message: "Creating Post..." }));
    const res = await (
      await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(postCreateData),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
    ).json();

    if (res) {
      setLoadingCreate((d) => ({
        status: false,
        result: true,
        message: `Post with title ${res.title} has been created.`,
      }));
    } else {
      setLoadingCreate((d) => ({
        status: false,
        result: false,
        message: `Something went wrong.`,
      }));
    }
  };

  return (
    <div>
      <form
        className="container min-h-screen mx-auto mt-12 px-2 flex justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          handlerCreate();
        }}
      >
        <div className="flex flex-col gap-4 lg:w-[50%]">
          <div>
            <label>Title</label>
            <input
              required
              type={"text"}
              className="mt-2 w-full p-2 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-blue-500"
              name={"title"}
              onChange={(e) =>
                setPostsCreateData((d) => ({
                  ...d,
                  title: e.target.value,
                }))
              }
              placeholder={"input title"}
            />
          </div>
          <div>
            <label>Body</label>
            <textarea
              required
              className="mt-2 w-full p-2 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-blue-500"
              name={"body"}
              placeholder={"input body"}
              onChange={(e) =>
                setPostsCreateData((d) => ({
                  ...d,
                  body: e.target.value,
                }))
              }
            />
          </div>
          {loadingCreate.result !== undefined && (
            <div
              className={`border ${
                loadingCreate.result
                  ? "bg-green-100 border-green-400 text-green-700 "
                  : "bg-red-100 border-red-400 text-red-700 "
              }  px-4 py-3 rounded relative flex gap-2`}
              role="alert"
            >
              <strong className="font-bold">
                {loadingCreate.result ? "Success!" : "Error!"}
              </strong>
              <span className="block sm:inline">{loadingCreate.message}</span>
            </div>
          )}
          <button
            className="bg-green-500 text-white font-bold px-3 py-2 rounded shadow flex gap-2 items-center justify-center"
            type="submit"
          >
            {loadingCreate.status && <FaSpinner className="animate-spin" />}
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
