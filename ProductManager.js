const fs = require("fs");

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  addProduct(product) {
    const products = this.getProducts();
    const newProduct = {
      id: products.length + 1,
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      code: product.code,
      stock: product.stock,
    };
    products.push(newProduct);
    fs.writeFileSync(this.path, JSON.stringify(products));
  }

  getProducts() {
    try {
      const data = fs.readFileSync(this.path);
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  getProductById(id) {
    const products = this.getProducts();
    const product = products.find((p) => p.id === id);
    if (!product) {
      throw new Error(`Producto con ${id} no encontrado`);
    }
    return product;
  }

  updateProduct(id, fields) {
    const products = this.getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Product with id ${id} not found`);
    }
    const updatedProduct = {
      ...products[index],
      ...fields,
      id: products[index].id,
    };
    products[index] = updatedProduct;
    fs.writeFileSync(this.path, JSON.stringify(products));
  }

  deleteProduct(id) {
    const products = this.getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Product with id ${id} not found`);
    }
    products.splice(index, 1);
    fs.writeFileSync(this.path, JSON.stringify(products));
  }
}

module.exports = ProductManager;
