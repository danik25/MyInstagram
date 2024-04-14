import { useEffect, useState } from "react";

import CommentIcon from "../../assets/svg/comment.svg";
import ShareIcon from "../../assets/svg/share.svg";
import BookMarkIcon from "../../assets/svg/bookmark.svg";

import { togglePostLike } from "../../store/actions/post.action";
import { userService } from "../../services/user.service";

// CMPS
import { Like } from "./Reactions.jsx/Like";

export function PostReactions({ post, onCommentClick }) {
  const [isPostLikedByMe, setIsPostLikedByMe] = useState(false);
  const loggedUser = userService.getLoggedUser();

  useEffect(() => {
    loadPostReactions();
  }, [post]);

  async function toggleReactionsLike() {
    setIsPostLikedByMe((prevLike) => !prevLike);
    try {
      await togglePostLike(post, !isPostLikedByMe);
    } catch (err) {
      console.log("Had issues adding a like", err);
    }
  }

  async function loadPostReactions() {
    const isLikedByMe =
      post.likedBy.filter((likedByUser) => {
        return likedByUser.id === loggedUser.id;
      }).length > 0;

    setIsPostLikedByMe(isLikedByMe);
  }

  console.log(`postId: ${post.id}, like: ${isPostLikedByMe}`);
  return (
    <div className="post-reactions-container">
      <div className="like-comment-send">
        <Like isLike={isPostLikedByMe} toggleLike={toggleReactionsLike} />
        <button onClick={() => onCommentClick()}>
          <img src={CommentIcon} alt="Comment" />
        </button>
        <button className="share">
          <img src={ShareIcon} alt="Share" />
        </button>
      </div>

      <button className="bookmark">
        <img src={BookMarkIcon} alt="Bookmark" />
      </button>
    </div>
  );
}
