import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3B82F6",
      light: "#60A5FA",
      dark: "#2563EB",
    },
    secondary: {
      main: "#10B981",
      light: "#34D399",
      dark: "#059669",
    },
    background: {
      default: "#F8FAFC",
      paper: "rgba(255, 255, 255, 0.95)",
    },
    text: {
      primary: "#1E293B",
      secondary: "#64748B",
    },
    action: {
      hover: "rgba(59, 130, 246, 0.04)",
      selected: "rgba(59, 130, 246, 0.08)",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.12)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          padding: "10px 24px",
          fontWeight: 500,
          letterSpacing: "0.02em",
          transition: "all 0.2s",
          "&:hover": {
            transform: "translateY(-2px)",
            backgroundColor: "rgba(59, 130, 246, 0.08)",
          },
        },
        contained: {
          background: "linear-gradient(145deg, #3B82F6, #2563EB)",
          boxShadow: "0 4px 12px rgba(59, 130, 246, 0.2)",
          "&:hover": {
            background: "linear-gradient(145deg, #60A5FA, #3B82F6)",
            boxShadow: "0 6px 16px rgba(59, 130, 246, 0.25)",
          },
        },
        outlined: {
          borderColor: "#3B82F6",
          "&:hover": {
            borderColor: "#2563EB",
            backgroundColor: "rgba(59, 130, 246, 0.04)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(248, 250, 252, 0.8)",
          backdropFilter: "blur(10px)",
          boxShadow: "none",
          borderBottom: "1px solid rgba(30, 41, 59, 0.05)",
          color: "#1E293B",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            transition: "all 0.2s",
            "&:hover": {
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            },
            "&.Mui-focused": {
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: "all 0.2s",
          "&:hover": {
            transform: "translateY(-2px)",
          },
        },
      },
    },
  },
});
