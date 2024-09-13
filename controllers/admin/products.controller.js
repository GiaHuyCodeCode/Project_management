const Product = require("../../models/product.model");

const filterStatusHelper = require("../../helpers/filterStatus");

const searchHelper = require("../../helpers/search");
const search = require("../../helpers/search");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  // console.log(req.query.status);

  // Doan nay doan bo loc
  const filterStatus = filterStatusHelper(req.query);

  let find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }

  //TIM KIEM
  const objectSearch = searchHelper(req.query);

  console.log(objectSearch);

  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }

  const products = await Product.find(find);

  // console.log(products);

  res.render("admin/pages/products/index", {
    pageTittle: "Trang San Pham",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
  });
};
