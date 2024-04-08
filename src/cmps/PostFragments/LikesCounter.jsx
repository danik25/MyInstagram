export function LikesCounter({ likes }) {
  const likePhrase = likes.length === 1 ? "like" : "likes";
  return (
    <div className="likes-counter-container">
      {likes.length} {likePhrase}
    </div>
  );
}
