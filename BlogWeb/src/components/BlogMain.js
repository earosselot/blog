import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';

import PostCard from '../components/BlogMain/PostCard';
import Article from '../components/BlogMain/Article';
import { extract } from '../utils/helpers';
import useFetch from '../utils/useFetch';

const apiUrl = 'http://localhost:5000';

const emptySinglePost = {
  title: '',
  text: '',
  postId: '',
  comments: [],
};

const emptySinglePostUser = {
  firstName: '',
  lastName: '',
};

function BlogMain() {
  const posts = useFetch({url: `${apiUrl}/api/post?populate=user`});
  const [singlePostId, setSinglePostId] = useState('');
  const [singlePost, setSinglePost] = useState(emptySinglePost);
  const [singlePostUser, setSinglePostUser] = useState(emptySinglePostUser);
  const [singlePostComments, setSinglePostComments] = useState([]);

  // const singlePost = useFetch({url: 'http://localhost:5000/api/'});

  useEffect(() => {
    getSinglePost(singlePostId);
  }, [singlePostId]);


  async function getSinglePost(postId) {
    try {
      if (postId) {
        const query = `http://localhost:5000/api/post/${postId}`;
        const response = await fetch(query);
        const post = await response.json();
        const user = extract(post, 'user');

        const comments = await getSinglePostComments(postId);

        setSinglePost(post);
        setSinglePostUser(user.user);
        setSinglePostComments(comments);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getSinglePostComments(postId) {
    const commentsResponse = await fetch(
      `http://localhost:5000/api/post/${postId}/comment`
    );
    return await commentsResponse.json();
  }

  function clearSinglePost() {
    setSinglePostId('');
    setSinglePost(emptySinglePost);
    setSinglePostUser(emptySinglePostUser);
  }

  let content = '';

  if (singlePost.text !== '' && singlePostUser.firstName !== '') {
    content = (
      <Article
        title={singlePost.title}
        text={singlePost.text}
        postId={singlePost._id}
        commentsIds={singlePost.comments}
        firstName={singlePostUser.firstName}
        lastName={singlePostUser.lastName}
        comments={singlePostComments}
        clearSinglePost={clearSinglePost}
        getSinglePostComments={getSinglePostComments}
        setSinglePostComments={setSinglePostComments}
      />
    );
  } else if (Object.keys(posts).length !== 0) {
    content = posts?.map((post) => {
      return (
        <PostCard
          key={post._id}
          id={post._id}
          title={post.title}
          text={post.text}
          user={post.user.firstName}
          setSinglePostId={setSinglePostId}
        />
      );
    });
  } else {
    content = 'Loading...';
  }

  return (
    <Grid item container xs={12}>
      {content}
    </Grid>
  );
}

export default BlogMain;
