import { UserImage } from "./UserImage";
import { LuDot } from "react-icons/lu";


export function PostBy({ user, time }) {
    return (
        <div className="post-by-container">
            <UserImage image={ user.imgUrl } />
            <div className="user-name">{user.fullname}</div>
            <div className="post-time"><LuDot/> {time}</div>
      </div>
    );
  }
  