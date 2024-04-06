import { FaRegHeart } from "react-icons/fa"; // Empty heart
import { IoMdHeart } from "react-icons/io"; // Full heart

export function Like({ isLike, toggleLike }) {
  const likedIcon = isLike ? <IoMdHeart /> : <FaRegHeart />;

  return (
    <div>
      <button onClick={toggleLike}>{likedIcon}</button>
    </div>
  );
}
