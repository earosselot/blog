import Header from '../components/Header';
import BlogMain from '../components/BlogMain';
import Footer from '../components/Footer';

import Grid from '@mui/material/Grid';

function Blog() {
  return (
    <Grid container>
      {/* TODO: los Grid los podria dentro de cada item para(Header / Footer). */}
      <Grid item xs={12}>
        <Header />
      </Grid>
      <BlogMain />
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  );
}

export default Blog;
