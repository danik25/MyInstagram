import { Link } from "react-router-dom";
import { PostPreview } from "./PostPreview";

export function PostList({ posts }) {
  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li key={post.id}>
          <PostPreview post={post} />
        </li>
      ))}
    </ul>
  );
}
