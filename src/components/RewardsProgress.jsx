import React from "react";
import { Box, Typography, LinearProgress, Paper } from "@mui/material";
import { motion } from "framer-motion";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const RewardsProgress = ({ rewards }) => {
  const tiers = [
    { name: "Bronce", points: 0, color: "#CD7F32" },
    { name: "Plata", points: 200, color: "#C0C0C0" },
    { name: "Oro", points: 500, color: "#FFD700" },
    { name: "Diamante", points: 1000, color: "#B9F2FF" },
  ];

  const getCurrentTierProgress = () => {
    const currentTierIndex = tiers.findIndex(
      (tier) => tier.name === rewards.tier
    );
    const nextTier = tiers[currentTierIndex + 1];
    if (!nextTier) return 100;

    const pointsInCurrentTier = rewards.points - tiers[currentTierIndex].points;
    const tierRange = nextTier.points - tiers[currentTierIndex].points;
    return (pointsInCurrentTier / tierRange) * 100;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #1a1c2a 0%, #2d2f45 100%)"
              : "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <EmojiEventsIcon
            sx={{
              color: tiers.find((t) => t.name === rewards.tier)?.color,
              fontSize: 40,
              mr: 2,
            }}
          />
          <Box>
            <Typography variant="h6">Nivel {rewards.tier}</Typography>
            <Typography variant="body2" color="text.secondary">
              {rewards.points} puntos totales
            </Typography>
          </Box>
        </Box>

        <Box sx={{ position: "relative", mb: 4 }}>
          <LinearProgress
            variant="determinate"
            value={getCurrentTierProgress()}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: "rgba(255,255,255,0.1)",
              "& .MuiLinearProgress-bar": {
                background: `linear-gradient(90deg, ${
                  tiers.find((t) => t.name === rewards.tier)?.color
                } 0%, ${
                  tiers[tiers.findIndex((t) => t.name === rewards.tier) + 1]
                    ?.color || tiers[tiers.length - 1].color
                } 100%)`,
              },
            }}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <EmojiEventsIcon
                  sx={{
                    color: tier.color,
                    opacity: rewards.points >= tier.points ? 1 : 0.5,
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    color:
                      rewards.points >= tier.points
                        ? tier.color
                        : "text.secondary",
                  }}
                >
                  {tier.points}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Paper>
    </motion.div>
  );
};

export default RewardsProgress;
