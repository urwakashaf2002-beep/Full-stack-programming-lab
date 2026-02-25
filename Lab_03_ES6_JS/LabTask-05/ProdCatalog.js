const products = new Map();

products.set(1, { name: "Laptop", price: 800 });
products.set(2, { name: "Phone", price: 500 });
products.set(3, { name: "Tablet", price: 300 });
products.set(4, { name: "Headphones", price: 150 });
products.set(5, { name: "Keyboard", price: 70 });

function searchProduct() {
  const id = Number(document.getElementById("searchId").value);
  const product = products.get(id);

  document.getElementById("result").innerHTML = product
    ? `Product: ${product.name} | Price: $${product.price}`
    : "Product not found";
}

function deleteProduct() {
  const id = Number(document.getElementById("searchId").value);
  products.delete(id);
  document.getElementById("result").innerHTML =
    `Deleted. Total Products: ${products.size}`;
}