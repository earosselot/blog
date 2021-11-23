import format from 'date-fns/format';

function Comment({ author, text, timestamp, id }) {
  return (
    <div>
      <h4>{author}</h4>
      <p>{text}</p>
      <span>{format(new Date(timestamp), 'PP h:mm')}</span>
    </div>
  );
}

export default Comment;
