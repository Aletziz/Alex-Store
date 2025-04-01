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
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  Visibility,
  VisibilityOff,
  PersonAddOutlined,
  NavigateNext,
  NavigateBefore,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Register = () => {
  const { mode } = useTheme();
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    lastName: "",
    phone: "",
  });

  const steps = ["Información básica", "Datos personales", "Confirmación"];

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return;
    }
    setLoading(true);
    try {
      await signup(formData);
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              sx={textFieldStyle}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type={showPassword ? "text" : "password"}
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
              sx={textFieldStyle}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirmar Contraseña"
              type={showPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              sx={textFieldStyle}
            />
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              sx={textFieldStyle}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Apellido"
              name="lastName"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              sx={textFieldStyle}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Teléfono"
              name="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              sx={textFieldStyle}
            />
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Box sx={{ textAlign: "center", my: 3 }}>
              <Typography variant="h6" gutterBottom>
                Confirma tus datos
              </Typography>
              <Typography>Email: {formData.email}</Typography>
              <Typography>
                Nombre: {formData.name} {formData.lastName}
              </Typography>
              <Typography>
                Teléfono: {formData.phone || "No especificado"}
              </Typography>
            </Box>
          </motion.div>
        );
      default:
        return null;
    }
  };

  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: mode === "dark" ? "#5363FF40" : "#1e3a6d40",
      },
      "&:hover fieldset": {
        borderColor: mode === "dark" ? "#5363FF" : "#1e3a6d",
      },
    },
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
            Registro
          </Typography>

          <Stepper activeStep={activeStep} sx={{ width: "100%", mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: "100%" }}
          >
            <AnimatePresence mode="wait">
              {getStepContent(activeStep)}
            </AnimatePresence>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
                startIcon={<NavigateBefore />}
                sx={{
                  color: mode === "dark" ? "#5363FF" : "#1e3a6d",
                }}
              >
                Atrás
              </Button>
              {activeStep === steps.length - 1 ? (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  endIcon={
                    loading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <PersonAddOutlined />
                    )
                  }
                  sx={{
                    background:
                      mode === "dark"
                        ? "linear-gradient(45deg, #5363FF 30%, #7376F2 90%)"
                        : "linear-gradient(45deg, #1e3a6d 30%, #2c4b8c 90%)",
                    color: "#fff",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  {loading ? "Registrando..." : "Completar Registro"}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  endIcon={<NavigateNext />}
                  sx={{
                    color: mode === "dark" ? "#5363FF" : "#1e3a6d",
                  }}
                >
                  Siguiente
                </Button>
              )}
            </Box>
          </Box>

          <Button
            onClick={() => navigate("/login")}
            sx={{
              mt: 2,
              color: mode === "dark" ? "#5363FF" : "#1e3a6d",
              textTransform: "none",
              "&:hover": {
                background: "transparent",
                textDecoration: "underline",
              },
            }}
          >
            ¿Ya tienes cuenta? Inicia sesión
          </Button>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Register;
