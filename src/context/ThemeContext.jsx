import React, { createContext, useContext, useState, useMemo } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                primary: {
                  main: "#0F52BA", // Bright blue
                  light: "#3B82F6",
                  dark: "#1E40AF",
                },
                secondary: {
                  main: "#10B981", // Emerald green
                  light: "#34D399",
                  dark: "#059669",
                },
                background: {
                  default: "#F8FAFC",
                  paper: "#FFFFFF",
                  navbar: "#FFFFFF",
                  card: "#FFFFFF",
                },
                text: {
                  primary: "#1E293B",
                  secondary: "#64748B",
                  accent: "#0F52BA",
                },
                action: {
                  hover: "rgba(15, 82, 186, 0.04)",
                  selected: "rgba(15, 82, 186, 0.08)",
                },
              }
            : {
                primary: {
                  main: "#60A5FA", // Softer blue for dark mode
                  light: "#93C5FD",
                  dark: "#3B82F6",
                },
                secondary: {
                  main: "#34D399",
                  light: "#6EE7B7",
                  dark: "#10B981",
                },
                background: {
                  default: "#0F172A", // Deep navy
                  paper: "#1E293B",
                  navbar: "#1E293B",
                  card: "#1E293B",
                },
                text: {
                  primary: "#F1F5F9",
                  secondary: "#94A3B8",
                  accent: "#60A5FA",
                },
                action: {
                  hover: "rgba(96, 165, 250, 0.08)",
                  selected: "rgba(96, 165, 250, 0.12)",
                },
              }),
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: mode === "dark" ? "#1E293B" : "#FFFFFF",
                color: mode === "dark" ? "#F1F5F9" : "#1E293B",
                boxShadow:
                  mode === "dark"
                    ? "0 4px 6px -1px rgba(0, 0, 0, 0.3)"
                    : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                backgroundColor: mode === "dark" ? "#1E293B" : "#FFFFFF",
                borderRadius: 16,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow:
                    mode === "dark"
                      ? "0 20px 25px -5px rgba(0, 0, 0, 0.5)"
                      : "0 20px 25px -5px rgba(15, 82, 186, 0.15)",
                },
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                textTransform: "none",
                fontWeight: 600,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                },
              },
              contained: {
                boxShadow:
                  mode === "dark"
                    ? "0 4px 6px -1px rgba(0, 0, 0, 0.3)"
                    : "0 4px 6px -1px rgba(15, 82, 186, 0.2)",
              },
            },
          },
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: mode === "dark" ? "#0F172A" : "#FFFFFF",
                transition: "background-color 0.3s ease",
              },
            },
          },
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        shape: {
          borderRadius: 12,
        },
        transitions: {
          easing: {
            easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
          },
          duration: {
            shortest: 150,
            shorter: 200,
            short: 250,
            standard: 300,
            complex: 375,
            enteringScreen: 225,
            leavingScreen: 195,
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
