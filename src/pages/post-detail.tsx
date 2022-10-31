import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostState, UserState } from "../utils/interface";

import { FaTimes, FaSpinner } from "react-icons/fa";

const PostDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { postId } = params;

  const [postDetail, setPostsDetail] = useState<PostState>();
  const [author, setAuthor] = useState<UserState>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [postUpdateData, setPostsUpdateData] = useState<PostState>();
  const [loadingDelete, setLoadingDelete] = useState<{
    status: boolean;
    message: string;
  }>({ status: false, message: "" });

  useEffect(() => {
    const getPostDetail = async () => {
      const res = await (
        await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      ).json();

      if (res) {
        setPostsDetail(res);
        setPostsUpdateData(res);
        const resUser = await (
          await fetch(
            `https://jsonplaceholder.typicode.com/users/${res.userId}`
          )
        ).json();
        setAuthor(resUser);
      }

      setLoaded(true);
    };

    if (postId) {
      getPostDetail();
    }

    return () => {
      setLoaded(false);
    };
  }, [postId]);

  const handlerUpdate = async () => {
    if (postUpdateData) {
      const res = await (
        await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postUpdateData.id}`,
          {
            method: "PUT",
            body: JSON.stringify(postUpdateData),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          }
        )
      ).json();

      if (res) {
        setPostsDetail(res);
        console.log(res);
        setShowModal(false);
      }
    }
  };

  const handlerDelete = async () => {
    setLoadingDelete({ status: true, message: "Deleting..." });

    if (postDetail) {
      const res = await (
        await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postDetail.id}`,
          {
            method: "DELETE",
          }
        )
      ).json();

      if (res) {
        setLoadingDelete((s) => ({
          ...s,
          message: "Deleted, redirecting to main page...",
        }));
        setTimeout(() => navigate("/post"), 2000);
      }
    }
  };

  return (
    <article className="container min-h-screen mx-auto mt-12 px-2">
      {loaded && postDetail && author ? (
        <>
          <h1 className="text-3xl font-bold">{postDetail.title}</h1>
          <span>by {author.name}</span>
          <p className="text-gray-500 mt-8">{postDetail.body}</p>
          <div className="flex gap-4 mt-8">
            <button
              className="border px-3 py-2 rounded-md"
              onClick={() => setShowModal(true)}
            >
              Update This Post
            </button>
            <button
              className="bg-red-500 text-gray-50 px-3 py-2 rounded-md flex items-center gap-2"
              onClick={() => handlerDelete()}
            >
              {loadingDelete.status ? (
                <>
                  <FaSpinner className="animate-spin" /> {loadingDelete.message}{" "}
                </>
              ) : (
                "Delete This Post"
              )}
            </button>
          </div>
          {showModal && postUpdateData ? (
            <>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handlerUpdate();
                }}
              >
                <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-2xl font-semibold">Update Post</h3>
                        <button
                          className="text-gray-800"
                          onClick={() => setShowModal(false)}
                        >
                          <FaTimes />
                        </button>
                      </div>
                      <div className="relative p-6 flex-auto">
                        <div className="flex flex-col gap-4 w-[600px]">
                          <div>
                            <label>Title</label>
                            <input
                              type={"text"}
                              className="mt-2 w-full p-2 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-blue-500"
                              name={"title"}
                              value={postUpdateData.title}
                              onChange={(e) =>
                                setPostsUpdateData((d) => ({
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
                              className="mt-2 w-full p-2 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-blue-500"
                              name={"body"}
                              placeholder={"input body"}
                              value={postUpdateData.body}
                              onChange={(e) =>
                                setPostsUpdateData((d) => ({
                                  ...d,
                                  body: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b gap-4 rounded">
                        <button
                          className="border font-bold px-3 py-2 text-sm"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                        <button
                          className="bg-green-500 text-white font-bold px-3 py-2 rounded shadow"
                          type="submit"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </form>
            </>
          ) : null}
        </>
      ) : (
        <div className="animate-pulse flex flex-col gap-3">
          <div className="h-6 bg-slate-200" />
          <div className="h-2 bg-slate-200 max-w-[20%]" />
          <div className="flex flex-col gap-2 mt-10">
            <div className="h-2 bg-slate-200" />
            <div className="h-2 bg-slate-200" />
            <div className="h-2 bg-slate-200" />
            <div className="h-2 bg-slate-200 max-w-[40%]" />
          </div>
        </div>
      )}
    </article>
  );
};

export default PostDetail;
