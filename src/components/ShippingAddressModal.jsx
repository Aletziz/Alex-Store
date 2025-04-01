import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const cubanProvinces = [
  "La Habana",
  "Pinar del Río",
  "Artemisa",
  "Mayabeque",
  "Matanzas",
  "Villa Clara",
  "Cienfuegos",
  "Sancti Spíritus",
  "Ciego de Ávila",
  "Camagüey",
  "Las Tunas",
  "Holguín",
  "Granma",
  "Santiago de Cuba",
  "Guantánamo",
  "Isla de la Juventud",
];

export const ShippingAddressModal = ({ open, onClose }) => {
  const [address, setAddress] = useState({
    street: "",
    number: "",
    between: "",
    province: "",
    municipality: "",
    reference: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle address submission
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Dirección de Envío</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Calle"
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Número"
            value={address.number}
            onChange={(e) => setAddress({ ...address, number: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Entre calles"
            value={address.between}
            onChange={(e) =>
              setAddress({ ...address, between: e.target.value })
            }
            margin="normal"
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Provincia</InputLabel>
            <Select
              value={address.province}
              onChange={(e) =>
                setAddress({ ...address, province: e.target.value })
              }
            >
              {cubanProvinces.map((province) => (
                <MenuItem key={province} value={province}>
                  {province}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Municipio"
            value={address.municipality}
            onChange={(e) =>
              setAddress({ ...address, municipality: e.target.value })
            }
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Punto de referencia"
            value={address.reference}
            onChange={(e) =>
              setAddress({ ...address, reference: e.target.value })
            }
            margin="normal"
            multiline
            rows={2}
          />
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
