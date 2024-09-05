module.exports.index = (req, res) => {
  res.render("admin/pages/products/index", {
    pageTittle: "Trang San Pham",
  });
};
