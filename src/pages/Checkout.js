import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import PaymentConfirmation from "../components/PaymentConfirmation";

const Checkout = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "", // Agregamos teléfono
    direccion: "",
    email: "",
    numeroTarjeta: "",
    banco: "",
  });

  const TARJETA_DESTINO = "1234567890123456"; // Agregamos la constante

  const calculateTotal = () => {
    return state.items.reduce(
      (total, item) => total + item.precio * item.quantity,
      0
    );
  };

  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
  const [ordenId, setOrdenId] = useState(null);

  const handleCheckout = async () => {
    try {
      const response = await fetch(`${API_URL}/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const data = await response.json();
        setOrdenId(data.orden.id);
        setShowPaymentConfirmation(true);
      } else {
        const error = await response.json();
        alert(error.mensaje || "Error al procesar el pago");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al procesar la compra");
    }
  };

  const handlePaymentConfirmationClose = (success) => {
    setShowPaymentConfirmation(false);
    if (success) {
      dispatch({ type: "CLEAR_CART" });
      alert("¡Compra realizada con éxito!");
      navigate("/");
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Finalizar Compra
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <form onSubmit={handleSubmit}>
              <Typography variant="h6" gutterBottom>
                Información de Contacto y Envío
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Nombre Completo"
                    value={formData.nombre}
                    onChange={(e) =>
                      setFormData({ ...formData, nombre: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Número de Teléfono"
                    value={formData.telefono}
                    onChange={(e) =>
                      setFormData({ ...formData, telefono: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Dirección"
                    value={formData.direccion}
                    onChange={(e) =>
                      setFormData({ ...formData, direccion: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="email"
                    label="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Información de Pago
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Número de Tarjeta (16 dígitos)"
                    value={formData.numeroTarjeta}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 16);
                      setFormData({ ...formData, numeroTarjeta: value });
                    }}
                    inputProps={{ maxLength: 16 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Banco</InputLabel>
                    <Select
                      value={formData.banco}
                      label="Banco"
                      onChange={(e) =>
                        setFormData({ ...formData, banco: e.target.value })
                      }
                    >
                      <MenuItem value="BANDEC">BANDEC</MenuItem>
                      <MenuItem value="POPULAR">POPULAR</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="textSecondary">
                    El pago será procesado a la tarjeta: {TARJETA_DESTINO}
                  </Typography>
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{ mt: 3 }}
              >
                Confirmar Compra
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Resumen del Pedido
            </Typography>
            {state.items.map((item) => (
              <Box key={item.id} sx={{ my: 2 }}>
                <Typography>
                  {item.nombre} x {item.quantity}
                </Typography>
                <Typography color="text.secondary">
                  ${(item.precio * item.quantity).toFixed(2)}
                </Typography>
              </Box>
            ))}
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">
              Total: ${calculateTotal().toFixed(2)}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <PaymentConfirmation
        open={showPaymentConfirmation}
        onClose={handlePaymentConfirmationClose}
        ordenId={ordenId}
      />
    </Container>
  );
};

export default Checkout;
