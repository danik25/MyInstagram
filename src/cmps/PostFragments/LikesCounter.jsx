export function LikesCounter({ likes }) {
  const likePhrase = likes.length === 1 ? "like" : "likes";
  return (
    <div className="likes">
      {likes.length} {likePhrase}
    </div>
  );
}
