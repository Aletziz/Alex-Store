import React from "react";
import { Box, Typography } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

const Logo = ({ size = "medium", variant = "default" }) => {
  const logoSizes = {
    small: { icon: 24, text: "h6", spacing: 1 },
    medium: { icon: 32, text: "h5", spacing: 1.5 },
    large: { icon: 48, text: "h3", spacing: 2 },
  };

  const styles = {
    default: {
      container: {
        display: "flex",
        alignItems: "center",
        gap: logoSizes[size].spacing,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
        },
      },
      icon: {
        fontSize: logoSizes[size].icon,
        color: "#4353FF", // Modern blue
        filter: "drop-shadow(0 2px 8px rgba(67, 83, 255, 0.2))",
        animation: "float 3s ease-in-out infinite",
        "@keyframes float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      text: {
        fontWeight: 800,
        fontFamily: '"Inter", sans-serif',
        background: (theme) => `linear-gradient(135deg, #4353FF, #A5AFFB)`, // Professional gradient
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        letterSpacing: "0.5px",
        position: "relative",
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: -2,
          left: 0,
          width: "100%",
          height: "2px",
          background: "linear-gradient(90deg, #4353FF, transparent)",
          opacity: 0,
          transition: "opacity 0.3s ease",
        },
        "&:hover::after": {
          opacity: 1,
        },
      },
    },
    minimal: {
      container: {
        display: "flex",
        alignItems: "center",
        gap: 1,
      },
      icon: {
        fontSize: logoSizes[size].icon,
        color: "#4353FF",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "rotate(10deg)",
        },
      },
      text: {
        fontWeight: 700,
        color: (theme) =>
          theme.palette.mode === "dark" ? "#FFFFFF" : "#1A1A1A",
        letterSpacing: "0.5px",
      },
    },
  };

  return (
    <Box sx={styles[variant].container}>
      <ShoppingBagOutlinedIcon sx={styles[variant].icon} />
      <Typography variant={logoSizes[size].text} sx={styles[variant].text}>
        Alex Store
      </Typography>
    </Box>
  );
};

export default Logo;
