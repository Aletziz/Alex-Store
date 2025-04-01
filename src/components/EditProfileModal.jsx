import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Avatar,
  IconButton,
  Typography,
  Alert,
} from "@mui/material";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile, updatePassword } from "firebase/auth";

const EditProfileModal = ({ open, onClose }) => {
  const { mode } = useTheme();
  const { user, updateUserProfile } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePhotoUpload = async (event) => {
    try {
      const file = event.target.files[0];
      if (!file) return;

      setLoading(true);
      await updateUserProfile({
        photoFile: file,
      });
      setSuccess("Foto actualizada correctamente");
    } catch (error) {
      setError("Error al actualizar la foto");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const updates = {};

      if (displayName !== user.displayName) {
        updates.displayName = displayName;
      }

      if (photoURL !== user.photoURL) {
        updates.photoURL = photoURL;
      }

      if (Object.keys(updates).length > 0) {
        await updateProfile(user, updates);
      }

      if (newPassword) {
        if (newPassword !== confirmPassword) {
          throw new Error("Las contraseñas no coinciden");
        }
        await updatePassword(user, newPassword);
      }

      setSuccess("Perfil actualizado correctamente");
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1500);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          bgcolor: mode === "dark" ? "#2A2B3D" : "#fff",
          borderRadius: 2,
          minWidth: { xs: "90%", sm: 400 },
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "center", pb: 1 }}>
        Editar Perfil
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box sx={{ position: "relative" }}>
              <Avatar
                src={photoURL}
                sx={{
                  width: 100,
                  height: 100,
                  border: `3px solid ${
                    mode === "dark" ? "#5363FF" : "#1e3a6d"
                  }`,
                }}
              />
              <IconButton
                component="label"
                sx={{
                  position: "absolute",
                  bottom: -10,
                  right: -10,
                  bgcolor: mode === "dark" ? "#5363FF" : "#1e3a6d",
                  color: "#fff",
                  "&:hover": {
                    bgcolor: mode === "dark" ? "#4353EF" : "#152a5c",
                  },
                }}
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handlePhotoUpload}
                />
                <PhotoCamera />
              </IconButton>
            </Box>
          </Box>

          <TextField
            fullWidth
            label="Nombre"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Nueva Contraseña"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Confirmar Contraseña"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mb: 2 }}
          />

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button
          onClick={onClose}
          sx={{
            color: mode === "dark" ? "#fff" : "#1e3a6d",
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={loading}
          variant="contained"
          sx={{
            bgcolor: mode === "dark" ? "#5363FF" : "#1e3a6d",
            "&:hover": {
              bgcolor: mode === "dark" ? "#4353EF" : "#152a5c",
            },
          }}
        >
          {loading ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileModal;
