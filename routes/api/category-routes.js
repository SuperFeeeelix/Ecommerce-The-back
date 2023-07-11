const router = require('express').Router();
const { Category, Product } = require('../../db/models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try{
    const categoryData = await Category.findAll({
      include:[{ model: Product }],
    });
    res.status(200).json(categoryData); 
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try{
    const categoryId = req.params.id;
    const categoryData = await categoryData.findByPk(categoryId, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category product found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try{ 
    const { product_id } = req.body;
    const categoryData = await Category.create({
      product_id,
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const categoryId = req.params.id;
    const { category_name } = req.body;

    const [updatedRows] = await Category.update(
      { category_name },
      {
        where: { id: categoryId }
      }
    );
    if (updatedRows === 0) {
      res.status(404).json({ message: 'No category was found with that id!' });
      return;
    }

    res.status(200).json({ message: 'Category updated successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
try{ 
  const categoryId = req.params.id;
  const deletedRowCount = await Category.destroy({
    where: {
      id: categoryId,
    },
  });

  if (deletedRowCount) {
    res.status(404).json({ message: 'No data found with that id!' });
    return;
  }

  res.status(200).json({ message: 'Category deleted successfully!' });
} catch (err) {
  res.status(500).json(err);
}
});

module.exports = router;
