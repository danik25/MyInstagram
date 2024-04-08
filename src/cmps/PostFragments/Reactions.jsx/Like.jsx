import { FaRegHeart } from "react-icons/fa"; // Empty heart
import { FaHeart } from "react-icons/fa6"; // Full heart

// import 'animate.css';
// import { useState } from "react";

export function Like({ isLike, toggleLike }) {
  // const [isAnimating, setIsAnimating] = useState(false);

  // function handleClick() {
  //   setIsAnimating(true);

  //   toggleLike()

  //   setIsAnimating(false); // Change 1000 to match the animation duration
  // }

  const likedIcon = isLike ? <FaHeart /> : <FaRegHeart />;
  const likeClass = isLike ? "clicked" : "";

  // const animateClass = isAnimating ? 'animate__animated animate__bounce' : ''

  return (
    <div className="like-container">
      <button className={`${likeClass}`} onClick={toggleLike}>
        {likedIcon}
      </button>
    </div>
  );
}
