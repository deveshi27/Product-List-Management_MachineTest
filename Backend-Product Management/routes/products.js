const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});



router.post('/', auth, upload.single('image'), async (req, res) => {
  const { name, price, category, inStock } = req.body;
  const image = req.file.filename;
  const product = new Product({ name, price, category, inStock, image });
  await product.save();
  res.status(201).json(product);
});

router.put('/:id', auth, upload.single('image'), async (req, res) => {
  const { name, price, category, inStock } = req.body;
  const image = req.file.filename;
  const update = { name, price, category, inStock };
  if (image) update.image = image;
  const product = await Product.findByIdAndUpdate(req.params.id, update, { new: true });
  res.json(product);
});

router.delete('/:id', auth, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
