import Grid from '@mui/material/Grid';

import Comments from './Comments';
import CommentForm from './CommentForm';

const Article = ({
  title,
  text,
  postId,
  commentsIds,
  firstName,
  lastName,
  comments,
  clearSinglePost,
  getSinglePostComments,
  setSinglePostComments,
}) => {
  return (
    <Grid item xs={12}>
      <button onClick={() => clearSinglePost()}>Home</button>
      <h1>{title}</h1>
      <h3>{`${firstName} ${lastName}`}</h3>
      <p>{text}</p>
      <CommentForm
        postId={postId}
        getSinglePostComments={getSinglePostComments}
        setSinglePostComments={setSinglePostComments}
      />
      <Comments comments={comments} />
    </Grid>
  );
};

export default Article;
