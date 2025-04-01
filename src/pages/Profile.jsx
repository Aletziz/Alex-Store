import React from "react";
import { Container, Paper, Typography, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Mi Perfil
          </Typography>
          <Typography>Email: {user?.email}</Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;
