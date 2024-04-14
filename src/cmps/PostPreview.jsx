import { useNavigate } from "react-router";

import { userService } from "../services/user.service";

// CMPS
import { AddComment } from "./PostFragments/AddComment";
import { PostReactions } from "./PostFragments/PostReactions";
import { LikesCounter } from "./PostFragments/LikesCounter";
import { PostComment } from "./PostFragments/PostComment";
import { PostBy } from "./PostFragments/postBy";
import { utilService } from "../services/util.service";

// TODO: go over the file and see if any granular conponents are now redundant?
export function PostPreview({ post }) {
  const navigate = useNavigate();

  const commentAmount = 2
  let counter = 0;

  function onCommentClick() {
    navigate(`p/${post.id}`);
  }


  const sortedCommentArray = post.comments.sort((a, b) => utilService.getTimeDifference(a.time) - utilService.getTimeDifference(b.time))

  let postComments = sortedCommentArray.map((comment) => {
    if (counter < commentAmount) {
      ++counter;
      return (
        <li key={comment.id}>
          <PostComment post={post} comment={comment} />
        </li>
      );
    }
    
  })

  postComments = postComments.reverse(); 
  
  const postTime = utilService.timeToString(post.time)

  return (
    <article className="post-preview">
      <PostBy user={post.by} time={postTime} />
      <img
        className="post-preview-post-image"
        src={post.imgUrl}
        alt="Post Image"
      />
      <div className="post-preview-content">
        <PostReactions post={post} onCommentClick={onCommentClick} />

        <LikesCounter likes={post.likedBy} />

        <PostComment post={post} comment={{ by: post.by, txt: post.txt }} />
        <div className="comments">
          <button onClick={onCommentClick}>
            View all {post.comments.length} comments
          </button>
        </div>

        {postComments}

        <AddComment post={post} />
      </div>
    </article>
  );
}
