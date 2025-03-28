import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";

const OrdersTable = ({ orders }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("es-ES");
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID Orden</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Fecha de Pago</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.clienteNombre}</TableCell>
              <TableCell>{order.clienteEmail}</TableCell>
              <TableCell>${order.total}</TableCell>
              <TableCell>
                <Box
                  sx={{
                    backgroundColor:
                      order.estado === "PAGADO"
                        ? "#e8f5e9"
                        : order.estado === "PENDIENTE"
                        ? "#fff3e0"
                        : "#ffebee",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    display: "inline-block",
                  }}
                >
                  {order.estado}
                </Box>
              </TableCell>
              <TableCell>
                {order.fechaPago ? formatDate(order.fechaPago) : "No pagado"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrdersTable;
