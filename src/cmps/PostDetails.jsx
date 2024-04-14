import { Link, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { IoMdClose } from "react-icons/io";

// Internal services
import { postService } from "../services/post.service";
import { deleteComment, reportComment } from "../store/actions/post.action";

// CMPS
import { User } from "./PostFragments/User";
import { PostReactions } from "./PostFragments/PostReactions";
import { AddComment } from "./PostFragments/AddComment";
import { LikesCounter } from "./PostFragments/LikesCounter";
import { PostComment } from "./PostFragments/PostComment";
import { CommentAction } from "./CommentAction";
import { utilService } from "../services/util.service";
import { userService } from "../services/user.service";

export function PostDetails() {
  const loggedUser = userService.getLoggedUser();

  const context = useOutletContext();
  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const [commentModalOpen, setIsCommentModalOpen] = useState(null);


  // TODO: fic error handling, add custom message?
  // TODO: create one point (or tow) where I get the logged user? maby reducer?

  // function setFocusOnInput() {   // TODO: add the focus when comment is clicked in "Details"
  //   commentCmp.focus();
  // }

  useEffect(() => {
    loadPost();
  }, []);

  function toggleCommentModal(comment) {
    setIsCommentModalOpen(comment ? comment : null);
  }

  async function deleteCommentInternal(calledOnComment) {
    try {
      await deleteComment(post, calledOnComment);

      const newCommentArr = post.comments.filter(
        (comment) => comment.id != calledOnComment.id
      );
      setPost({ ...post, comments: newCommentArr });
      setIsCommentModalOpen(null);
    } catch (err) {
      console.log("Failed deleting comment ", err);
    }
  }

  function reportInternal() {
    reportComment();
    setIsCommentModalOpen(null);
  }

  async function loadPost() {
    const currentPost = await postService.getById(postId);
    setPost(currentPost);
  }
  if (!post) {
    return <div></div>;
  }

  // TODO: move this function to post service? (Batel?)
  const sortedCommentArray = post.comments.sort(
    (a, b) =>
      utilService.getTimeDifference(a.time) -
      utilService.getTimeDifference(b.time)
  );

  let comments = sortedCommentArray.map((comment) => {
    return (
      <li key={comment.id}>
        <PostComment
          post={post}
          comment={comment}
          toggleCommentModal={toggleCommentModal}
        />
      </li>
    );
  });

  comments = comments.reverse();

  let commentFunc = () => reportInternal();
  let modalMsg = "Report";
  if (commentModalOpen && loggedUser.id === commentModalOpen.by.id) {
    commentFunc = () => deleteCommentInternal(commentModalOpen);
    modalMsg = "Delete";
  }

  return (
    <dialog className="post-details-container" open>
      {commentModalOpen && (
        <CommentAction
          comment={commentModalOpen}
          actionOnComment={commentFunc}
          message={modalMsg}
          cancel={toggleCommentModal}
        />
      )}
      <section className="post-details-internal">
        <img
          className="post-details-image"
          src={post.imgUrl}
          alt="Post Image"
        />
        <div className="post-details-content">
          <div className="post-details-by-n-comments">
            <div className="post-details-header">
              <User user={post.by} isImageDisplay={true} />
            </div>
            <section className="post-details-comments">{comments}</section>
          </div>

          <div className="post-details-user-interaction">
            <PostReactions post={post} />
            <div className="post-details-user-interaction-internal">
              <div className="details-counter">
                <LikesCounter likes={post.likedBy} />
              </div>

              <AddComment post={post} />
            </div>
          </div>
        </div>
      </section>
      <div className="exit">
        <button>
          <Link to={context.pageBG}>
            <IoMdClose />
          </Link>
        </button>
      </div>
    </dialog>
  );
}
