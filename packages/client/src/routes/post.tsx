import { Container, Typography, Box, Card, CardMedia } from "@mui/material";
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import { GET_POST, GET_CATEGORY } from '../apollo/queries';
import { Post as PostType } from '../types/graphql';

const Post = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: postData, loading: postLoading, error: postError } = useQuery(GET_POST, {
    variables: { id },
    skip: !id,
  });

  const { data: categoryData } = useQuery(GET_CATEGORY, {
    variables: { id: postData?.post?.category_id },
    skip: !postData?.post?.category_id,
  });

  if (postLoading) return <Typography>Loading...</Typography>;
  if (postError) return <Typography>Error: {postError.message}</Typography>;
  if (!postData?.post) return <Typography>Post not found</Typography>;

  const post: PostType = postData.post;
  const category = categoryData?.category;

  return (
    <Container maxWidth="md" sx={{ paddingTop: 3, paddingBottom: 3 }}>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={post.cover}
          alt={post.title}
        />
        <Box sx={{ p: 3 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            {post.title}
          </Typography>
          
          {category && (
            <Typography variant="subtitle1" color="primary" gutterBottom>
              Category: {category.title}
            </Typography>
          )}
          
          <Typography variant="body1" sx={{ mt: 2, lineHeight: 1.7 }}>
            {post.content}
          </Typography>
        </Box>
      </Card>
    </Container>
  );
};

export default Post;
