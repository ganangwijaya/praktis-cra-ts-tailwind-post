import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import PostDetail from "./pages/post-detail";
import { TopNavBar } from "./component/nav";
import CreatePost from "./pages/create-post";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <TopNavBar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/post" element={<App />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/post/:postId" element={<PostDetail />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
