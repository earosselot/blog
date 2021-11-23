import Grid from '@mui/material/Grid';

import { shortenText } from '../../utils/helpers';

const PostCard = ({ id, title, text, user, setSinglePostId }) => {
  return (
    <Grid item xs={12}>
      <section>
        <h2>{title}</h2>
        <p>
          {`${shortenText(text, 50)}... `}
          <span>
            <button onClick={() => setSinglePostId(id)}>Read More</button>
          </span>
        </p>

        <h3>{user}</h3>
      </section>
    </Grid>
  );
};

export default PostCard;
