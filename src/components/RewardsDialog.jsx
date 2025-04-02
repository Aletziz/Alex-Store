import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import RewardsProgress from "./RewardsProgress";

const RewardsDialog = ({ open, onClose, rewards }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #1a1c2a 0%, #2d2f45 100%)"
              : "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",
        },
      }}
    >
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" component="span">
            Sistema de Recompensas
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <RewardsProgress rewards={rewards} />

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              ¿Cómo funciona?
            </Typography>
            <Typography variant="body1" paragraph>
              Gana puntos con cada compra y actividad en la plataforma:
            </Typography>
            <Box sx={{ ml: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Compra completada: +50 puntos
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Reseña de producto: +10 puntos
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Referir un amigo: +100 puntos
              </Typography>
            </Box>

            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Niveles y Beneficios
            </Typography>
            <Box sx={{ ml: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                🥉 Bronce (0-199 puntos): • 5% descuento en envíos
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                🥈 Plata (200-499 puntos): • 10% descuento en envíos • Acceso
                prioritario a nuevos productos
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                🥇 Oro (500-999 puntos): • 15% descuento en envíos • Envíos
                gratis en compras +$100 • Soporte prioritario
              </Typography>
              <Typography variant="body2">
                💎 Diamante (1000+ puntos): • 20% descuento en envíos • Envíos
                gratis sin mínimo • Acceso exclusivo a ofertas • Atención VIP
                24/7
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default RewardsDialog;
