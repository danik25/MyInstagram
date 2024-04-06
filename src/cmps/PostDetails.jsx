import { Link, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

// Internal services
import { postService } from "../services/post.service";

// CMPS
import { User } from "./PostFragments/User";
import { PostReactions } from "./PostFragments/PostReactions";
import { AddComment } from "./PostFragments/AddComment";
import { LikesCounter } from "./PostFragments/LikesCounter";
import { PostComment } from "./PostFragments/PostComment";

export function PostDetails() {
  const [post, setPost] = useState(null);
  const context = useOutletContext();
  const { postId } = useParams();

  // const commentCmp = <AddComment post={post} />
  // const inputRef = useRef(commentCmp);

  // function setFocusOnInput() {   // TODO: add the focus when comment is clicked in "Details"
  //   commentCmp.focus();
  // }

  useEffect(() => {
    loadPost();
  }, []);

  async function loadPost() {
    const currentPost = await postService.getById(postId);
    setPost(currentPost);
  }
  if (!post) {
    return <div>"loading..."</div>;
  }

  const comments = post.comments.map((comment) => {
    return (
      <li key={comment.id}>
        <PostComment post={post} comment={comment} isImageDisplay={true} />
        <LikesCounter likes={comment.likedBy} />
      </li>
    );
  });

  return (
    <dialog className="post-details-container" open>
      <Link to={context.pageBG}>X</Link>
      <img className="post-details-image" src={post.imgUrl} alt="Post Image" />
      <div className="post-details-content">
        <div className="post-details-by-n-comments">
          <div className="post-details-header">
            <User user={post.by} isImageDisplay={true} />
          </div>
          <section className="post-details-comments">{comments}</section>
        </div>

        <div className="post-details-user-interaction">
          <PostReactions post={post} />
          <LikesCounter likes={post.likedBy} />
          <AddComment post={post} />
        </div>
      </div>
    </dialog>
  );
}
