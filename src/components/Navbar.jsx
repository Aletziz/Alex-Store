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
import { motion } from "framer-motion";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
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
import UserRewardsDialog from "./UserRewardsDialog";

// Añade el import al inicio del archivo
import { ShippingAddressModal } from "./ShippingAddressModal";
import { PaymentMethodModal } from "./PaymentMethodModal";
import EditProfileModal from "./EditProfileModal";

// Añade este componente Drawer después de los imports
const SettingsDrawer = ({
  open,
  onClose,
  mode,
  toggleTheme,
  notificationsEnabled,
  handleNotificationsToggle,
  onShippingClick,
  onPaymentClick,
  selectedCurrency,
  onCurrencyChange,
  selectedLanguage,
  onLanguageChange,
  selectedPaymentMethod, // Agregar esta prop
}) => {
  const [currencyMenu, setCurrencyMenu] = useState(null);
  const [languageMenu, setLanguageMenu] = useState(null);

  const currencies = [
    { code: "CUP", name: "Peso Cubano (CUP)", symbol: "₱" },
    { code: "USD", name: "Dólar Estadounidense (USD)", symbol: "$" },
    { code: "MLC", name: "Moneda Libremente Convertible (MLC)", symbol: "MLC" },
  ];

  const paymentMethods = [
    { id: "bandec", name: "BANDEC", icon: "🏦" },
    { id: "popular", name: "Banco Popular", icon: "🏦" },
    { id: "transfer", name: "Transferencia", icon: "💳" },
  ];

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 350,
          background:
            mode === "dark"
              ? "linear-gradient(135deg, #1a1c2a 0%, #2d2f45 100%)"
              : "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",
          p: 3,
        },
      }}
    >
      <Box sx={{ mb: 4 }}>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              fontWeight: 600,
              background:
                mode === "dark"
                  ? "linear-gradient(45deg, #5363FF 30%, #7376F2 90%)"
                  : "linear-gradient(45deg, #1e3a6d 30%, #2c4b8c 90%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Configuración
          </Typography>
        </motion.div>

        <List>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <ListItem sx={{ mb: 2 }}>
              <ListItemIcon>
                <DarkModeIcon color={mode === "dark" ? "primary" : "inherit"} />
              </ListItemIcon>
              <ListItemText
                primary="Modo Oscuro"
                secondary="Cambia la apariencia de la aplicación"
              />
              <Switch checked={mode === "dark"} onChange={toggleTheme} />
            </ListItem>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <ListItem sx={{ mb: 2 }}>
              <ListItemIcon>
                <NotificationsIcon
                  color={notificationsEnabled ? "primary" : "inherit"}
                />
              </ListItemIcon>
              <ListItemText
                primary="Notificaciones"
                secondary="Recibe alertas de ofertas y pedidos"
              />
              <Switch
                checked={notificationsEnabled}
                onChange={handleNotificationsToggle}
              />
            </ListItem>
          </motion.div>

          <Divider sx={{ my: 2 }} />

          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ px: 2, mb: 1 }}
          >
            Preferencias de Compra
          </Typography>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <ListItem button onClick={onShippingClick} sx={{ mb: 1 }}>
              <ListItemIcon>
                <LocalShippingIcon />
              </ListItemIcon>
              <ListItemText
                primary="Dirección de Envío"
                secondary="Gestiona tus direcciones en Cuba"
              />
            </ListItem>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <ListItem button onClick={onPaymentClick} sx={{ mb: 1 }}>
              <ListItemIcon>
                <CreditCardIcon />
              </ListItemIcon>
              <ListItemText
                primary="Métodos de Pago"
                secondary={`${
                  paymentMethods.find((m) => m.id === selectedPaymentMethod)
                    ?.name || "Seleccionar método"
                }`}
              />
            </ListItem>
          </motion.div>

          <Divider sx={{ my: 2 }} />
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ px: 2, mb: 1 }}
          >
            Personalización
          </Typography>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <ListItem
              button
              onClick={(e) => setLanguageMenu(e.currentTarget)}
              sx={{ mb: 1 }}
            >
              <ListItemIcon>
                <LanguageIcon />
              </ListItemIcon>
              <ListItemText
                primary="Idioma"
                secondary={selectedLanguage === "es" ? "Español" : "English"}
              />
            </ListItem>
          </motion.div>

          <Menu
            anchorEl={languageMenu}
            open={Boolean(languageMenu)}
            onClose={() => setLanguageMenu(null)}
          >
            <MenuItem
              onClick={() => {
                onLanguageChange("es");
                setLanguageMenu(null);
              }}
            >
              🇨🇺 Español
            </MenuItem>
            <MenuItem
              onClick={() => {
                onLanguageChange("en");
                setLanguageMenu(null);
              }}
            >
              🇺🇸 English
            </MenuItem>
          </Menu>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <ListItem
              button
              onClick={(e) => setCurrencyMenu(e.currentTarget)}
              sx={{ mb: 1 }}
            >
              <ListItemIcon>
                <AttachMoneyIcon />
              </ListItemIcon>
              <ListItemText
                primary="Moneda"
                secondary={`${
                  currencies.find((c) => c.code === selectedCurrency)?.name
                }`}
              />
            </ListItem>
          </motion.div>

          <Menu
            anchorEl={currencyMenu}
            open={Boolean(currencyMenu)}
            onClose={() => setCurrencyMenu(null)}
          >
            {currencies.map((currency) => (
              <MenuItem
                key={currency.code}
                onClick={() => {
                  onCurrencyChange(currency.code);
                  setCurrencyMenu(null);
                }}
              >
                {currency.symbol} {currency.name}
              </MenuItem>
            ))}
          </Menu>
        </List>
      </Box>
    </Drawer>
  );
};

