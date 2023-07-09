const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../db/models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  try {
  const productData = await Product.findAll({
    include: [
     Category, {through: ProductTag, model: Tag}
    ]
  });
// be sure to include its associated Category and Tag data
console.log(productData);
  res.status(200).json(productData);
} catch (err) {
  res.status(500).json(err);
}

});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id
  try{
    const productData = await Product.findByPk(req.params.id, {
      include: [
        { model: Category },
        { model: Tag }
      ]
    });
    
    if(!productData) {
      res.status(404).json({ message: 'no product was found with the associated id!'});
      return;
    }
    
// be sure to include its associated Category and Tag data
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
  
});

// create new product
router.post('/', async (req, res) => {
  try{
    const product = await Product.create(req.body);

    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update product
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { tagIds, ...productData } = req.body;

    const product = await Product.update(productData, {
      where: { id },
    });

    if (tagIds && tagIds.length) {
      const productTags = await ProductTag.findAll({ where: { product_id: id } });
      const productTagIds = productTags.map(({ tag_id }) => tag_id);

      const newProductTags = tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: id,
            tag_id,
          };
        });

      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !tagIds.includes(tag_id))
        .map(({ id }) => id);

      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try{
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    })
    
    if(!productData) {
      res.status(404).json({ message: 'No data found with this id!!!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
