const express = require('express');
const database = require('./db.js');
const cors = require('cors');

const app = express();

var corsOptions = {
  origin: 'http://localhost:8080'
};

app.use(cors(corsOptions));

app.use(express.json())

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
    SELECT sc.* FROM sub_categories ta_sc
    INNER JOIN categories c ON c.id = ta_sc.parent_category_id
    INNER JOIN categories sc ON sc.id = ta_sc.child_category_id
    WHERE ta_sc.parent_category_id = $1
    ;`, id);
    if (subCategories.length <= 0) {
      res.status(200).send({message: 'no_data'});
    } else {
      res.status(200).send(subCategories);
    }
    
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

app.post('/delivery', async (req, res) => {
  const lastIdDelivery = await database.any(`SELECT MAX(id) as id FROM delivery_data;`);
  const newId = lastIdDelivery[0].id + 1;
  await database.one(
    `INSERT INTO delivery_data(
      id,
      email,
      firstname,
      lastname,
      delivery_address,
      city,
      zipcode,
      phone,
      usual_information,
      payement_method,
      delivery_method
    ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);
    `,
    [
      id = newId,
      email = req.body.email,
      firstname = req.body.firstname,
      lastname = req.body.lastname,
      delivery_address = req.body.delivery_address,
      city = req.body.city,
      zipcode = parseInt(req.body.zipcode, 10),
      phone = req.body.phone,
      usual_information = req.body.usual_information,
      payement_method = parseInt(req.body.payement_method, 10),
      delivery_method = parseInt(req.body.delivery_method, 10)
    ]
  ).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(500).send({
      status: 500,
      message: 'Server error',
      error: err
    });
  });
})

module.exports = app;