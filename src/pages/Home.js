import React from "react";
import { Container, Typography, Box, Grid, Paper } from "@mui/material";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const { darkMode } = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        pt: { xs: 7, sm: 8, md: 9 },
        pb: { xs: 3, sm: 4, md: 6 },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {/* Hero Section */}
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 3, sm: 4, md: 6 },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3.5rem" },
              fontWeight: "bold",
              mb: { xs: 1.5, sm: 2 },
              lineHeight: { xs: 1.2, sm: 1.3 },
              background: "linear-gradient(45deg, #FF3366, #FF9933)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Bienvenido a nuestra tienda
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "0.875rem", sm: "1rem", md: "1.25rem" },
              color: darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
              maxWidth: "800px",
              mx: "auto",
              px: { xs: 1, sm: 2 },
              lineHeight: { xs: 1.4, sm: 1.5 },
            }}
          >
            Descubre nuestra selección de productos de alta calidad
          </Typography>
        </Box>

        {/* Features Section con Grid ajustado */}
        <Grid
          container
          spacing={{ xs: 2, sm: 3 }}
          sx={{ mb: { xs: 3, sm: 4, md: 6 } }}
        >
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 3 },
                  height: "100%",
                  backgroundColor: darkMode
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  border: 1,
                  borderColor: darkMode
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.1)",
                  borderRadius: { xs: 1, sm: 2 },
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: { xs: "none", sm: "translateY(-8px)" },
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  {feature.icon}
                  <Typography
                    variant="h6"
                    sx={{
                      my: 2,
                      fontSize: { xs: "1.1rem", sm: "1.25rem" },
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: darkMode
                        ? "rgba(255,255,255,0.7)"
                        : "rgba(0,0,0,0.7)",
                      fontSize: { xs: "0.9rem", sm: "1rem" },
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Banner Section ajustado */}
        <Box
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: { xs: 1, sm: 2 },
            background: "linear-gradient(45deg, #FF3366, #FF9933)",
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: "1.25rem", sm: "1.75rem", md: "2rem" },
              mb: { xs: 1, sm: 1.5 },
              lineHeight: 1.3,
            }}
          >
            ¡Ofertas Especiales!
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "0.875rem", sm: "1rem" },
              maxWidth: "600px",
              mx: "auto",
              lineHeight: { xs: 1.4, sm: 1.5 },
            }}
          >
            Descubre nuestras últimas promociones y productos destacados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

const features = [
  {
    title: "Envío Rápido",
    description: "Entrega garantizada en 24-48 horas",
    icon: "🚚",
  },
  {
    title: "Calidad Premium",
    description: "Productos seleccionados de alta calidad",
    icon: "⭐",
  },
  {
    title: "Atención 24/7",
    description: "Soporte al cliente disponible todo el día",
    icon: "💬",
  },
];

export default Home;
