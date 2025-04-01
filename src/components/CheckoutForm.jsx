import React, { useState } from "react";
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Alert,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SecurityIcon from "@mui/icons-material/Security";
import LockIcon from "@mui/icons-material/Lock";

const CheckoutForm = ({ total, onSuccess, onCancel }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const validateCard = (number) => {
    // Validación específica para tarjetas BANDEC/POPULAR
    const isValid = number.length === 16 && /^\d+$/.test(number);
    const isBandec = number.startsWith("4");
    const isPopular = number.startsWith("5");
    return isValid && (isBandec || isPopular);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!validateCard(cardData.number.replace(/\s/g, ""))) {
      setError(
        "Tarjeta inválida. Por favor, use una tarjeta BANDEC o POPULAR."
      );
      setLoading(false);
      return;
    }

    try {
      // Aquí iría la lógica de procesamiento del pago
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulación
      onSuccess();
    } catch (err) {
      setError("Error al procesar el pago. Por favor, intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  return (
    <Card
      sx={{
        p: 3,
        maxWidth: 500,
        mx: "auto",
        background:
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.05)"
            : "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(20px)",
        borderRadius: 2,
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 8px 32px rgba(0, 0, 0, 0.3)"
            : "0 8px 32px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Proceso de Pago Seguro
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        <Step>
          <StepLabel>Datos de Tarjeta</StepLabel>
        </Step>
        <Step>
          <StepLabel>Confirmación</StepLabel>
        </Step>
      </Stepper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Número de Tarjeta"
            value={cardData.number}
            onChange={(e) =>
              setCardData({
                ...cardData,
                number: formatCardNumber(e.target.value),
              })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CreditCardIcon />
                </InputAdornment>
              ),
            }}
            placeholder="1234 5678 9012 3456"
            required
            inputProps={{ maxLength: 19 }}
          />

          <TextField
            label="Nombre del Titular"
            value={cardData.name}
            onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
            required
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Fecha de Vencimiento"
              value={cardData.expiry}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 4) {
                  setCardData({
                    ...cardData,
                    expiry: value.replace(/(\d{2})(\d{2})/, "$1/$2"),
                  });
                }
              }}
              placeholder="MM/YY"
              required
              inputProps={{ maxLength: 5 }}
            />
            <TextField
              label="CVV"
              value={cardData.cvv}
              onChange={(e) =>
                setCardData({
                  ...cardData,
                  cvv: e.target.value.replace(/\D/g, ""),
                })
              }
              type="password"
              required
              inputProps={{ maxLength: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SecurityIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            <LockIcon
              fontSize="small"
              sx={{ verticalAlign: "middle", mr: 1 }}
            />
            Su información está protegida con encriptación de 256 bits
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button onClick={onCancel} disabled={loading}>
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? "Procesando..." : `Pagar $${total}`}
            </Button>
          </Box>
        </Box>
      </form>
    </Card>
  );
};

export default CheckoutForm;
