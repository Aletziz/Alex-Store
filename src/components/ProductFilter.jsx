import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Typography,
} from "@mui/material";

const ProductFilter = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    priceRange: [0, 1000],
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await fetch("http://localhost:3001/api/categories");
    const data = await response.json();
    setCategories(data);
  };

  const handleChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <TextField
        fullWidth
        label="Buscar productos"
        variant="outlined"
        value={filters.search}
        onChange={(e) => handleChange("search", e.target.value)}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Categoría</InputLabel>
        <Select
          value={filters.category}
          label="Categoría"
          onChange={(e) => handleChange("category", e.target.value)}
        >
          <MenuItem value="">Todas</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography gutterBottom>Rango de Precio</Typography>
      <Slider
        value={filters.priceRange}
        onChange={(e, value) => handleChange("priceRange", value)}
        valueLabelDisplay="auto"
        min={0}
        max={1000}
      />
    </Box>
  );
};

export default ProductFilter;
