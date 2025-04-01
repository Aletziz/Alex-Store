import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { Visibility, VisibilityOff, LoginOutlined } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Login = () => {
  const { mode } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData);
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={3}
          sx={{
            mt: 8,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background:
              mode === "dark"
                ? "linear-gradient(135deg, #1a1c2a 0%, #2d2f45 100%)"
                : "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",
            borderRadius: 3,
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: "linear-gradient(90deg, #5363FF, #7376F2)",
              animation: "shimmer 2s infinite linear",
            },
          }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Typography
              component="h1"
              variant="h4"
              sx={{
                mb: 3,
                background:
                  mode === "dark"
                    ? "linear-gradient(45deg, #5363FF 30%, #7376F2 90%)"
                    : "linear-gradient(45deg, #1e3a6d 30%, #2c4b8c 90%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                fontWeight: "bold",
              }}
            >
              Iniciar Sesión
            </Typography>
          </motion.div>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: mode === "dark" ? "#5363FF40" : "#1e3a6d40",
                    },
                    "&:hover fieldset": {
                      borderColor: mode === "dark" ? "#5363FF" : "#1e3a6d",
                    },
                  },
                }}
              />
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: mode === "dark" ? "#5363FF40" : "#1e3a6d40",
                    },
                    "&:hover fieldset": {
                      borderColor: mode === "dark" ? "#5363FF" : "#1e3a6d",
                    },
                  },
                }}
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  background:
                    mode === "dark"
                      ? "linear-gradient(45deg, #5363FF 30%, #7376F2 90%)"
                      : "linear-gradient(45deg, #1e3a6d 30%, #2c4b8c 90%)",
                  color: "#fff",
                  textTransform: "none",
                  fontSize: "1.1rem",
                  padding: "12px",
                  borderRadius: "8px",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)",
                    transform: "translateX(-100%)",
                    transition: "transform 0.6s",
                  },
                  "&:hover::before": {
                    transform: "translateX(100%)",
                  },
                }}
                disabled={loading}
                endIcon={
                  loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <LoginOutlined />
                  )
                }
              >
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                onClick={() => navigate("/registro")}
                fullWidth
                sx={{
                  color: mode === "dark" ? "#5363FF" : "#1e3a6d",
                  textTransform: "none",
                  "&:hover": {
                    background: "transparent",
                    textDecoration: "underline",
                  },
                }}
              >
                ¿No tienes cuenta? Regístrate
              </Button>
            </motion.div>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Login;
