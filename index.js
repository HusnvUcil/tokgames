const express = require('express');
const app = express();
const PORT = 3005;

// Endpoint untuk homepage
app.get('/home', (req, res) => {
  res.status(200).json('Welcome, your app is working well');
});

// Endpoint untuk menampilkan informasi user
app.get('/user', (req, res) => {
  const user = {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
  };
  res.status(200).json(user);
});

// Endpoint untuk menerima data dari client menggunakan POST
app.post('/submit', (req, res) => {
  const data = req.body; // Misalnya data yang dikirim berupa JSON
  if (data.name && data.email) {
    res.status(200).json({
      message: 'Data received successfully',
      receivedData: data,
    });
  } else {
    res.status(400).json({
      message: 'Missing required fields: name and email',
    });
  }
});

// Endpoint untuk menampilkan daftar produk
app.get('/products', (req, res) => {
  const products = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    { id: 3, name: 'Product 3', price: 300 },
  ];
  res.status(200).json(products);
});

// Endpoint untuk menampilkan produk berdasarkan ID
app.get('/product/:id', (req, res) => {
  const productId = req.params.id;
  const products = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    { id: 3, name: 'Product 3', price: 300 },
  ];

  const product = products.find(p => p.id === parseInt(productId));

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Mulai server pada PORT yang ditentukan
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Export app untuk digunakan di tempat lain (misalnya untuk testing)
module.exports = app;
