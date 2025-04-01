import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Switch,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LanguageIcon from "@mui/icons-material/Language";
import SecurityIcon from "@mui/icons-material/Security";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import Logo from "./Logo";

const Navbar = () => {
  const { mode, toggleTheme } = useTheme();
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    handleClose();
    navigate("/");
  };

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
    // Here you would implement actual notifications logic
  };

  const handleLanguageClick = (event) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLanguageAnchorEl(null);
  };

  const handlePrivacyClick = () => {
    setPrivacyOpen(true);
    toggleSettings(); // Close settings drawer
    navigate("/privacy-settings");
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background:
            mode === "dark"
              ? "linear-gradient(135deg, #1a1c2a 0%, #2d2f45 100%)"
              : "linear-gradient(135deg, #1e3a6d 0%, #2c4b8c 100%)",
          boxShadow:
            mode === "dark"
              ? "0 4px 20px rgba(0,0,0,0.2)"
              : "0 4px 20px rgba(0,0,0,0.15)",
        }}
      >
        <Toolbar>
          <Box
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color:
                mode === "dark"
                  ? "linear-gradient(45deg, #5363FF 30%, #7376F2 90%)"
                  : "linear-gradient(45deg, #E8E9F3 25%, #D1D1E1 90%)",
              flexGrow: 1,
              background:
                mode === "dark"
                  ? "linear-gradient(45deg, #5363FF 30%, #7376F2 90%)"
                  : "linear-gradient(45deg, #E8E9F3 25%, #D1D1E1 90%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              textFillColor: "transparent",
              WebkitTextFillColor: "transparent",
              textShadow:
                mode === "dark"
                  ? "0 0 20px rgba(83,99,255,0.3)"
                  : "0 0 20px rgba(216,217,227,0.3)",
              "&:hover": {
                filter: "brightness(1.2)",
                transform: "scale(1.02)",
                transition: "all 0.3s ease",
              },
            }}
          >
            <Logo size="medium" variant="default" />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              color="inherit"
              component={Link}
              to="/productos"
              sx={{
                transition: "all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                background: mode === "dark" ? "#2A2B3D" : "#ffffff20",
                px: 2.5,
                py: 0.8,
                color: mode === "dark" ? "#E8E9F3" : "#fff",
                fontSize: "0.9rem",
                fontWeight: 600,
                position: "relative",
                overflow: "hidden",
                "&:before": {
                  content: '""',
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "300%",
                  height: "300%",
                  backgroundColor: mode === "dark" ? "#5363FF" : "#ffffff40",
                  transition: "all 0.5s ease",
                  transform:
                    "translate(-50%, -50%) rotate(45deg) translateY(100%)",
                  opacity: 0,
                },
                "&:hover": {
                  transform: "scale(1.05) translateY(-2px)",
                  "&:before": {
                    opacity: 0.1,
                    transform:
                      "translate(-50%, -50%) rotate(45deg) translateY(0)",
                  },
                },
                "&:active": {
                  transform: "scale(0.95) translateY(2px)",
                },
              }}
            >
              Productos
            </Button>

            <Button
              color="inherit"
              component={Link}
              to="/login"
              sx={{
                transition: "all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                background: mode === "dark" ? "#5363FF30" : "#ffffff30",
                px: 3,
                py: 0.8,
                color: mode === "dark" ? "#E8E9F3" : "#fff",
                fontSize: "0.9rem",
                fontWeight: 600,
                "&:hover": {
                  transform: "scale(1.1)",
                  background: mode === "dark" ? "#5363FF40" : "#ffffff40",
                  boxShadow: `0 0 20px ${
                    mode === "dark" ? "#5363FF30" : "#ffffff30"
                  }`,
                },
                "&:active": {
                  transform: "scale(0.9)",
                },
              }}
            >
              Iniciar Sesión
            </Button>

            <IconButton
              color="inherit"
              component={Link}
              to="/carrito"
              sx={{
                transition: "all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                p: 1.2,
                "&:hover": {
                  transform: "rotate(15deg) scale(1.2)",
                  "& .MuiBadge-badge": {
                    transform: "scale(1.2)",
                  },
                },
                "&:active": {
                  transform: "rotate(-15deg) scale(0.9)",
                },
              }}
            >
              <Badge
                badgeContent={cart.length}
                sx={{
                  "& .MuiBadge-badge": {
                    background: mode === "dark" ? "#5363FF" : "#fff",
                    color: mode === "dark" ? "#fff" : "#1e3a6d",
                    transition:
                      "transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                  },
                }}
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <IconButton
              onClick={toggleSettings}
              sx={{
                transition: "all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                p: 1.2,
                "&:hover": {
                  transform: "rotate(180deg) scale(1.2)",
                },
                "&:active": {
                  transform: "rotate(180deg) scale(0.9)",
                },
              }}
            >
              <SettingsIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={settingsOpen}
        onClose={toggleSettings}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: "background.default",
          },
        }}
      >
        <List>
          <ListItem>
            <ListItemIcon>
              <DarkModeIcon />
            </ListItemIcon>
            <ListItemText primary="Modo Oscuro" />
            <Switch checked={mode === "dark"} onChange={toggleTheme} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="Notificaciones" />
            <Switch
              checked={notificationsEnabled}
              onChange={handleNotificationsToggle}
            />
          </ListItem>
          <ListItem button onClick={handleLanguageClick}>
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText primary="Idioma" />
          </ListItem>
          <ListItem button onClick={handlePrivacyClick}>
            <ListItemIcon>
              <SecurityIcon />
            </ListItemIcon>
            <ListItemText primary="Privacidad" />
          </ListItem>
        </List>
      </Drawer>

      <Menu
        anchorEl={languageAnchorEl}
        open={Boolean(languageAnchorEl)}
        onClose={handleLanguageClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 120,
          },
        }}
      >
        <MenuItem onClick={handleLanguageClose}>Español</MenuItem>
        <MenuItem onClick={handleLanguageClose}>English</MenuItem>
        <MenuItem onClick={handleLanguageClose}>Français</MenuItem>
      </Menu>
    </>
  );
};

export default Navbar;
