import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";

const PaymentConfirmation = ({ open, onClose, ordenId }) => {
  const [numeroTransferencia, setNumeroTransferencia] = useState("");
  const [error, setError] = useState(null);

  const handleConfirmar = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/orders/confirmar-pago",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            ordenId,
            numeroTransferencia,
          }),
        }
      );

      if (response.ok) {
        onClose(true);
      } else {
        const data = await response.json();
        setError(data.mensaje);
      }
    } catch (error) {
      setError("Error al confirmar el pago");
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>Confirmar Pago por Transfermóvil</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
          Por favor, realice la transferencia usando Transfermóvil e ingrese el
          número de confirmación.
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          1. Abra Transfermóvil 2. Seleccione "Transferencia" 3. Ingrese el
          número: XXXX-XXXX 4. Complete la transferencia 5. Ingrese el número de
          confirmación abajo
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        <TextField
          autoFocus
          margin="dense"
          label="Número de Confirmación"
          fullWidth
          value={numeroTransferencia}
          onChange={(e) => setNumeroTransferencia(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)}>Cancelar</Button>
        <Button onClick={handleConfirmar} variant="contained">
          Confirmar Pago
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentConfirmation;
