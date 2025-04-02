import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const EditProfileModal = ({ open, onClose }) => {
  const { user, updateUserProfile } = useAuth();
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    photoURL: user?.photoURL || "",
    email: user?.email || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(formData);
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          open={open}
          onClose={onClose}
          PaperProps={{
            component: motion.div,
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 20 },
            transition: { duration: 0.3 },
          }}
        >
          <DialogTitle>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Avatar
                  src={formData.photoURL}
                  sx={{ width: 56, height: 56 }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Editar Perfil
              </motion.div>
            </Box>
          </DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <TextField
                  fullWidth
                  margin="dense"
                  name="displayName"
                  label="Nombre"
                  value={formData.displayName}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <TextField
                  fullWidth
                  margin="dense"
                  name="photoURL"
                  label="URL de foto"
                  value={formData.photoURL}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <TextField
                  fullWidth
                  margin="dense"
                  name="email"
                  label="Email"
                  value={formData.email}
                  disabled
                />
              </motion.div>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Button onClick={onClose}>Cancelar</Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Button type="submit" variant="contained" color="primary">
                  Guardar
                </Button>
              </motion.div>
            </DialogActions>
          </form>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default EditProfileModal;
