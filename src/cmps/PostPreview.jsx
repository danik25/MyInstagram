import { Link } from "react-router-dom";

export function PostPreview({ post }) {
  return (
    <article className="post-preview">
      <h2>{post.txt}</h2>
      {/* <Link to={`/post/${post.id}`}>
            <h2>{robot.model}</h2>
        </Link> */}
    </article>
  );
}
