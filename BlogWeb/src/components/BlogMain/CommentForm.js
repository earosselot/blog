import { useState } from 'react';

function CommentForm({ postId, getSinglePostComments, setSinglePostComments }) {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  async function handleCommentSubmit() {
    const data = {
      text,
      author,
    };
    await fetch(`http://localhost:5000/api/post/${postId}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const comments = await getSinglePostComments(postId);
    setSinglePostComments(comments);
  }

  function handleAuthorChange(e) {
    setAuthor(e.target.value);
  }

  function handleTextChange(e) {
    setText(e.target.value);
  }

  return (
    <form onSubmit={handleCommentSubmit}>
      <label htmlFor="comment-author">Author: </label>
      <input
        id="comment-author"
        type="text"
        value={author}
        onChange={handleAuthorChange}
      />
      <label htmlFor="comment-text">Comment: </label>
      <textarea id="comment-text" value={text} onChange={handleTextChange} />
      <button type="button" onClick={handleCommentSubmit}>
        Send!
      </button>
    </form>
  );
}

export default CommentForm;
