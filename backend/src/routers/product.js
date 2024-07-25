const express = require("express");
const router = express.Router();

const {
  createProductPG,
  buyItemPG,
  deleteItemPG,
  updateItemPG,
  getItemByIDPG,
  getAllItemPG,
} = require("../controllers/product");

const {
  authBuyer,
  authGeneral,
  authSeller,
  authAdminAndSeller,
} = require("../middleware/auth");

const {
  validateIdInParam,
  validateProductData,
} = require("../validators/product");

const { checkErrors } = require("../validators/checkErrors");

router.put(
  "/new",
  validateProductData,
  checkErrors,
  authSeller,
  createProductPG
);
router.patch(
  "/buyItem/:item_uuid",
  validateIdInParam,
  checkErrors,
  authBuyer,
  buyItemPG
);
router.delete(
  "/:item_uuid",
  validateIdInParam,
  checkErrors,
  authAdminAndSeller,
  deleteItemPG
);
router.patch(
  "/updateItem/:item_uuid",
  validateProductData,
  checkErrors,
  authSeller,
  updateItemPG
);
router.get(
  "/item/:item_uuid",
  validateIdInParam,
  checkErrors,
  authGeneral,
  getItemByIDPG
);
router.get("/all", authGeneral, getAllItemPG);

module.exports = router;
