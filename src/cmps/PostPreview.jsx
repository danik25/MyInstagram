import { useNavigate } from "react-router";

import { userService } from "../services/user.service";

// CMPS
import { AddComment } from "./PostFragments/AddComment";
import { PostReactions } from "./PostFragments/PostReactions";
import { User } from "./PostFragments/User";
import { LikesCounter } from "./PostFragments/LikesCounter";
import { PostComment } from "./PostFragments/PostComment";

export function PostPreview({ post }) {
  const loggedUser = userService.getLoggedUser();
  const navigate = useNavigate();

  function onCommentClick() {
    navigate(`p/${post.id}`);
  }

  const selfComments = post.comments.filter(
    (comment) => comment.by.id === loggedUser.id
  );

  const selfCommentTxt = selfComments.map((selfComment) => {
    return (
      <li key={selfComment.id}>
        <PostComment post={post} comment={ selfComment}/>
      </li>
    );
  });

  console.log("preview")
  return (
    <article className="post-preview">
      <User user={post.by} isImageDisplay={true} />

      <img
        className="post-preview-post-image"
        src={post.imgUrl}
        alt="Post Image"
      />
      <div className="post-preview-content">
        <PostReactions post={post} onCommentClick={onCommentClick} />

        <LikesCounter likes={post.likedBy} />

        <div className="post-preview-txt">
          <div className="name"> {post.by.fullname}</div>
          {post.txt}
        </div>
        <div className="comments">
          <button onClick={onCommentClick}>
            View all {post.comments.length} comments
          </button>
        </div>

        {selfCommentTxt}

        <AddComment post={post} />
      </div>
    </article>
  );
}
