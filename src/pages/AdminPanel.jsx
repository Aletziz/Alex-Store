import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Tabs,
  Tab,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import AdminProductManager from "../components/AdminProductManager";
import AdminCategoryManager from "../components/AdminCategoryManager";

const AdminPanel = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" sx={{ color: "primary.main" }}>
          Panel de Administración
        </Typography>
        <IconButton onClick={handleSettingsClick}>
          <SettingsIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleSettingsClose}
        >
          <MenuItem onClick={handleSettingsClose}>Configuración</MenuItem>
          <MenuItem onClick={handleSettingsClose}>Exportar Datos</MenuItem>
          <MenuItem onClick={handleSettingsClose}>Importar Datos</MenuItem>
        </Menu>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab label="Productos" />
          <Tab label="Categorías" />
        </Tabs>
      </Paper>

      <Box sx={{ mt: 3 }}>
        {currentTab === 0 && (
          <Paper sx={{ p: 3 }}>
            <AdminProductManager />
          </Paper>
        )}
        {currentTab === 1 && (
          <Paper sx={{ p: 3 }}>
            <AdminCategoryManager />
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default AdminPanel;
