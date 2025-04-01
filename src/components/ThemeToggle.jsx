import React from "react";
import { IconButton, Box, useTheme } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const ThemeToggle = ({ toggleTheme }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        position: "relative",
        width: 50,
        height: 26,
        borderRadius: 13,
        background: isDark
          ? "linear-gradient(45deg, #1a237e, #311b92)"
          : "linear-gradient(45deg, #42a5f5, #29b6f6)",
        cursor: "pointer",
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
          filter: "brightness(1.1)",
        },
      }}
      onClick={toggleTheme}
    >
      <Box
        sx={{
          position: "absolute",
          left: isDark ? "2px" : "calc(100% - 24px - 2px)",
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "#fff",
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        }}
      >
        {isDark ? (
          <DarkModeIcon sx={{ fontSize: 16, color: "#5c6bc0" }} />
        ) : (
          <LightModeIcon sx={{ fontSize: 16, color: "#ffa726" }} />
        )}
      </Box>
    </Box>
  );
};

export default ThemeToggle;
