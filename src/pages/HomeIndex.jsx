import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadPosts } from "../store/actions/post.action";
import { PostList } from "../cmps/PostList";

export function HomeIndex() {
  const posts = useSelector((storeState) => storeState.postModule.posts);

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <section className="home-index">
      <h1>Welcome! This is MyInstagram</h1>
      <PostList posts={posts} />
    </section>
  );
}
