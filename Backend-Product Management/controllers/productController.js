const Product = require('../models/Product');

// GET /products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// GET /products/:id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// POST /products
exports.createProduct = async (req, res) => {
  try {
    const { name, price, category, inStock } = req.body;
    const image = req.file?.filename;

    const product = new Product({
      name,
      price,
      category,
      inStock: inStock !== undefined ? inStock : true,
      image
    });
     await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// PUT /products/:id
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, category, inStock } = req.body;
    const image = req.file?.filename;

    const update = { name, price, category, inStock };
    if (image) update.image = image;

    const product = await Product.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//  DELETE /products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message});
}
};
