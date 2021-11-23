import Comment from './Comment';

function Comments({ comments }) {
  return (
    <div>
      <h3>Comments</h3>
      {comments.map((comment) => {
        return (
          <Comment
            key={comment._id}
            author={comment.author}
            text={comment.text}
            timestamp={comment.timestamp}
            id={comment._id}
          />
        );
      })}
    </div>
  );
}

export default Comments;
