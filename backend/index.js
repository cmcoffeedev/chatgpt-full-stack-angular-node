const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Enable CORS
app.use(cors());

// Parse JSON request body
app.use(bodyParser.json());

// In-memory list to store products
let products = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' }
];

// Get all products
app.get('/products', (req, res) => {
    res.json(products);
});

// Get a product by ID
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        res.status(404).send('Product not found');
        return;
    }
    res.json(product);
});

// Create a new product
app.post('/products', (req, res) => {
    const product = { id: products.length + 1, name: req.body.name };
    products.push(product);
    res.status(201).json(product);
});

// Update a product
app.put('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        res.status(404).send('Product not found');
        return;
    }
    product.name = req.body.name;
    res.json(product);
});

// Delete a product
app.delete('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        res.status(404).send('Product not found');
        return;
    }
    products = products.filter(p => p.id !== product.id);
    res.sendStatus(200);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
