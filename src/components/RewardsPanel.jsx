import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useAuth } from "../context/AuthContext";

const RewardsPanel = () => {
  const { user } = useAuth();
  const { rewards } = user || {};

  const getTierColor = (tier) => {
    switch (tier) {
      case "platinum":
        return "#E5E4E2";
      case "gold":
        return "#FFD700";
      case "silver":
        return "#C0C0C0";
      default:
        return "#CD7F32";
    }
  };

  return (
    <Card className="glass-effect">
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <EmojiEventsIcon
            sx={{
              fontSize: 40,
              color: getTierColor(rewards?.tier),
              mr: 2,
            }}
          />
          <Box>
            <Typography variant="h5" className="gradient-text">
              Nivel{" "}
              {rewards?.tier?.charAt(0).toUpperCase() + rewards?.tier?.slice(1)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {rewards?.points} puntos acumulados
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Progreso al siguiente nivel
          </Typography>
          <LinearProgress
            variant="determinate"
            value={rewards?.nextTierProgress || 0}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: "rgba(255,255,255,0.1)",
              "& .MuiLinearProgress-bar": {
                background: "var(--primary-gradient)",
              },
            }}
          />
        </Box>

        <Typography variant="h6" gutterBottom>
          Recompensas disponibles
        </Typography>
        <List>
          {rewards?.availableRewards?.map((reward, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <StarIcon sx={{ color: getTierColor(rewards.tier) }} />
              </ListItemIcon>
              <ListItemText primary={reward} />
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Historial reciente
          </Typography>
          {rewards?.history?.slice(-3).map((entry, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <Chip
                label={`+${entry.points}`}
                size="small"
                sx={{ mr: 1, background: "var(--primary-gradient)" }}
              />
              <Typography variant="body2" color="text.secondary">
                {entry.reason}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default RewardsPanel;
