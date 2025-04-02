import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Typography,
  Divider,
  Grid,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import RewardsProgress from "./RewardsProgress";
import { useRewards } from "../context/RewardsContext";

const UserRewardsDialog = ({ open, onClose }) => {
  const { rewards } = useRewards();

  const rewardLevels = [
    {
      name: "Bronce",
      icon: "🥉",
      points: "0-199",
      benefits: ["5% descuento en envíos"],
    },
    {
      name: "Plata",
      icon: "🥈",
      points: "200-499",
      benefits: [
        "10% descuento en envíos",
        "Acceso prioritario a nuevos productos",
      ],
    },
    {
      name: "Oro",
      icon: "🥇",
      points: "500-999",
      benefits: [
        "15% descuento en envíos",
        "Envíos gratis en compras +$100",
        "Soporte prioritario",
      ],
    },
    {
      name: "Diamante",
      icon: "💎",
      points: "1000+",
      benefits: [
        "20% descuento en envíos",
        "Envíos gratis sin mínimo",
        "Acceso exclusivo a ofertas",
        "Atención VIP 24/7",
      ],
    },
  ];

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
          <Typography
            variant="h5"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <EmojiEventsIcon color="primary" />
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
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Tu Progreso
            </Typography>
            <RewardsProgress rewards={rewards} />
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom color="primary">
            Niveles y Beneficios
          </Typography>
          <Grid container spacing={2}>
            {rewardLevels.map((level) => (
              <Grid item xs={12} sm={6} key={level.name}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      p: 2,
                      height: "100%",
                      background: (theme) =>
                        theme.palette.mode === "dark"
                          ? "linear-gradient(135deg, #2d2f45 0%, #1a1c2a 100%)"
                          : "linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)",
                      border: (theme) =>
                        rewards.tier === level.name
                          ? `2px solid ${theme.palette.primary.main}`
                          : "none",
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      {level.icon} {level.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {level.points} puntos
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      {level.benefits.map((benefit, index) => (
                        <Typography
                          key={index}
                          variant="body2"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 0.5,
                          }}
                        >
                          • {benefit}
                        </Typography>
                      ))}
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default UserRewardsDialog;
