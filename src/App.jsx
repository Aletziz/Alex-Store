import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import Productos from "./pages/productos";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/navbar";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { RewardsProvider } from "./context/RewardsContext";
import ShippingAddressModal from "./components/ShippingAddressModal";
import PaymentMethodModal from "./components/PaymentMethodModal";
import EditProfileModal from "./components/EditProfileModal";
import PrivacySettings from "./components/PrivacySettings";
import { createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#5363FF",
    },
    background: {
      default: "#1a1c2a",
      paper: "#2d2f45",
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1e3a6d",
    },
    background: {
      default: "#ffffff",
      paper: "#f5f5f5",
    },
  },
});

function App() {
  const [mode, setMode] = useState("dark");
  const theme = mode === "dark" ? darkTheme : lightTheme;

  // Estados necesarios
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("es");
  const [selectedCurrency, setSelectedCurrency] = useState("CUP");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [currencyAnchorEl, setCurrencyAnchorEl] = useState(null);
  const [cartAnchorEl, setCartAnchorEl] = useState(null);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);

  // Funciones de manejo
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };

  const handleShippingClick = () => {
    setSettingsOpen(false);
  };

  const handlePaymentClick = () => {
    setSettingsOpen(false);
  };

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setLanguageAnchorEl(null);
  };

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    setCurrencyAnchorEl(null);
  };

  const handleSettingsOpen = () => {
    setSettingsOpen(true);
  };

  const handleSettingsClose = () => {
    setSettingsOpen(false);
  };

  return (
    <AuthProvider>
      <CartProvider>
        <ThemeProvider>
          <RewardsProvider>
            <MuiThemeProvider theme={theme}>
              <CssBaseline />
              <Router>
                <Navbar
                  mode={mode}
                  toggleTheme={toggleTheme}
                  selectedLanguage={selectedLanguage}
                  selectedCurrency={selectedCurrency}
                  selectedPaymentMethod={selectedPaymentMethod}
                  settingsOpen={settingsOpen}
                  setSettingsOpen={setSettingsOpen}
                  onShippingClick={handleShippingClick}
                  onPaymentClick={handlePaymentClick}
                  onLanguageChange={handleLanguageChange}
                  onCurrencyChange={handleCurrencyChange}
                  onSettingsOpen={handleSettingsOpen}
                  onSettingsClose={handleSettingsClose}
                  anchorEl={anchorEl}
                  setAnchorEl={setAnchorEl}
                  languageAnchorEl={languageAnchorEl}
                  setLanguageAnchorEl={setLanguageAnchorEl}
                  currencyAnchorEl={currencyAnchorEl}
                  setCurrencyAnchorEl={setCurrencyAnchorEl}
                />
                <Routes>
                  <Route path="/" element={<Productos />} />
                  <Route path="/productos" element={<Productos />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/registro" element={<Register />} />
                  <Route path="/perfil/editar" element={<EditProfileModal />} />
                  <Route
                    path="/direccion-envio"
                    element={<ShippingAddressModal />}
                  />
                  <Route path="/metodo-pago" element={<PaymentMethodModal />} />
                  <Route path="/privacidad" element={<PrivacySettings />} />
                  <Route path="/admin" element={<AdminPanel />} />
                </Routes>
              </Router>
            </MuiThemeProvider>
          </RewardsProvider>
        </ThemeProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
