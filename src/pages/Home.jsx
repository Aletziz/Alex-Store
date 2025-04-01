import React from "react";
import { Box, Container, Typography, Button, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Logo from "../components/Logo";

const Home = () => {
  const { mode } = useTheme();

  return (
    <Box
      sx={{
        bgcolor: mode === "dark" ? "background.default" : "#ffffff",
        minHeight: "100vh",
        transition: "background-color 0.6s ease",
      }}
    >
      <Box
        sx={{
          background:
            mode === "dark"
              ? "linear-gradient(165deg, #0A1128 0%, #1B3A6B 100%)"
              : "linear-gradient(165deg, #3B82F6 0%, #6366F1 100%)",
          color: "#ffffff",
          py: { xs: 12, md: 16 },
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background: `url('https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80')`,
            backgroundSize: "cover",
            opacity: 0.08,
            animation: "rotarFondo 40s linear infinite",
            filter: "blur(30px)",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)",
            animation: "pulsoSuave 8s ease-in-out infinite",
          },
          "@keyframes rotarFondo": {
            "0%": { transform: "rotate(0deg) scale(1)" },
            "50%": { transform: "rotate(180deg) scale(1.2)" },
            "100%": { transform: "rotate(360deg) scale(1)" },
          },
          "@keyframes pulsoSuave": {
            "0%, 100%": { opacity: 0.3 },
            "50%": { opacity: 0.7 },
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Grid container spacing={8} alignItems="center">
            <Grid
              item
              xs={12}
              md={7}
              sx={{
                animation: "slideUpFade 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
                "@keyframes slideUpFade": {
                  from: { transform: "translateY(30px)", opacity: 0 },
                  to: { transform: "translateY(0)", opacity: 1 },
                },
              }}
            >
              <Box sx={{ mb: 6 }}>
                <Typography
                  component="span"
                  sx={{
                    display: "inline-block",
                    background: "linear-gradient(90deg, #FFD700, #FFA500)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    mb: 2,
                    animation: "brillar 2s ease-in-out infinite",
                    "@keyframes brillar": {
                      "0%, 100%": { opacity: 1 },
                      "50%": { opacity: 0.7 },
                    },
                  }}
                >
                  NUEVA COLECCIÓN 2024
                </Typography>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                    fontWeight: 800,
                    letterSpacing: "-1px",
                    lineHeight: 1.1,
                    mb: 3,
                    background:
                      mode === "dark"
                        ? "linear-gradient(90deg, #fff 0%, #e0e0e0 100%)"
                        : "linear-gradient(90deg, #fff 0%, #f0f0f0 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Redefine tu Estilo Personal
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 300,
                    lineHeight: 1.8,
                    opacity: 0.9,
                    maxWidth: "600px",
                    mb: 5,
                  }}
                >
                  Descubre piezas únicas que transformarán tu guardarropa.
                  Calidad premium, diseños exclusivos y el mejor estilo para ti.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 3,
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    component={Link}
                    to="/coleccion"
                    sx={{
                      background:
                        "linear-gradient(45deg, #FFD700 30%, #FFA500 90%)",
                      color: "#000",
                      px: 4,
                      py: 2,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      borderRadius: "full",
                      textTransform: "none",
                      boxShadow: "0 10px 20px rgba(255,215,0,0.2)",
                      "&:hover": {
                        transform: "translateY(-3px) scale(1.02)",
                        boxShadow: "0 15px 30px rgba(255,215,0,0.3)",
                      },
                      transition:
                        "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    }}
                  >
                    Explorar Colección
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    component={Link}
                    to="/lookbook"
                    sx={{
                      borderColor: "rgba(255,255,255,0.5)",
                      borderWidth: 2,
                      color: "#fff",
                      px: 4,
                      py: 2,
                      fontSize: "1.1rem",
                      fontWeight: 500,
                      borderRadius: "full",
                      textTransform: "none",
                      "&:hover": {
                        borderColor: "#fff",
                        background: "rgba(255,255,255,0.1)",
                        transform: "translateY(-3px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Ver Lookbook
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {["Ropa", "Accesorios", "Calzado"].map((category, index) => (
            <Grid
              item
              xs={12}
              md={4}
              key={category}
              sx={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`,
                "@keyframes fadeInUp": {
                  from: { transform: "translateY(20px)", opacity: 0 },
                  to: { transform: "translateY(0)", opacity: 1 },
                },
              }}
            >
              <Paper
                elevation={mode === "dark" ? 0 : 1}
                sx={{
                  p: 4,
                  textAlign: "center",
                  bgcolor:
                    mode === "dark" ? "rgba(255,255,255,0.03)" : "#ffffff",
                  borderRadius: 2,
                  border:
                    mode === "dark"
                      ? "1px solid rgba(255,255,255,0.1)"
                      : "none",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: 2,
                    background:
                      mode === "dark"
                        ? "linear-gradient(45deg, rgba(67,83,255,0.1), transparent)"
                        : "linear-gradient(45deg, rgba(67,83,255,0.05), transparent)",
                    opacity: 0,
                    transition: "opacity 0.4s ease",
                  },
                  "&:hover": {
                    transform: "translateY(-8px) scale(1.02)",
                    "&::before": {
                      opacity: 1,
                    },
                    "& .category-button": {
                      transform: "translateY(0)",
                      opacity: 1,
                    },
                  },
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    color: mode === "dark" ? "#E0E0E0" : "text.primary",
                    fontWeight: 600,
                  }}
                >
                  {category}
                </Typography>
                <Button
                  className="category-button"
                  component={Link}
                  to={`/categoria/${category.toLowerCase()}`}
                  variant={mode === "dark" ? "outlined" : "text"}
                  color="primary"
                  sx={{
                    mt: 2,
                    transform: "translateY(10px)",
                    opacity: 0.7,
                    transition: "all 0.3s ease",
                  }}
                >
                  Ver Más
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
