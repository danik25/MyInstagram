import { useEffect, useState } from "react";

import { toggleCommentLike } from "../../store/actions/post.action";
import { userService } from "../../services/user.service";

// CMPS
import { Like } from "./Reactions.jsx/Like";
import { User } from "./User";

export function PostComment({ post, comment, isImageDisplay }) {
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    loadComment();
  }, []);

  async function loadComment() {
    const loggedUser = userService.getLoggedUser();
    const isLiked =
      comment.likedBy.filter((likedUser) => likedUser.id === loggedUser.id)
        .length > 0;

    setIsLike(isLiked);
  }

  async function toggleLikeReaction() {
    setIsLike((prevLike) => !prevLike);
    
    try {
      await toggleCommentLike(post, comment, !isLike);
    } catch (err) {
      console.log("Had issues adding a like", err);
    }
  }

  return (
    <div className="comment">
      <User
        user={comment.by}
        comment={comment.txt}
        isImageDisplay={isImageDisplay}
      />
      <Like isLike={isLike} toggleLike={toggleLikeReaction} />
    </div>
  );
}
