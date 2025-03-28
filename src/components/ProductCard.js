import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  Box,
} from "@mui/material";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

const ProductCard = ({ product }) => {
  const { dispatch } = useCart();
  const { darkMode } = useTheme();

  if (!product) return null;

  const defaultImage = "https://via.placeholder.com/300x200?text=No+Image";

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        imagen: product.imagen || defaultImage,
        quantity: 1,
      },
    });
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: darkMode
          ? "rgba(255, 255, 255, 0.05)"
          : "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: { xs: "none", sm: "translateY(-8px)" },
          boxShadow: darkMode
            ? "0 8px 30px rgba(255,255,255,0.1)"
            : "0 8px 30px rgba(0,0,0,0.1)",
        },
      }}
    >
      <CardMedia
        component="img"
        height={{ xs: 150, sm: 200 }}
        image={product.imagen || defaultImage}
        alt={product.nombre || "Producto"}
        sx={{
          objectFit: "cover",
        }}
      />
      <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            mb: { xs: 1, sm: 2 },
            fontSize: { xs: "1.1rem", sm: "1.25rem" },
            background: "linear-gradient(45deg, #FF3366, #FF9933)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
          }}
        >
          {product.nombre}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.descripcion}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            ${product.precio}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Stock: {product.stock}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleAddToCart}
          disabled={!product.stock || product.stock <= 0}
          sx={{
            background: "linear-gradient(45deg, #FF3366 30%, #FF9933 90%)",
            color: "white",
            "&:hover": {
              background: "linear-gradient(45deg, #FF3366 60%, #FF9933 90%)",
            },
            "&:disabled": {
              background: darkMode
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.1)",
              color: darkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
            },
          }}
        >
          Agregar al Carrito
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
