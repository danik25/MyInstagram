export function CommentAction({ comment, actionOnComment, message, cancel }) {
  function dotsClick() {
    actionOnComment(comment);
  }

  function cancelClick() {
    cancel();
  }
  return (
    <dialog className="comment-action-container" open>
      <div className="message">
        <button onClick={dotsClick} className={message.toLowerCase()}>
          {message}
        </button>
        <button onClick={cancelClick} className="Cancel">
          Cancel
        </button>
      </div>
    </dialog>
  );
}
