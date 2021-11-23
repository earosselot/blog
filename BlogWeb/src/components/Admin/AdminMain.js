import { useState } from 'react';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import EnhancedTable from './EnhancedTable';
import AdminTable from './AdminTable/AdminTable';
import useFetch from '../../utils/useFetch';
import PostForm from './PostForm/PostForm';

function AdminMain() {
  const [value, setValue] = useState(0);
  const posts = useFetch({url: 'http://localhost:5000/api/post?populate=user'});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'backgruond.paper' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Posts" />
        <Tab label="Comments" />
        <Tab label="New Post" />
        <Tab label="Edit Post" />
      </Tabs>

      <br />
      {value === 0 &&
        (Object.keys(posts).length !== 0 ?
          <AdminTable posts={posts} setValue={value} />
          : <span>Loading</span>)}
      {value === 1 && <div>comments</div>}
      {value === 2 && <PostForm/> }
      {value === 3 && <div>Edit Post</div>}
    </Box>
  );
}

export default AdminMain;