const Navbar = () => {
  const { mode, toggleTheme } = useTheme();
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Estados
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("CUP");
  const [selectedLanguage, setSelectedLanguage] = useState("es");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("bandec");

  // Handlers
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate("/");
  };

  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleShippingClick = () => {
    setShippingOpen(true);
    setSettingsOpen(false);
  };

  const handlePaymentClick = () => {
    setPaymentOpen(true);
    setSettingsOpen(false);
  };

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuOpen = () => {
    setEditProfileOpen(true);
    handleClose();
  };

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  const handleRewardsClick = () => {
    setRewardsDialogOpen(true);
    handleClose();
  };

  const [rewardsDialogOpen, setRewardsDialogOpen] = useState(false);

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

            {user ? (
              <Box sx={{ position: "relative" }}>
                <IconButton
                  onClick={handleMenu}
                  sx={{
                    transition:
                      "all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                    p: 1,
                    border: "2px solid",
                    borderColor: mode === "dark" ? "#5363FF40" : "#ffffff40",
                    "&:hover": {
                      transform: "scale(1.1)",
                      borderColor: mode === "dark" ? "#5363FF" : "#fff",
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
                    sx: {
                      mt: 1.5,
                      background: mode === "dark" ? "#2A2B3D" : "#fff",
                      borderRadius: 2,
                      boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                      minWidth: 220,
                    },
                  }}
                >
                  <Box sx={{ p: 2, textAlign: "center" }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {user.displayName || "Usuario"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Nivel {user.level || 1}
                    </Typography>
                    <Box
                      sx={{
                        mt: 1,
                        width: "100%",
                        height: 4,
                        bgcolor: mode === "dark" ? "#ffffff20" : "#00000020",
                        borderRadius: 1,
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          width: `${user.experience || 30}%`,
                          height: "100%",
                          bgcolor: mode === "dark" ? "#5363FF" : "#1e3a6d",
                          transition: "width 0.3s ease",
                        }}
                      />
                    </Box>
                  </Box>
                  <Divider />
                  <MenuItem onClick={handleClose} sx={{ py: 1.5 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: 1,
                          bgcolor: mode === "dark" ? "#5363FF20" : "#1e3a6d20",
                        }}
                      >
                        🏆
                      </Box>
                      <Box>
                        <Typography variant="body1">Tus Recompensas</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {typeof user.rewards === "object"
                            ? `${user.rewards.points || 0} puntos - ${
                                user.rewards.tier || "Nivel Básico"
                              }`
                            : `${user.rewards || 0} puntos`}
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                  <MenuItem onClick={handleProfileMenuOpen} sx={{ py: 1.5 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: 1,
                          bgcolor: mode === "dark" ? "#5363FF20" : "#1e3a6d20",
                        }}
                      >
                        👤
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography>Editar Perfil</Typography>
                      </Box>
                      <Box
                        sx={{
                          transition: "color 0.2s ease",
                          color: "text.secondary",
                        }}
                      >
                        ❯
                      </Box>
                    </Box>
                  </MenuItem>

                  {user.isAdmin && (
                    <MenuItem
                      component={Link}
                      to="/admin"
                      onClick={handleClose}
                      sx={{ py: 1.5 }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          width: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            p: 1,
                            borderRadius: 1,
                            bgcolor:
                              mode === "dark" ? "#5363FF20" : "#1e3a6d20",
                          }}
                        >
                          ⚙️
                        </Box>
                        <Typography>Panel Admin</Typography>
                      </Box>
                    </MenuItem>
                  )}
                  <Divider />
                  <MenuItem
                    onClick={handleLogout}
                    sx={{ py: 1.5, color: "error.main" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: 1,
                          bgcolor: mode === "dark" ? "#ff535320" : "#ff535320",
                        }}
                      >
                        🚪
                      </Box>
                      <Typography>Cerrar Sesión</Typography>
                    </Box>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to="/login"
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
                Iniciar Sesión
              </Button>
            )}

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
                  },
                }}
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <IconButton
              color="inherit"
              onClick={toggleSettings}
              sx={{
                transition: "all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                p: 1,
                "&:hover": {
                  transform: "rotate(90deg) scale(1.2)",
                },
                "&:active": {
                  transform: "rotate(45deg) scale(0.9)",
                },
              }}
            >
              <SettingsIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Añadir el SettingsDrawer aquí */}
      <SettingsDrawer
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        mode={mode}
        toggleTheme={toggleTheme}
        notificationsEnabled={notificationsEnabled}
        handleNotificationsToggle={handleNotificationsToggle}
        onShippingClick={handleShippingClick}
        onPaymentClick={handlePaymentClick}
        selectedCurrency={selectedCurrency}
        onCurrencyChange={handleCurrencyChange}
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
        selectedPaymentMethod={selectedPaymentMethod} // Agregar esta prop
      />

      <ShippingAddressModal
        open={shippingOpen}
        onClose={() => setShippingOpen(false)}
      />

      <PaymentMethodModal
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
      />

      <EditProfileModal
        open={editProfileOpen}
        onClose={() => setEditProfileOpen(false)}
      />

      <UserRewardsDialog
        open={rewardsDialogOpen}
        onClose={() => setRewardsDialogOpen(false)}
      />
    </>
  );
};

export default Navbar;
