import { Container, Box, Typography, Card, CardMedia, CardContent, Button, Grid } from "@mui/material";
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router';
import { GET_POSTS } from '../apollo/queries';
import { Post } from '../types/graphql';
import { truncate } from '../utils/truncate';

const POSTS_PER_PAGE = 10;

export default function Home() {
  const navigate = useNavigate();
  const { data, loading, error, fetchMore } = useQuery(GET_POSTS, {
    variables: { offset: 0, limit: POSTS_PER_PAGE },
  });

  const handleLoadMore = () => {
    fetchMore({
      variables: {
        offset: data?.posts?.length || 0,
        limit: POSTS_PER_PAGE,
      },
    });
  };

  const handleReadMore = (postId: string) => {
    navigate(`/post/${postId}`);
  };

  if (loading && !data) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  const posts: Post[] = data?.posts || [];
  const hasMorePosts = posts.length % POSTS_PER_PAGE === 0 && posts.length > 0;

  return (
    <Container maxWidth="md" sx={{ paddingTop: 3, paddingBottom: 3 }}>
      <Box sx={{ marginBottom: 3, borderBottom: "1px solid #313131" }}>
        <Typography variant="h4">Latest Posts</Typography>
      </Box>

      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={post.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={post.cover}
                alt={post.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {truncate(post.content || '', 120)}
                </Typography>
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => handleReadMore(post.id)}
                >
                  Read more
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {hasMorePosts && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button 
            variant="contained" 
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </Box>
      )}
    </Container>
  );
}
