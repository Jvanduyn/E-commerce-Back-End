const router = require('express').Router();
const { Category, Product } = require('../../models');
const { update } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // find all categories
    // be sure to include its associated Prodcts
    const allCategoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allCategoryData);
  }
  catch (error) {
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  try {
    const oneCategoryData = await Category.findByPk(req.params.id, {
      // find one category by its `id` value
      // be sure to include its associated Products
      include: [{ model: Product }]
    });
    if (!oneCategoryData) {
      res.status(404).json({ message: 'No category found with that ID!' });
      return;
    }
    res.status(200).json(oneCategoryData);
  }
  catch (error) {
    res.status(500).json(error)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(400).json(error)
  }
});

// /(use a number from the seed data)
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateCategory[0]) {
      res.status(404).json({ message: 'Invalid ID' });
      return;
    }
    res.status(200).json({ message: 'Updated' });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryid = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryid) {
      res.status(404).json({ message: 'Invalid ID' });
      return;
    }
    res.status(200).json(categoryid);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
