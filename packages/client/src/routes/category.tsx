import { Container, Box, Typography, Card, CardContent, Grid, Paper, Button } from "@mui/material";
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useNavigate } from 'react-router';
import { GET_CATEGORIES } from '../apollo/queries';
import { Category as CategoryType, Post } from '../types/graphql';
import { truncate } from '../utils/truncate';

const ITEM_TYPE = 'category';

interface CategoryItemProps {
  category: CategoryType;
  isSelected: boolean;
  onClick: (category: CategoryType) => void;
}

const CategoryItem = ({ category, isSelected, onClick }: CategoryItemProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPE,
    item: { category },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Card 
      ref={drag}
      sx={{ 
        mb: 2, 
        cursor: 'grab',
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isSelected ? 'action.selected' : 'background.paper',
        border: isDragging ? '2px dashed primary.main' : 'none',
        '&:hover': { boxShadow: 3 },
        transition: 'all 0.2s ease'
      }}
      onClick={() => onClick(category)}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {category.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {truncate(category.description || '', 30)}
        </Typography>
        <Typography variant="caption" color="primary">
          {category.posts?.length || 0} posts
        </Typography>
      </CardContent>
    </Card>
  );
};

interface DropZoneProps {
  onDrop: (category: CategoryType) => void;
  children: React.ReactNode;
}

const DropZone = ({ onDrop, children }: DropZoneProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ITEM_TYPE,
    drop: (item: { category: CategoryType }) => {
      onDrop(item.category);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <Paper 
      ref={drop}
      sx={{ 
        p: 3, 
        minHeight: 400,
        backgroundColor: isOver ? 'action.hover' : 'background.paper',
        border: isOver ? '2px dashed primary.main' : '2px dashed transparent',
        transition: 'all 0.2s ease'
      }}
    >
      {children}
    </Paper>
  );
};

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_CATEGORIES);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  const categories: CategoryType[] = data?.categories || [];
  const categoryPosts = selectedCategory?.posts || [];

  const handleCategorySelect = (category: CategoryType) => {
    setSelectedCategory(category);
  };

  const handleCategoryDrop = (category: CategoryType) => {
    setSelectedCategory(category);
  };

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 3, paddingBottom: 3 }}>
      <Grid container spacing={2}>
        <Grid size={8}>
          <Box sx={{ marginBottom: 3, borderBottom: '1px solid #313131' }}>
            <Typography variant="h4">
              {selectedCategory ? `${selectedCategory.title} Posts` : "Category's Posts"}
            </Typography>
          </Box>
          
          <DropZone onDrop={handleCategoryDrop}>
            {selectedCategory ? (
              <Grid container spacing={2}>
                {categoryPosts.map((post) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={post.id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {post.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {truncate(post.content || '', 120)}
                        </Typography>
                        <Button 
                          variant="outlined" 
                          size="small"
                          onClick={() => navigate(`/post/${post.id}`)}
                        >
                          Read more
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  Drag a category here to view its posts
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Or click on a category in the sidebar
                </Typography>
              </Box>
            )}
          </DropZone>
        </Grid>
        
        <Grid size={4}>
          <Typography variant="h5" gutterBottom>
            Categories
          </Typography>
          {categories.map((category) => (
            <CategoryItem 
              key={category.id} 
              category={category}
              isSelected={selectedCategory?.id === category.id}
              onClick={handleCategorySelect}
            />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Category;