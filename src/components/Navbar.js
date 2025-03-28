import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { state } = useCart();
  const { darkMode, toggleTheme } = useTheme();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: darkMode
          ? "rgba(0, 0, 0, 0.5)"
          : "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(10px)",
        borderBottom: `1px solid ${
          darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
        }`,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            height: { xs: 60, sm: 70 },
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "nowrap",
            overflowX: "auto",
            px: { xs: 1, sm: 2 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.5, sm: 1 },
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            <Box
              component="img"
              src="/assets/logo.svg"
              alt="Alex Store"
              sx={{
                height: { xs: "28px", sm: "32px" },
                width: "auto",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            />
            <Typography
              variant="h5"
              sx={{
                background: "linear-gradient(45deg, #FF3366, #FF9933)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 700,
                fontSize: { xs: "1.2rem", sm: "1.5rem" },
                display: { xs: "none", sm: "block" },
                letterSpacing: "0.5px",
              }}
            >
              Alex Store
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: { xs: 1, sm: 2, md: 3 },
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <Button
              sx={{
                color: darkMode ? "text.secondary" : "text.primary",
                "&:hover": { color: darkMode ? "white" : "black" },
                display: { xs: "none", sm: "flex" },
              }}
              onClick={() => navigate("/products")}
            >
              Productos
            </Button>
            {user ? (
              <>
                {user.role === "admin" && (
                  <Button
                    sx={{
                      color: darkMode ? "text.secondary" : "text.primary",
                      "&:hover": { color: darkMode ? "white" : "black" },
                      display: { xs: "none", sm: "flex" },
                    }}
                    onClick={() => navigate("/admin")}
                  >
                    Admin
                  </Button>
                )}
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: darkMode
                      ? "rgba(255,255,255,0.2)"
                      : "rgba(0,0,0,0.2)",
                    color: darkMode ? "white" : "black",
                    padding: { xs: "4px 8px", sm: "6px 16px" },
                    minWidth: { xs: "auto", sm: "64px" },
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  }}
                  onClick={handleLogout}
                >
                  Salir
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(45deg, #FF3366 30%, #FF9933 90%)",
                  color: "white",
                  padding: { xs: "4px 8px", sm: "6px 16px" },
                  minWidth: { xs: "auto", sm: "64px" },
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
            <IconButton
              sx={{
                color: darkMode ? "white" : "black",
                background: darkMode
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.1)",
                padding: { xs: "8px", sm: "12px" },
              }}
              onClick={() => navigate("/checkout")}
            >
              <ShoppingCartIcon
                sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
              />
              <Typography
                sx={{
                  ml: 0.5,
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                }}
              >
                {state.items.length}
              </Typography>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
