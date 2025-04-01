const Database = require("better-sqlite3");
const db = new Database("shop.db");

const products = [
  {
    name: "Laptop Pro",
    price: 999.99,
    description: "Potente laptop para profesionales",
    image: "https://via.placeholder.com/300",
  },
  {
    name: "Smartphone X",
    price: 699.99,
    description: "Último modelo con cámara profesional",
    image: "https://via.placeholder.com/300",
  },
  {
    name: "Tablet Ultra",
    price: 449.99,
    description: "Perfecta para creativos",
    image: "https://via.placeholder.com/300",
  },
];

const insertProduct = db.prepare(
  "INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)"
);

products.forEach((product) => {
  insertProduct.run(
    product.name,
    product.price,
    product.description,
    product.image
  );
});

console.log("Database seeded successfully!");
