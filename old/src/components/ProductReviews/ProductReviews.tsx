import React, { useState } from 'react';
import {
  Box,
  Typography,
  Rating,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from '@mui/material';
import styled from 'styled-components';

const ReviewsContainer = styled(Box)`
  margin-top: 2rem;
`;

const ReviewForm = styled(Box)`
  margin-bottom: 2rem;
`;

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface ProductReviewsProps {
  productId: number;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
  });

  // Mock reviews data
  const [reviews] = useState<Review[]>([
    {
      id: 1,
      user: 'John Doe',
      rating: 5,
      comment: 'Great product! Very comfortable and stylish.',
      date: '2024-03-15',
    },
    {
      id: 2,
      user: 'Jane Smith',
      rating: 4,
      comment: 'Good quality, but a bit expensive.',
      date: '2024-03-10',
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement review submission
    console.log('New review:', newReview);
    setNewReview({ rating: 0, comment: '' });
  };

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <ReviewsContainer>
      <Typography variant="h5" gutterBottom>
        Customer Reviews
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Rating value={averageRating} readOnly precision={0.5} />
        <Typography variant="body1" sx={{ ml: 1 }}>
          ({reviews.length} reviews)
        </Typography>
      </Box>

      <ReviewForm component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          Write a Review
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Rating
            value={newReview.rating}
            onChange={(_, value) => setNewReview({ ...newReview, rating: value || 0 })}
          />
        </Box>
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Write your review here..."
          value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={!newReview.rating || !newReview.comment}
        >
          Submit Review
        </Button>
      </ReviewForm>

      <List>
        {reviews.map((review) => (
          <React.Fragment key={review.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>{review.user[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography component="span" variant="subtitle1">
                      {review.user}
                    </Typography>
                    <Typography component="span" variant="body2" color="text.secondary">
                      {review.date}
                    </Typography>
                  </Box>
                }
                secondary={
                  <>
                    <Rating value={review.rating} readOnly size="small" />
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                      sx={{ display: 'block', mt: 1 }}
                    >
                      {review.comment}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </ReviewsContainer>
  );
};

export default ProductReviews; 