import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

export const PaymentMethodModal = ({ open, onClose }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [accountInfo, setAccountInfo] = useState({
    accountNumber: "",
    holderName: "",
    bank: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment method submission
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Método de Pago</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Seleccione su banco</FormLabel>
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="bandec"
                control={<Radio />}
                label="BANDEC"
              />
              <FormControlLabel
                value="popular"
                control={<Radio />}
                label="Banco Popular de Ahorro"
              />
              <FormControlLabel
                value="transfer"
                control={<Radio />}
                label="Transferencia"
              />
            </RadioGroup>
          </FormControl>

          {paymentMethod && (
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Número de Cuenta"
                value={accountInfo.accountNumber}
                onChange={(e) =>
                  setAccountInfo({
                    ...accountInfo,
                    accountNumber: e.target.value,
                  })
                }
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Nombre del Titular"
                value={accountInfo.holderName}
                onChange={(e) =>
                  setAccountInfo({ ...accountInfo, holderName: e.target.value })
                }
                margin="normal"
                required
              />
            </Box>
          )}

          <Box
            sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}
          >
            <Button onClick={onClose}>Cancelar</Button>
            <Button type="submit" variant="contained">
              Guardar
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
