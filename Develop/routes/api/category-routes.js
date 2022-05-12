const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: ["id", "catergory_name"],
    include:
    [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "catergory_id"]
      }
    ]
  }).then (dbCatergoryData => res.json(dbCatergoryData))
      .catch (err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Catergory.findOne({
    where: {
      id: req.params.id
    },
    attributes: ["id", "catergory_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_name"]
      }
    ]
  }).then (dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({ message: "ID not found" });
      return;
    }
    res.json(dbCategoryData);
  }).catch (err => {
    console.lof(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    catergory_name: req.body.category_name
  }).then (dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Catergory.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then (dbCatergoryData => {
    if (!dbCatergoryData) {
      res.status(404).json({ message: "Id not found" });
      return;
    }
    res.json(dbCatergoryData);
  }).catch (err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Catergory.destroy({ 
    where: {
      id: req.params.id
    }
  }).then (dbCatergoryData => {
    if (!dbCatergoryData) {
      res.status(404).json({ message: "Id not found" });
      return;
    }
    res.json(dbCatergoryData);
  }).catch (err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
