const { newsService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");

const createNews = catchAsync(async (req, res) => {  
  if (!req.file) {
    return res.status(httpStatus.BAD_REQUEST).send({
      status: httpStatus.BAD_REQUEST,
      message: "No file uploaded",
    });
  }

  const news = await newsService.createNews(req.body, req.file);

  return res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: "Create News Success",
    data: {
      newsId: news.id,
    },
  });
});

const getAllNews = catchAsync(async (req, res) => {
  const news = await newsService.getAllNews();
  return res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Fetch All News Success",
    data: news,
  });
});

const getNewsByTitle = catchAsync(async (req, res) => {
  const { title } = req.params;
  const news = await newsService.getNewsByTitleRegex(title);
  return res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Fetch News by Title Success",
    data: news,
  });
});

const getNewsById = catchAsync(async (req, res) => {
  const { newsId } = req.params;
  const news = await newsService.getNewsById(newsId);
  return res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Fetch News by ID Success",
    data: news,
  });
});

const updateNews = catchAsync(async (req, res) => {
  const { newsId } = req.params;
  const updatedNews = await newsService.updateNews(newsId, req.body, req.file);
  return res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Update News Success",
    data: updatedNews,
  });
});

const deleteNews = catchAsync(async (req, res) => {
  const { newsId } = req.params;
  
  await newsService.deleteNews(newsId);
  return res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: "Delete News Success",
  });
});

module.exports = {
  getAllNews,
  getNewsByTitle,
  getNewsById,
  updateNews,
  deleteNews,
  createNews,
};

