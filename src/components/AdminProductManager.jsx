import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useProducts } from "../context/ProductContext";

const AdminProductManager = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct } =
    useProducts();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
    stock: "",
  });

  const handleOpenDialog = (product = null) => {
    if (product) {
      setCurrentProduct(product);
      setEditMode(true);
    } else {
      setCurrentProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        imageUrl: "",
        stock: "",
      });
      setEditMode(false);
    }
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (editMode) {
      await updateProduct(currentProduct.id, currentProduct);
    } else {
      await addProduct(currentProduct);
    }
    setDialogOpen(false);
    setCurrentProduct({
      name: "",
      description: "",
      price: "",
      category: "",
      imageUrl: "",
      stock: "",
    });
  };

  const handleDelete = async (productId) => {
    await deleteProduct(productId);
  };

  return (
    <Box>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => handleOpenDialog()}
        sx={{ mb: 3 }}
      >
        Nuevo Producto
      </Button>

      <List>
        {products.map((product) => (
          <ListItem key={product.id}>
            <ListItemText
              primary={product.name}
              secondary={`${product.category} - $${product.price}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleOpenDialog(product)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" onClick={() => handleDelete(product.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editMode ? "Editar Producto" : "Nuevo Producto"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre del Producto"
            fullWidth
            value={currentProduct.name}
            onChange={(e) =>
              setCurrentProduct({ ...currentProduct, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Descripción"
            fullWidth
            multiline
            rows={3}
            value={currentProduct.description}
            onChange={(e) =>
              setCurrentProduct({
                ...currentProduct,
                description: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Precio"
            type="number"
            fullWidth
            value={currentProduct.price}
            onChange={(e) =>
              setCurrentProduct({ ...currentProduct, price: e.target.value })
            }
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Categoría</InputLabel>
            <Select
              value={currentProduct.category}
              onChange={(e) =>
                setCurrentProduct({
                  ...currentProduct,
                  category: e.target.value,
                })
              }
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="URL de la imagen"
            fullWidth
            value={currentProduct.imageUrl}
            onChange={(e) =>
              setCurrentProduct({ ...currentProduct, imageUrl: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Stock"
            type="number"
            fullWidth
            value={currentProduct.stock}
            onChange={(e) =>
              setCurrentProduct({ ...currentProduct, stock: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">
            {editMode ? "Guardar" : "Añadir"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminProductManager;
