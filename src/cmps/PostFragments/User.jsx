export function User({ user, comment, isImageDisplay }) {
  return (
    <div className="user-container">
      {isImageDisplay && (
        <img className="user-image" src={user.imgUrl} alt="User Image" />
      )}
      <div className="user-name">{user.fullname}</div>
      <div className="user-comment">{comment}</div>
    </div>
  );
}
