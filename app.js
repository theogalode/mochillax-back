const express = require('express');
const database = require('./db.js');
const cors = require('cors');

const app = express();

var corsOptions = {
  origin: 'http://localhost:8080'
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.status(200);
  res.json({
    message: 'Welcome on mochillax back-end'
  });
});

app.get('/categories', async (req, res) => {
  try {
    const categories = await database.any('SELECT * FROM categories WHERE type = 1;');
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Server error',
      error: error
    });
  }
});

app.get('/categories/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const categories = await database.any(
      'SELECT * FROM categories WHERE id = $1;',
      id
      );
    res.status(200).send(categories[0]);
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Server error',
      error: error
    });
  }
});

app.get('/categories/:id/sub-categories', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const subCategories = await database.any(`
    SELECT sc.name, sc.description FROM sub_categories ta_sc
    INNER JOIN categories c ON c.id = ta_sc.parent_category_id
    INNER JOIN categories sc ON sc.id = ta_sc.child_category_id
    WHERE ta_sc.parent_category_id = $1
    ;`, id);
    if (subCategories.length <= 0) {
      res.status(200).send({message: 'no_data'});
    }
    res.status(200).send(subCategories);
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Server error',
      error: error
    });
  }
});

app.get('/categories/:id/products', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const products = await database.any(`
    SELECT p.* FROM category_products cp
    INNER JOIN products p ON p.id = cp.product_id
    INNER JOIN categories c ON c.id = cp.category_id
    WHERE c.id = $1
    ;`, id);
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Server error',
      error: error
    });
  }
});

app.get('/products/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const product = await database.any(
      `SELECT * FROM products WHERE id = $1;`,
      id
    );
    res.status(200).send(product[0]);
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: 'Server error',
      error: error
    });
  }
});

module.exports = app;