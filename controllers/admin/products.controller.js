const Product = require("../../models/product.model");

const filterStatusHelper = require("../../helpers/filterStatus");

const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

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

  // Pagination
  countProducts = await Product.countDocuments(find);
  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 4,
    },
    req.query,
    countProducts
  );

  // END Pagination

  const products = await Product.find(find)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

  res.render("admin/pages/products/index", {
    pageTittle: "Trang San Pham",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};
