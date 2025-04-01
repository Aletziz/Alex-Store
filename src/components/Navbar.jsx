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
          bgcolor: mode === "dark" ? "background.paper" : "primary.main",
        }}
      >
        <Toolbar>
          <Box
            component={Link}
            to="/"
            sx={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}
          >
            <Logo size="medium" variant="default" />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
            <Button
              color="inherit"
              component={Link}
              to="/productos"
              sx={{
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                },
              }}
            >
              Productos
            </Button>

            {user ? (
              <>
                <IconButton
                  onClick={handleMenu}
                  color="inherit"
                  sx={{
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  {user.photoURL ? (
                    <Avatar
                      src={user.photoURL}
                      sx={{
                        width: 32,
                        height: 32,
                        border: "2px solid transparent",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          borderColor: "primary.light",
                        },
                      }}
                    />
                  ) : (
                    <AccountCircleIcon />
                  )}
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      mt: 1.5,
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    },
                  }}
                >
                  <MenuItem component={Link} to="/perfil" onClick={handleClose}>
                    Mi Perfil
                  </MenuItem>
                  {user.isAdmin && (
                    <MenuItem
                      component={Link}
                      to="/admin"
                      onClick={handleClose}
                    >
                      Panel Admin
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{
                  transition: "all 0.3s ease",
                  position: "relative",
                  "&:hover": {
                    transform: "translateY(-3px)",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "100%",
                    height: "2px",
                    bottom: -2,
                    left: 0,
                    background: "currentColor",
                    transform: "scaleX(0)",
                    transition: "transform 0.3s ease",
                  },
                  "&:hover::after": {
                    transform: "scaleX(1)",
                  },
                }}
              >
                Iniciar Sesión
              </Button>
            )}

            <IconButton
              color="inherit"
              component={Link}
              to="/carrito"
              sx={{
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1) rotate(5deg)",
                },
              }}
            >
              <Badge badgeContent={cart.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <IconButton
              color="inherit"
              onClick={toggleSettings}
              sx={{
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "rotate(180deg)",
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
