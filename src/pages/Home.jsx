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
              ? "linear-gradient(135deg, #1E1E2F 0%, #2D2D44 100%)"
              : "linear-gradient(45deg, #4353FF 30%, #6B7AFF 90%)",
          color: "#ffffff",
          py: { xs: 8, md: 12 },
          position: "relative",
          overflow: "hidden",
          borderBottom:
            mode === "dark" ? "1px solid rgba(255,255,255,0.1)" : "none",
          animation: "gradientMove 15s ease infinite",
          "@keyframes gradientMove": {
            "0%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
            "100%": { backgroundPosition: "0% 50%" },
          },
          "&::before": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "200%",
            height: "200%",
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${
              mode === "dark" ? "rgba(67,83,255,0.1)" : "rgba(255,255,255,0.1)"
            } 0%, transparent 50%)`,
            animation: "pulse 10s ease infinite",
            "@keyframes pulse": {
              "0%": { opacity: 0.5 },
              "50%": { opacity: 0.8 },
              "100%": { opacity: 0.5 },
            },
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                animation: "slideIn 1s ease-out",
                "@keyframes slideIn": {
                  from: { transform: "translateX(-50px)", opacity: 0 },
                  to: { transform: "translateX(0)", opacity: 1 },
                },
              }}
            >
              <Logo size="large" variant="minimal" />
              <Typography
                variant="h3"
                sx={{
                  mt: 4,
                  mb: 2,
                  fontWeight: 700,
                  textShadow:
                    mode === "dark"
                      ? "0 0 30px rgba(67,83,255,0.5)"
                      : "2px 2px 4px rgba(0,0,0,0.3)",
                  color: mode === "dark" ? "#fff" : "#fff",
                }}
              >
                Tu Estilo, Tu Identidad
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  opacity: mode === "dark" ? 0.8 : 0.9,
                  color: mode === "dark" ? "#E0E0E0" : "#fff",
                }}
              >
                Encuentra las últimas tendencias y diseños exclusivos para ti
              </Typography>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/productos"
                sx={{
                  bgcolor: mode === "dark" ? "#4353FF" : "#ffffff",
                  color: mode === "dark" ? "#ffffff" : "#4353FF",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                    transition: "0.5s",
                  },
                  "&:hover": {
                    bgcolor: mode === "dark" ? "#5363FF" : "#f5f5f5",
                    transform: "translateY(-2px)",
                    boxShadow:
                      mode === "dark"
                        ? "0 8px 25px rgba(67,83,255,0.5)"
                        : "0 8px 25px rgba(67,83,255,0.2)",
                    "&::before": {
                      left: "100%",
                    },
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Explorar Productos
              </Button>
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
