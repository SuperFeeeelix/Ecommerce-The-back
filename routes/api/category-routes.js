const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try{
    const categoriesData = await Category.findAll({
      include:[{ model: Product }],
    });
    res.status(200).json(categoriesData); 
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try{
    const categoriesData = await categoriesData.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoriesData) {
      res.status(404).json({ message: 'No category product found with that id!' });
      return;
    }

    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try{ 
    const categoryData = await Category.create({
      product_id: req.body.product_id,
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const { id } = req.params;
    const { category_name } = req.body;

    const categoriesData = await Category.update(
      { category_name },
      {
        where: { id }
      }
    );
    if (categoryData[0] === 0) {
      res.status(404).json({ message: 'No category was found with that id!' });
      return;
    }

    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
try{ 
  const categoriesData = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });

  if (!categoriesData) {
    res.status(404).json({ message: 'No data found with that id!' });
    return;
  }

  res.status(200).json(categoriesData);
} catch (err) {
  res.status(500).json(err);
}
});

module.exports = router;
