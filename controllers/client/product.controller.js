module.exports.index = (req, res) => {
  res.render("client/pages/products/index", {
    pageTittle: "Danh sach san pham",
  });
};
