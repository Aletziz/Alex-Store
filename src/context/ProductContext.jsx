import React, { createContext, useState, useContext, useEffect } from "react";
import { db } from "../firebase/config";
import { ref, set, onValue, remove, update } from "firebase/database";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const productsRef = ref(db, "products");
      const categoriesRef = ref(db, "categories");

      const unsubscribeProducts = onValue(productsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const productsArray = Object.entries(data).map(([id, product]) => ({
            id,
            ...product,
          }));
          setProducts(productsArray);
        } else {
          setProducts([]);
        }
      });

      const unsubscribeCategories = onValue(categoriesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const categoriesArray = Object.entries(data).map(
            ([id, category]) => ({
              id,
              ...category,
            })
          );
          setCategories(categoriesArray);
        } else {
          setCategories([]);
        }
      });

      setLoading(false);
      return () => {
        unsubscribeProducts();
        unsubscribeCategories();
      };
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  const addCategory = async (categoryData) => {
    try {
      const categoryId = Date.now().toString();
      const categoryRef = ref(db, `categories/${categoryId}`);
      const newCategory = {
        id: categoryId,
        name: categoryData.name,
        description: categoryData.description,
        createdAt: new Date().toISOString(),
      };
      await set(categoryRef, newCategory);
      return { success: true, categoryId };
    } catch (error) {
      console.error("Error al añadir categoría:", error);
      return { success: false, error: error.message };
    }
  };

  const addProduct = async (product) => {
    const productRef = ref(db, `products/${product.id}`);
    await set(productRef, product);
  };

  const updateProduct = async (productId, updates) => {
    const productRef = ref(db, `products/${productId}`);
    await update(productRef, updates);
  };

  const deleteProduct = async (productId) => {
    const productRef = ref(db, `products/${productId}`);
    await remove(productRef);
  };

  const deleteCategory = async (categoryId) => {
    const categoryRef = ref(db, `categories/${categoryId}`);
    await remove(categoryRef);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        loading,
        error,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        deleteCategory,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
