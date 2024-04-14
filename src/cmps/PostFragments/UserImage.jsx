export function UserImage({ image }) {
  return (
    <div className="user-image-container">
      <img className="user-image" src={image} alt="User Image" />
    </div>
  );
}
