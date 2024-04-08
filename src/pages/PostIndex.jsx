import { useEffect } from "react";
import { useSelector } from "react-redux";

import { loadPosts } from "../store/actions/post.action";
import { PostList } from "../cmps/PostList";
import { Outlet } from "react-router";

export function PostIndex() {
  const posts = useSelector((storeState) => storeState.postModule.posts);

  useEffect(() => {
    loadPosts();
  }, []);

  if (!posts.length) {
    return <div>Loading..</div>;
  }
  console.log("posts (index): ", posts);
  return (
    <div className="home-index">
      <PostList posts={posts} />
      <Outlet context={{ pageBG: "/home" }} />
    </div>
  );
}
