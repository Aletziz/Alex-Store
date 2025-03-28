import { createTheme } from "@mui/material";

const getTheme = (darkMode) =>
  createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#fff" : "#000",
      },
      background: {
        default: darkMode ? "#000" : "#fff",
        paper: darkMode ? "#111" : "#f5f5f7",
      },
      text: {
        primary: darkMode ? "#fff" : "#000",
        secondary: darkMode ? "#888" : "#666",
      },
    },
    typography: {
      fontFamily: "Inter, system-ui, -apple-system, sans-serif",
      h1: {
        fontSize: "3.5rem",
        fontWeight: 700,
        background: "linear-gradient(45deg, #FF3366, #FF9933)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      },
      h5: {
        fontWeight: 600,
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(0, 0, 0, 0.02)",
            borderRadius: 16,
            border: `1px solid ${
              darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
            }`,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: darkMode
                ? "0 4px 20px rgba(255,255,255,0.1)"
                : "0 4px 20px rgba(0,0,0,0.1)",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: "none",
            fontWeight: 500,
            transition: "all 0.3s ease",
          },
          contained: {
            background: "linear-gradient(45deg, #FF3366 30%, #FF9933 90%)",
            color: "white",
            "&:hover": {
              background: "linear-gradient(45deg, #FF3366 60%, #FF9933 90%)",
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 8,
              backgroundColor: darkMode
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(0, 0, 0, 0.02)",
            },
          },
        },
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    components: {
      MuiContainer: {
        styleOverrides: {
          root: {
            px: { xs: 2, sm: 3, md: 4 },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            height: "100%",
            display: "flex",
            flexDirection: "column",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: { xs: "none", sm: "translateY(-8px)" },
            },
          },
        },
      },
    },
  });

export default getTheme;
