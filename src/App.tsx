import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { PostCard, PostCardSkeleton } from "./component/card";
import { PostState } from "./utils/interface";

const App = () => {
  const [posts, setPosts] = useState<PostState[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const getPost = async () => {
      setLoaded(false);
      const res = await (
        await fetch("https://jsonplaceholder.typicode.com/posts")
      ).json();

      setPosts(res);
      setLoaded(true);
    };

    getPost();

    return () => {
      setLoaded(false);
    };
  }, []);

  return (
    <main>
      <div className="container mx-auto mt-12 px-2">
        <div className="text-center">
          <h1 className="text-3xl font-bold">List Post</h1>
          <p className="text-gray-500">
            Ini List Post yang ada di JSONPlaceholder
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {loaded
            ? posts.length > 0 &&
              posts.map((post) => (
                <Link key={post.id} to={`/post/${post.id}`}>
                  <PostCard {...post} />
                </Link>
              ))
            : [...Array(10)].map((i, x) => <PostCardSkeleton key={x} />)}
        </div>
      </div>
    </main>
  );
};

export default App;
