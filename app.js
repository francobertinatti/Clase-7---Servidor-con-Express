const express = require("express");
const ProductManager = require("./ProductManager"); // Importar la clase ProductManager
const app = express();

const products = new ProductManager("./productos.json"); // Crear una instancia de ProductManager con la ruta al archivo de productos

app.get("/", (req, res) => {
  res.send("Probando Probando 1, 2 , 3");
});

app.get("/products", (req, res) => {
  const { limit } = req.query;
  const allProducts = products.getProducts();

  if (limit) {
    res.json(allProducts.slice(0, limit));
  } else {
    res.json(allProducts);
  }
});

app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const product = products.getProductById(id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
