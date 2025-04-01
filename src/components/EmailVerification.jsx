import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

const EmailVerification = ({ open, onClose }) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { user, verifyEmail, sendVerificationEmail } = useAuth();

  const handleVerify = async () => {
    const verified = await verifyEmail(user.email, verificationCode);
    if (verified) {
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } else {
      setError("Código de verificación incorrecto");
    }
  };

  const handleResend = () => {
    sendVerificationEmail(user.email);
    setError("");
    setSuccess(false);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        className: "glass-effect",
        sx: { minWidth: 320 },
      }}
    >
      <DialogTitle>Verificar Email</DialogTitle>
      <DialogContent>
        <Box sx={{ my: 2 }}>
          {success ? (
            <Alert severity="success">¡Email verificado correctamente!</Alert>
          ) : (
            <>
              <Typography gutterBottom>
                Hemos enviado un código de verificación a {user?.email}
              </Typography>
              <TextField
                fullWidth
                label="Código de verificación"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                error={!!error}
                helperText={error}
                sx={{ mt: 2 }}
              />
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 0 }}>
        {!success && (
          <>
            <Button onClick={handleResend}>Reenviar código</Button>
            <Button
              onClick={handleVerify}
              variant="contained"
              disabled={!verificationCode}
            >
              Verificar
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default EmailVerification;
