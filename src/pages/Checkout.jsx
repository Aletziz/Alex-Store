import React, { useState } from "react";
import { Container, Box, Typography, Paper, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useCart } from "../context/CartContext";
import CheckoutForm from "../components/CheckoutForm";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const theme = useTheme();
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
    clearCart();
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Finalizar Compra
        </Typography>
        <Divider />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
        }}
      >
        <Box flex={1}>
          <Paper
            sx={{
              p: 3,
              background:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.05)"
                  : "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(20px)",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Resumen de la Compra
            </Typography>
            {cart.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  py: 1,
                }}
              >
                <Typography>
                  {item.name} x {item.quantity}
                </Typography>
                <Typography>
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </Box>
            ))}
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" color="primary">
                ${typeof total === "number" ? total.toFixed(2) : "0.00"}
              </Typography>
            </Box>
          </Paper>
        </Box>

        <Box flex={2}>
          <CheckoutForm
            total={total}
            onSuccess={handlePaymentSuccess}
            onCancel={() => navigate("/carrito")}
          />
        </Box>
      </Box>

      {paymentSuccess && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
            p: 3,
            borderRadius: 2,
            background: theme.palette.background.paper,
            boxShadow: 24,
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            ¡Pago Exitoso!
          </Typography>
          <Typography align="center">
            Redirigiendo a la página principal...
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Checkout;
