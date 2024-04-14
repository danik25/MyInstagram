import DotsIcon from "../../assets/svg/dots.svg";

import { useEffect, useState } from "react";

import { toggleCommentLike } from "../../store/actions/post.action";
import { userService } from "../../services/user.service";

// CMPS
import { Like } from "./Reactions.jsx/Like";
import { UserImage } from "./UserImage";
import { LikesCounter } from "./LikesCounter";
import { utilService } from "../../services/util.service";

export function PostComment({ post, comment, toggleCommentModal }) {
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    loadComment();
  }, [post]);

  async function clickComment() {
    toggleCommentModal(comment)
  }

  async function loadComment() {
    const loggedUser = userService.getLoggedUser();
    const isLiked =
      comment.likedBy &&
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

  const commentTime = utilService.timeToString(comment.time)

  return (
    <div className="post-comment-container">
      <div className="comment-n-image">
        <UserImage image={comment.by.imgUrl} />
        <div className="comment-n-information">
          <div className="user-n-comment">
            <div className="comment-by">{comment.by.fullname}</div>

            <div className="comment-txt">{comment.txt}</div>
          </div>
          <div className="comment-information">
            {comment.likedBy && comment.likedBy.length > 0 && (
              <LikesCounter likes={comment.likedBy} />
            )}
            {comment.time && commentTime}

            <button className="three-dots" onClick={clickComment}>
                <img src={DotsIcon} alt="Three dots" />
              </button>
          </div>
        </div>
      </div>

      {comment.likedBy && (
        <Like isLike={isLike} toggleLike={toggleLikeReaction} />
      )}
    </div>
  );
}
