import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useTheme } from "../context/ThemeContext";
import AnimatedBackground from "../components/AnimatedBackground";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

const Productos = () => {
  const { mode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const categories = [
    { name: "Todos", icon: "🌟" },
    { name: "Ropa", icon: "👕" },
    { name: "Calzado", icon: "👞" },
    { name: "Accesorios", icon: "👜" },
    { name: "Deportivo", icon: "🏃" },
  ];

  const products = [
    {
      id: 1,
      name: "Chaqueta Premium",
      price: "$129.99",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
      category: "Ropa",
      tags: ["Nuevo", "Destacado"],
      rating: 4.5,
    },
    // Add more products...
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: mode === "dark" ? "background.default" : "#ffffff",
      }}
    >
      <AnimatedBackground>
        <Container maxWidth="xl">
          <Box sx={{ pt: 8, pb: 6 }}>
            <Typography
              variant="h2"
              sx={{
                textAlign: "center",
                fontWeight: 800,
                background:
                  mode === "dark"
                    ? "linear-gradient(90deg, #5363FF 0%, #8B63FF 100%)"
                    : "linear-gradient(90deg, #1e3a6d 0%, #2c4b8c 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                mb: 4,
              }}
            >
              Explora Nuestra Colección
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
                mb: 6,
              }}
            >
              <TextField
                placeholder="Buscar productos..."
                variant="outlined"
                sx={{
                  width: { xs: "100%", sm: "400px" },
                  "& .MuiOutlinedInput-root": {
                    bgcolor:
                      mode === "dark"
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(255,255,255,0.9)",
                    borderRadius: 2,
                    "&:hover": {
                      "& fieldset": {
                        borderColor: mode === "dark" ? "#5363FF" : "#1e3a6d",
                      },
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        sx={{ color: mode === "dark" ? "#5363FF" : "#1e3a6d" }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                startIcon={<FilterListIcon />}
                variant="contained"
                sx={{
                  bgcolor: mode === "dark" ? "#5363FF" : "#1e3a6d",
                  "&:hover": {
                    bgcolor: mode === "dark" ? "#4353EF" : "#152a5c",
                  },
                }}
              >
                Filtros
              </Button>
            </Box>

            <Grid container spacing={2} justifyContent="center" sx={{ mb: 6 }}>
              {categories.map((category) => (
                <Grid item key={category.name}>
                  <Chip
                    label={`${category.icon} ${category.name}`}
                    onClick={() => setSelectedCategory(category.name)}
                    sx={{
                      px: 2,
                      py: 3,
                      fontSize: "1rem",
                      bgcolor:
                        selectedCategory === category.name
                          ? mode === "dark"
                            ? "#5363FF"
                            : "#1e3a6d"
                          : mode === "dark"
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(255,255,255,0.9)",
                      color:
                        selectedCategory === category.name ? "#fff" : "inherit",
                      "&:hover": {
                        bgcolor: mode === "dark" ? "#4353EF" : "#152a5c",
                        color: "#fff",
                      },
                      transition: "all 0.3s ease",
                    }}
                  />
                </Grid>
              ))}
            </Grid>

            <Grid container spacing={4}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <Paper
                    elevation={0}
                    sx={{
                      bgcolor:
                        mode === "dark"
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(255,255,255,0.9)",
                      borderRadius: 2,
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow:
                          mode === "dark"
                            ? "0 8px 30px rgba(83,99,255,0.2)"
                            : "0 8px 30px rgba(30,58,109,0.2)",
                      },
                    }}
                  >
                    {/* Product content here */}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </AnimatedBackground>
    </Box>
  );
};

export default Productos;
