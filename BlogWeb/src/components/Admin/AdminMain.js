import {useEffect, useState} from 'react';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import EnhancedTable from './EnhancedTable';
import AdminTable from './AdminTable/AdminTable';
import PostForm from './PostForm/PostForm';
import Login from './Login';

import useFetch from '../../utils/useFetch';
import useApi from '../../utils/useApi';

function AdminMain() {
  const BASE_URL = 'http://localhost:5000/api/post'

  const [tabValue, setTabValue] = useState(0);
  // const posts = useFetch({url: 'http://localhost:5000/api/post?populate=user'});

  const [posts, isQuerying, api] = useApi(BASE_URL, 'populate=user' );

  useEffect(() => {
    api.list();
  }, []);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'backgruond.paper' }}>
      <Tabs value={tabValue} onChange={handleChange} centered>
        <Tab label="Posts" />
        <Tab label="Comments" />
        <Tab label="New Post" />
        <Tab label="Edit Post" />
      </Tabs>

      <br />
      {tabValue === 0 &&
        (Object.keys(posts).length !== 0 ?
          // TODO: me parece que el setValue esta de mas. Probarlo despues...
          <AdminTable posts={posts} setValue={tabValue} api={api} />
          : <span>Loading</span>)}
      {tabValue === 1 && <div>comments</div>}
      {tabValue === 2 && <PostForm/> }
      {tabValue === 3 && <div>Edit Post</div>}
    </Box>
  );
}

export default AdminMain;
