// import 'animate.css';
// import { useState } from "react";
import EmptyLikeIcon from "../../../assets/svg/empty-heart.svg";
import FullLikeIcon from "../../../assets/svg/full-heart.svg";

export function Like({ isLike, toggleLike }) {
  // const [isAnimating, setIsAnimating] = useState(false);

  // function handleClick() {
  //   setIsAnimating(true);

  //   toggleLike()

  //   setIsAnimating(false); // Change 1000 to match the animation duration
  // }

  // TODO: add animation?
  // const animateClass = isAnimating ? 'animate__animated animate__bounce' : ''

  const likeIcon = isLike ? FullLikeIcon : EmptyLikeIcon;

  return (
    <div className="like-container">
      <button onClick={toggleLike}>
        <img src={likeIcon} alt="Like" />
      </button>
    </div>
  );
}
