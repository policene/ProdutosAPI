const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productController");

router.get("/", productsController.findAll);
router.post("/", productsController.addProduct);
router.put("/:id", productsController.updateProduct);
router.delete("/:id", productsController.deleteProduct);

module.exports = router;