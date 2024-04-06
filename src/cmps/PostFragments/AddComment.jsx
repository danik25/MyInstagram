import { useState } from "react";
import { addComment } from "../../store/actions/post.action";

import { GoSmiley } from "react-icons/go";

export function AddComment({ post }) {
  const [comment, setComment] = useState("");

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  async function addPostComment(event) {
    event.preventDefault();
    setComment("");

    try {
      await addComment(post, comment);
    } catch (err) {
      console.log("Had issues adding a comment", err);
    }
  }

  return (
    <div className="add-comment-container">
      <form className="comment" onSubmit={addPostComment}>
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={handleChange}
        />
        {comment && (
          <button className="post-button" type="submit">
            Post
          </button>
        )}
      </form>

      <div className="comment-icon">
        <GoSmiley />
      </div>
    </div>
  );
}
