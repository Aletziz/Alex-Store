import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, Container } from "@mui/material";
import AdminProductManager from "./AdminProductManager";
import AdminCategoryManager from "./AdminCategoryManager";
import AdminOrdersManager from "./AdminOrdersManager";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const AdminPanel = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ my: 4 }}>
        Panel de Administración
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab icon={<InventoryIcon />} label="Productos" />
          <Tab icon={<CategoryIcon />} label="Categorías" />
          <Tab icon={<ReceiptLongIcon />} label="Pedidos" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <AdminProductManager />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <AdminCategoryManager />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <AdminOrdersManager />
      </TabPanel>
    </Container>
  );
};

export default AdminPanel;
