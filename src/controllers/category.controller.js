const { categoryService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");

const createCategory = catchAsync(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  return res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: "Create Category Success",
    data: category,
  });
});

const getAllCategories = catchAsync(async (req, res) => {
  const categories = await categoryService.getAllCategories();
  return res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Fetch All Categories Success",
    data: categories,
  });
});

const getCategoryById = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const category = await categoryService.getCategoryById(categoryId);
  return res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Fetch Category by ID Success",
    data: category,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const updatedCategory = await categoryService.updateCategory(
    categoryId,
    req.body
  );
  return res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Update Category Success",
    data: updatedCategory,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const result = await categoryService.deleteCategory(categoryId);
  return res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: result.message,
  });
});

module.exports = {
  getCategoryById,
  updateCategory,
  deleteCategory,
  createCategory,
  getAllCategories,
};
