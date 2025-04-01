import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Box,
  Typography,
  Divider,
  TextField,
  Link,
  Switch,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import EmailVerification from "./EmailVerification";
import RewardsPanel from "./RewardsPanel";
import { useAuth } from "../context/AuthContext";

const LoginButton = ({ toggleTheme, mode }) => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [verificationOpen, setVerificationOpen] = useState(false);
  const [rewardsOpen, setRewardsOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user, login, logout } = useAuth();

  const handleSubmit = () => {
    if (isRegistering) {
      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }
    }

    const isAdmin = email === "admin@techstore.com" && password === "admin123";
    login({
      email,
      password,
      uid: "123",
      role: isAdmin ? "admin" : "user",
      privileges: {
        canManageProducts: isAdmin,
        canManageUsers: isAdmin,
        canViewStats: isAdmin,
      },
    });

    setLoginOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setIsRegistering(false);
  };

  const handleClose = () => {
    setLoginOpen(false);
    resetForm();
  };

  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  if (user) {
    return (
      <>
        <IconButton onClick={handleMenuClick} sx={{ ml: 1 }}>
          <Avatar sx={{ bgcolor: "primary.main" }}>
            {user.email[0].toUpperCase()}
          </Avatar>
        </IconButton>

        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
          PaperProps={{
            className: "glass-effect",
            sx: { minWidth: 200 },
          }}
        >
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle1">{user.email}</Typography>
            <Typography variant="body2" color="text.secondary">
              Nivel: {user.rewards.tier}
            </Typography>
          </Box>
          <Divider />

          {!user.emailVerified && (
            <MenuItem onClick={() => setVerificationOpen(true)}>
              Verificar Email
            </MenuItem>
          )}

          <MenuItem onClick={() => setRewardsOpen(true)}>
            Mis Recompensas
          </MenuItem>

          <Divider />
          <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
        </Menu>

        <Dialog
          open={rewardsOpen}
          onClose={() => setRewardsOpen(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            className: "glass-effect",
          }}
        >
          <RewardsPanel />
        </Dialog>

        <EmailVerification
          open={verificationOpen}
          onClose={() => setVerificationOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <Button
        onClick={() => setLoginOpen(true)}
        startIcon={<PersonIcon />}
        sx={{
          background: "var(--primary-gradient)",
          color: "white",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
          },
        }}
      >
        Iniciar Sesión
      </Button>

      <Dialog
        open={loginOpen}
        onClose={handleClose}
        PaperProps={{
          className: "glass-effect",
          sx: { borderRadius: 2, minWidth: 320 },
        }}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">
            {isRegistering ? "Registro" : "Iniciar Sesión"}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DarkModeIcon />
            <Switch
              checked={mode === "dark"}
              onChange={toggleTheme}
              color="default"
            />
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              variant="outlined"
            />
            {isRegistering && (
              <TextField
                label="Confirmar Contraseña"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                variant="outlined"
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, flexDirection: "column", gap: 1 }}>
          <Button onClick={handleSubmit} variant="contained" fullWidth>
            {isRegistering ? "Registrarse" : "Iniciar Sesión"}
          </Button>
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <Link
              component="button"
              variant="body2"
              onClick={() => setIsRegistering(!isRegistering)}
              sx={{ textDecoration: "none" }}
            >
              {isRegistering
                ? "¿Ya tienes cuenta? Inicia sesión"
                : "¿No tienes cuenta? Regístrate"}
            </Link>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoginButton;
