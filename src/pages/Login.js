import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import API_URL from '../config/api';

const Login = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.usuario));

        if (data.usuario.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setError(data.mensaje || "Error al iniciar sesión");
      }
    } catch (error) {
      setError("Error de conexión");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: { xs: 2, sm: 4, md: 8 },
        px: { xs: 2, sm: 3 },
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          width: "100%",
          maxWidth: { xs: "100%", sm: 450 },
          mx: "auto",
          backgroundColor: darkMode
            ? "rgba(255, 255, 255, 0.05)"
            : "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          border: 1,
          borderColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: { xs: 2, sm: 3, md: 4 },
            textAlign: "center",
            background: "linear-gradient(45deg, #FF3366, #FF9933)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
            fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
          }}
        >
          Iniciar Sesión
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: { xs: 1, sm: 2 },
            "& .MuiTextField-root": {
              mb: { xs: 1.5, sm: 2 },
            },
          }}
        >
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                height: { xs: 45, sm: 56 },
              },
            }}
          />
          <TextField
            fullWidth
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                height: { xs: 45, sm: 56 },
              },
            }}
          />

          {error && (
            <Typography
              color="error"
              sx={{
                mb: { xs: 1, sm: 2 },
                textAlign: "center",
                fontSize: { xs: "0.8rem", sm: "0.875rem" },
              }}
            >
              {error}
            </Typography>
          )}

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              py: { xs: 1, sm: 1.5 },
              mt: { xs: 1, sm: 2 },
              background: "linear-gradient(45deg, #FF3366 30%, #FF9933 90%)",
              color: "white",
              fontSize: { xs: "0.9rem", sm: "1rem" },
              "&:hover": {
                background: "linear-gradient(45deg, #FF3366 60%, #FF9933 90%)",
              },
            }}
          >
            Ingresar
          </Button>

          <Box sx={{ mt: { xs: 2, sm: 3 }, textAlign: "center" }}>
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate("/register")}
              sx={{
                color: darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
                textDecoration: "none",
                fontSize: { xs: "0.8rem", sm: "0.875rem" },
                "&:hover": {
                  color: darkMode ? "white" : "black",
                },
              }}
            >
              ¿No tienes cuenta? Regístrate aquí
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
