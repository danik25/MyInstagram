import { PostPreview } from "./PostPreview";

export function PostList({ posts }) {
  return (
    <ul className="post-list">
      {posts.map((post, index) => (
        <li key={index}>
          <PostPreview post={post} />
        </li>
      ))}
    </ul>
  );
}
