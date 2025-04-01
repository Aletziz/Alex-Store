import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Rating,
  TextField,
  Button,
  List,
  ListItem,
  Divider,
  Avatar,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
  });
  const { user } = useAuth();

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    const response = await fetch(
      `http://localhost:3001/api/products/${productId}/reviews`
    );
    const data = await response.json();
    setReviews(data);
  };

  const handleSubmitReview = async () => {
    try {
      await fetch("http://localhost:3001/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: productId,
          user_id: user.uid,
          ...newReview,
        }),
      });
      fetchReviews();
      setNewReview({ rating: 0, comment: "" });
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Reseñas del Producto
      </Typography>

      {user && (
        <Box sx={{ mb: 3 }}>
          <Typography component="legend">Tu Valoración</Typography>
          <Rating
            value={newReview.rating}
            onChange={(_, value) =>
              setNewReview({ ...newReview, rating: value })
            }
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Escribe tu reseña"
            value={newReview.comment}
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
            sx={{ mt: 1 }}
          />
          <Button
            variant="contained"
            onClick={handleSubmitReview}
            sx={{ mt: 1 }}
            disabled={!newReview.rating}
          >
            Enviar Reseña
          </Button>
        </Box>
      )}

      <List>
        {reviews.map((review) => (
          <React.Fragment key={review.id}>
            <ListItem alignItems="flex-start">
              <Box sx={{ width: "100%" }}>
                <Box display="flex" alignItems="center">
                  <Avatar sx={{ mr: 2 }}>{review.user_id[0]}</Avatar>
                  <Rating value={review.rating} readOnly />
                </Box>
                <Typography sx={{ mt: 1 }}>{review.comment}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(review.created_at).toLocaleDateString()}
                </Typography>
              </Box>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default ProductReviews;
