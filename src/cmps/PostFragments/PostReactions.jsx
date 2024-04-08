import { FaRegComment } from "react-icons/fa"; // Comment
import { LuSend } from "react-icons/lu"; // Send
import { FaRegBookmark } from "react-icons/fa6";
import { useEffect, useState } from "react";

import { togglePostLike } from "../../store/actions/post.action";
import { userService } from "../../services/user.service";

// CMPS
import { Like } from "./Reactions.jsx/Like";

export function PostReactions({ post, onCommentClick }) {
  const [isPostLikedByMe, setIsPostLikedByMe] = useState(false);
  const loggedUser = userService.getLoggedUser();

  useEffect(() => {
    loadPostReactions();
  }, []);

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
          <FaRegComment />
        </button>
        <button className="share">
          <LuSend />
        </button>
      </div>

      <button className="bookmark">
        <FaRegBookmark />
      </button>
    </div>
  );
}
