import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from "./components/AdminPanel";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <CartProvider>
            <Navbar toggleTheme={toggleTheme} mode={mode} />
            <Routes>
              {/* ... rutas existentes ... */}
              <Route
                path="/admin"
                element={
                  user?.privileges?.canManageProducts ? (
                    <AdminPanel />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}
